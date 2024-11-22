import { useEffect, useState } from "react";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import BackButton from "../../Shared/BackButton";
import ServiceCard from "./ServiceCard";
import noservices from "../../../../photos/Newuiphotos/Services/noservices.webp";
import addServiceIcon from "../../../../photos/Newuiphotos/Services/addservice.webp";
import "./Services.css";
import ServiceForm from "../ServiceForm";
import { useQuery } from "@apollo/client";
import { Get_Services } from "../../../../graphql-api-calls/query";
import { adminFromLocalStg } from "../../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { Box, Skeleton, Stack, styled } from "@mui/material";
import { useNavigationprop } from "../../../../../MyProvider";

type ServicesProps = {
  consumerMasjidId: string;
};

const Services = ({ consumerMasjidId }: ServicesProps) => {
  const navigation = useNavigationprop();

  const [allServices, setAllServices] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  // const localAdmin = adminFromLocalStg();
  // const id = localAdmin.masjids[0];
  // Define styled components for Skeleton
  const SkeletonImage = styled(Skeleton)(({ theme }) => ({
    borderRadius: "30px",
  }));

  const SkeletonCard = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "80%",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
  }));
  const { loading, error, data } = useQuery(Get_Services, {
    fetchPolicy: "network-only",
    variables: { masjidId: consumerMasjidId },
  });

  useEffect(() => {
    if (data && data.getServices) {
      // Assuming data.services is the array of services you need
      setAllServices(data.getServices);
    }
  }, [data]); // Only update when data changes
  if (loading) {
    return (
      <div className="DonationsContainer">
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton handleBackBtn={() => {}} />
          </div>
          <h3 className="page-title">Services</h3>
        </div>

        {/* Skeleton Loader */}
        <div className="reused-table">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard data-testid="skeleton-card" key={index}>
              <SkeletonImage variant="circular" width={80} height={80} />
              <Box sx={{ marginLeft: 2, flex: 1 }}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <Skeleton
                variant="rectangular"
                width={24}
                height={24}
                sx={{ borderRadius: "50%", marginLeft: 2 }}
              />
            </SkeletonCard>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  // form
  if (isFormVisible) {
    const serviceNames = data.getServices.map(
      (service: any) => service.serviceName
    );

    return (
      <ServiceForm
        serviceNames={serviceNames}
        setIsFormVisible={setIsFormVisible}
        masjidId={consumerMasjidId}
        isFormVisible={isFormVisible}
      />
    );
  }

  // table
  return (
    <div className="ServicesContainer">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton
            handleBackBtn={navigation ? navigation : customNavigatorTo}
          />
        </div>
        <h3 className="page-title">Services</h3>
      </div>
      {allServices.length > 0 ? (
        <div className="reused-table">
          {allServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              consumerMasjidId={consumerMasjidId}
            />
          ))}
        </div>
      ) : (
        <div className="noservice">
          <img src={noservices} alt="noActiveService" />
          <p>No Active Services</p>
        </div>
      )}
      {allServices.length > 4 ? null : (
        <div
          className="add-item-container"
          data-testid="add-service-action-btn"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <button className="add-service-action-btn">
            <img
              src={addServiceIcon}
              alt="add-service"
              style={{ height: "27px" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
