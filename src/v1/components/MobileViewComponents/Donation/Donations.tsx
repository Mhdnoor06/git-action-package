import { useEffect, useState } from "react";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import DonationCard from "./Card/DonationCard";
import nodonations from "../../../photos/Newuiphotos/Donations/nodonations.webp";
import adddonationIcon from "../../../photos/Newuiphotos/Donations/adddonationswhite.webp";
import "./Donations.css";
import DonationForm from "./Form/DonationForm";
import axios from "axios";
import { AuthTokens } from "../../../redux/Types";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../graphql-api-calls";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import DonationDetails from "./Details/DonationDetails";
import { getRestAPIRootDomain } from "../../../helpers/ApiSetter/GraphQlApiSetter";
import tz_lookup from "tz-lookup";
import { Masjid } from "../../../redux/Types";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import StripeErrorModal from "../Payments/StripeErrorModal/StripeErrorModal";
import { useNavigationprop } from "../../../../MyProvider";
import useStripeConnect from "../../../helpers/StripeConnectHelper/useStripeConnect";

type DonatiponProps = {
  consumerMasjidId: string;
  isMainAdmin?: boolean;
};

const Donations = ({
  consumerMasjidId,
  isMainAdmin = false,
}: DonatiponProps) => {
  const navigation = useNavigationprop();
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  const [allDonations, setAllDonation] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isDetailsPageVisible, setIsDetailsPageVisible] =
    useState<boolean>(false);
  const [isNoAccountDialogOpen, setIsNoAccountDialogOpen] =
    useState<boolean>(false);

  const [openedDonation, setOpenedDonation] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [stripeLink, setStripeLink] = useState<string>("");
  const [loadDonation, setLoadDonation] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("No Donation Yet");
  const [tZone, setTzone] = useState("");
  const handleUnexpectedError = () => {
    setIsNoAccountDialogOpen(true);
  };
  const {
    stripeConnect,
    isLoading: isStripeLoading,
    error: stripeError,
  } = useStripeConnect(handleUnexpectedError); // Use the hook

  const { loading, error, data, refetch } = useQuery(
    GET_PRODUCTS,
    // getProducts(consumerMasjidId),
    {
      variables: { masjidId: consumerMasjidId, type: "DONATION" },
      fetchPolicy: "network-only", // or 'no-cache'
      skip: !loadDonation,
    }
  );

  const latLongAddressLoader = (result: Masjid) => {
    if (!result) return;
    const lon = result.location.coordinates[0];
    const lat = result.location.coordinates[1];
    if (lat && lon) {
      let location = tz_lookup(lat, lon);
      setTzone(location);
    }
  };
  useEffect(() => {
    if (AdminMasjidState?.masjidName) {
      latLongAddressLoader(AdminMasjidState);
    } else if (!AdminMasjidState?.masjidName) {
      const response = dispatch(fetchMasjidById(consumerMasjidId));
      response.then((result) => {
        if (result.address) {
          latLongAddressLoader(result);
        } else {
          const message = result?.message
            ? "Failed to Load Masjid Details : " + result.message
            : "Failed to Load Masjid Details : Internet or Server Issue ";

          toast.error(message);
        }
      });
    }
  }, []);

  const handleReload = () => {
    setLoadDonation(true);
    setIsLoading(true);
    refetch();
  };
  const handleCloseDonationDetails = () => {
    setIsDetailsPageVisible(false);
    setOpenedDonation(null);
  };

  const RestBaseUrl = getRestAPIRootDomain();

  const handleStripeConnect = async (email: string, otp: string) => {
    setIsLoading(true);

    const { success, status, data, error } = await stripeConnect(
      email,
      otp,
      false
    );

    if (success) {
      if (
        status === 200 ||
        (status === 202 && data.account.status !== "approved")
      ) {
        setIsNoAccountDialogOpen(true);
      } else if (status === 202 && data.account.status === "approved") {
        setLoadDonation(true);
      }
    } else if (!success && status === 400) {
      setIsNoAccountDialogOpen(true);
      // toast.error("Bad Request: Unable to link the account.");
    }
  };
  useEffect(() => {
    const email = "";
    handleStripeConnect("", "");
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const products = data.getProducts;

      const donationProducts = products;

      // products.filter((product) =>
      //   product.name.startsWith("donation_")
      // );

      const updatedDonations = donationProducts.map((product) => ({
        name: product.name,
        description: product.description,
        active: product.active,
        id: product.id,
        prices: product.prices,
        createdAt: product.createdAt,
        images: product.images,
      }));

      setIsLoading(false);
      setLoadDonation(false);
      setAllDonation(updatedDonations);
    }
  }, [loading, data]);

  const allDonationTypes = [
    "Zakat",
    "Sadaqah",
    "Masjid Maintenance",
    "Construction",
  ];
  const availableDonationTypes = allDonationTypes.filter(
    (type) => !allDonations.map((donation) => donation.name).includes(type)
  );

  const handleDonationClick = (donation) => {
    setOpenedDonation(donation);
    setIsDetailsPageVisible(true);
  };

  return (
    <>
      {isFormVisible ? (
        <DonationForm
          setIsFormVisible={setIsFormVisible}
          consumerMasjidId={consumerMasjidId}
          handleReload={handleReload}
          availableDonationTypes={availableDonationTypes}
          tZone={tZone}
        />
      ) : isDetailsPageVisible ? (
        <DonationDetails
          donation={openedDonation}
          handleCloseDonationDetails={handleCloseDonationDetails}
          handleReload={handleReload}
          consumerMasjidId={consumerMasjidId}
          tZone={tZone}
        />
      ) : (
        <div className="DonationsContainer">
          <div style={{ width: "100%" }}>
            <div className="goback">
              <BackButton
                handleBackBtn={navigation ? navigation : customNavigatorTo}
              />
            </div>
            <h3 className="page-title">Donation</h3>
          </div>
          {isLoading ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : allDonations.length > 0 ? (
            <div className="donations-table">
              {allDonations.map((donation, index) => (
                <DonationCard
                  key={index}
                  donation={donation}
                  handleDonationClick={handleDonationClick}
                />
              ))}
            </div>
          ) : (
            <div className="nodonations">
              <img src={nodonations} alt="nodonations" />
              <p>{errorMsg}</p>
            </div>
          )}

          {!stripeLink && !isLoading && availableDonationTypes.length > 0 ? (
            <div
              className="add-item-container"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              <button className="AddDonation" data-testid="AddDonation">
                <img src={adddonationIcon} alt="" style={{ height: "27px" }} />
              </button>
            </div>
          ) : null}

          <StripeErrorModal
            isMainAdmin={isMainAdmin}
            isOpen={isNoAccountDialogOpen}
            handleButtonClick={() => {
              toast.dismiss();
              if (navigation) navigation("/feed/13");
              else customNavigatorTo("/feed/13");
            }}
            handleClose={() => {
              console.log("CloseIcon");
              toast.dismiss();
              if (navigation) navigation("/feed/0");
              else customNavigatorTo("/feed/0");
            }}
            feature={"to receive donations"}
          />
        </div>
      )}
    </>
  );
};

export default Donations;
