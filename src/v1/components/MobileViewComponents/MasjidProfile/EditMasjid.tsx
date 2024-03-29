import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  ChangeEvent,
} from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EditMasjid.css";
import default_home_img from "../../../photos/default-home-img.png";
import delete_icon from "../../../photos/Frame 30.png";
import camera_icon from "../../../photos/Frame 29.png";
import camera_icon2 from "../../../photos/Frame 28.png";
import { updateAdminMasjid } from "../../../redux/actions/MasjidActions/UpdatingMasjidByAdmin";
import { deleteMasjidMedia } from "../../../redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { deleteMasjidProfile } from "../../../redux/actions/MasjidActions/DeletingMasjidProfileAction";
import ProfileModal from "./ProfileModal";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import { Masjid } from "../../../redux/Types";
import MasjidPicturesCarousel from "./MasjidPicturesCarousel";
import UpdateConfirmation from "../Shared/UpdateConfirmation/UpdateConfirmation";
import CustomBtn from "../Shared/CustomBtn";
interface EditMasjidProps {
  masjid: Masjid;
  openMasjidEdit: boolean;
  setOpenMasjidEdit: Dispatch<SetStateAction<boolean>>;
  masjidId: string;
  masjidReloader: () => void;
}
const EditMasjid: FC<EditMasjidProps> = ({
  masjid,
  openMasjidEdit,
  setOpenMasjidEdit,
  masjidId,
  masjidReloader,
}) => {
  const [showCarouselMedia, setShowCarouselMedia] = useState<boolean>(false);
  const [showUploadProfile, setShowUploadProfile] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [carouselImgId, setCarouselImgId] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [masjidPhotos, setMasjidPhotos] = useState<string[]>([]);
  const [masjidProfilePhoto, setMasjidProfilePhoto] = useState<string>("");

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    setDescription(masjid?.description || "");
    setPhoneNumber(masjid?.contact || "");
    setWebsite(masjid?.externalLinks[1]?.url || "");
    setFacebook(masjid?.externalLinks[0]?.url || "");
    setAddress(masjid?.address || "");
    setMasjidPhotos(masjid?.masjidPhotos || []);
    setMasjidProfilePhoto(masjid?.masjidProfilePhoto || "");
  }, [masjid]);
  useEffect(() => {
    if (!showUploadProfile && showCarouselMedia) {
      setShowCarouselMedia(false);
    }
  }, [showUploadProfile]);

  const cancelEditMasjidHandler = () => {
    setOpenMasjidEdit(false);
  };

  const updateEditMasjidHandler = async () => {
    setProgress(true);
    const res = await dispatch(
      updateAdminMasjid(masjidId, {
        description,
        contact: phoneNumber,
        externalLinks: [
          { name: "Facebook", url: facebook },
          { name: "Website", url: website },
        ],
        address,
      })
    );

    if (res?.message === "Success") {
      toast.success("Successfully Updated!");
      setUpdateOpen(false);
      setProgress(false);
      setOpenMasjidEdit(false);
      masjidReloader();
    } else {
      toast.error(res.message);
      setProgress(false);
    }
  };

  const deleteProfilePhotoHandler = async () => {
    setOpen(true);
  };

  const handleRejection = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const DeleteProfileHandler = async () => {
    setProgress(true);
    const mediaDelReq = carouselImgId
      ? deleteMasjidMedia(carouselImgId, masjidId)
      : deleteMasjidProfile(masjidId);

    const res = await dispatch(mediaDelReq);
    if (res?.status === 200 || res?.status === 204) {
      toast.success("Successfully deleted!");
      setOpen(false);
      setShowUploadProfile(false);
      setCarouselImgId("");
      masjidReloader();
      setProgress(false);
    } else {
      toast.error(res.message);
      setProgress(false);
    }
  };

  const texts = {
    main: "Are you sure you want to Delete this Masjid Profile ?",
  };
  const handleMediaModal = (status: boolean) => {
    setShowUploadProfile(true);
    if (status) setShowCarouselMedia(true);
    else setShowCarouselMedia(false);
  };
  const handleCarouselMediaDelete = (imgId = "") => {
    // deleteMasjidImageHandler()
    setOpen(true);
    if (imgId) setCarouselImgId(imgId);
    else setCarouselImgId("");
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const scrollStyole = `
  .input-description{
    height:70px;
    overflow-y: scroll;

  }
    .input-description::-webkit-scrollbar {
      width: 4px !important;
    }
    
    .input-description::-webkit-scrollbar-thumb {
      background: #054635; 
      border-radius: 4px;
    }
    .input-description::-webkit-scrollbar-track {
      background: #f1f1f1;
    } 
      
  `;
  return (
    <>
      <style>{scrollStyole}</style>
      <DeleteConfirmation
        setOpen={setOpen}
        texts={texts}
        open={open}
        progress={progress}
        handleReject={handleRejection}
        handleDelete={DeleteProfileHandler}
      />
      <UpdateConfirmation
        setOpen={setUpdateOpen}
        texts={texts}
        open={updateOpen}
        progress={progress}
        handleReject={handleRejection}
        handleConfirm={updateEditMasjidHandler}
      />
      <div className="masjid-profile-main-div">
        <div>
          {masjidPhotos.length > 0 ? (
            <Slider {...settings}>
              {masjidPhotos.map((img: any) => (
                <div key={img._id} className="masjid-img">
                  <img
                    src={img.url}
                    alt="masjid-img"
                    className="masjid-img-1"
                  />
                  <div className="camera-and-delete">
                    <div style={{ marginBottom: "5px" }}>
                      <img
                        onClick={() => handleMediaModal(true)}
                        src={camera_icon}
                        alt="camera-icon"
                      />
                    </div>
                    <div>
                      <img
                        onClick={() => handleCarouselMediaDelete(img._id)}
                        src={delete_icon}
                        alt="delete-icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <>
              <div className="default-masjid-img">
                <img src={default_home_img} alt="masjid-img" />
                <div className="camera-and-delete">
                  <div style={{ marginBottom: "10px" }}>
                    <img
                      onClick={() => handleMediaModal(true)}
                      src={camera_icon}
                      alt="camera-icon"
                    />
                  </div>
                  <div>
                    <img
                      onClick={() => handleCarouselMediaDelete()}
                      src={delete_icon}
                      alt="delete-icon"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="masjid-circular-img">
          {masjidProfilePhoto ? (
            <img src={masjidProfilePhoto} alt="masjid-circular-img" />
          ) : (
            <img src={default_home_img} alt="masjid-circular-img" />
          )}
        </div>
        <div className="profile-upload-icon">
          <img
            onClick={() => handleMediaModal(false)}
            src={camera_icon2}
            alt="camera-icon"
          />
        </div>
        <h1 className="masjid-heading">{masjid?.masjidName}</h1>
        <div className="input-fields-container">
          <div>
            <p className="input-p">Description</p>
            <textarea
              className="input-description"
              value={description}
              required
              placeholder="Description"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <div className="phone-web-fb-group">
            <div className="phone-web">
              <div>
                <p className="input-p">Phone</p>
                <input
                  className="phone-input"
                  type="text"
                  placeholder="Phone"
                  value={phoneNumber}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(e.target.value)
                  }
                />
              </div>
              <div>
                <p className="input-p-website  ">Website links</p>
                <input
                  className="web-input"
                  type="text"
                  placeholder="Website"
                  value={website}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWebsite(e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <p className="input-p">Facebook links</p>
              <input
                placeholder="Facebook"
                className="facebook-input"
                type="text"
                value={facebook}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFacebook(e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <p className="input-p">Address</p>
            <input
              placeholder="Address"
              className="address-input"
              type="text"
              value={address}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
          <div className="bottom-button">
            {/* <button onClick={cancelEditMasjidHandler} className="cancel-button">
              Cancel
            </button> */}
            <CustomBtn
              bgColor="#ff7272"
              showIcon={false}
              eventHandler={cancelEditMasjidHandler}
              label="Cancel"
            />
            <CustomBtn
              showIcon={false}
              eventHandler={() => setUpdateOpen(true)}
              label={" Update"}
            />
            {/* <button
              onClick={() => setUpdateOpen(true)}
              className="update-button"
            >
              Update
            </button> */}
          </div>
        </div>
      </div>
      <div className="modal-container">
        <ProfileModal
          masjidId={masjidId}
          masjidReloader={masjidReloader}
          open={showUploadProfile}
          isCarouselMedia={showCarouselMedia}
          setOpen={setShowUploadProfile}
          removeHandler={deleteProfilePhotoHandler}
        />
      </div>
    </>
  );
};

export default EditMasjid;
