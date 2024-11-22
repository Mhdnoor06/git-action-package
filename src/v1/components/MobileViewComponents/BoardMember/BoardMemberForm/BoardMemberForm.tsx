import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../Services/services.css";
import toast from "react-hot-toast";
import nextIcon from "../../../../photos/Newuiphotos/BoardMember/addImgIcon.webp";
import BackButton from "../../Shared/BackButton";
import ImageUploader from "../../Events/Helpers/eventImageUploader/ImageUploader";

import BoardMemberPreview from "../BoardMemberPreview/BoardMemberPreview";
import {
  customNavigatorTo,
  validateForm,
} from "../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../MyProvider";
import {
  CREATE_BOARD_MEMBER,
  UPDATE_BOARD_MEMBER,
} from "../../../../graphql-api-calls/mutation";
import { useMutation } from "@apollo/client";
import { Get_BoardMember } from "../../../../graphql-api-calls/query";
import { BoardMember } from "../../../../redux/Types";
import { uploadImage } from "../../../../helpers/imageUpload/imageUpload";
import addServiceIcon from "../../../../photos/Newuiphotos/BoardMember/Vector (14) (1).webp";
import SuccessMessageModel from "../../../../helpers/SuccessMessageModel/SuccessMessageModel";
interface BoardMemberFormProps {
  setIsFormVisible?: Dispatch<SetStateAction<boolean>>;
  boardMemberData?: any;
  id?: string;
  isEditing?: boolean;
  setIsEditing?: any;
  handleToggleEditForm?: () => void;
  masjidId: string;
}

const BoardMemberForm: React.FC<BoardMemberFormProps> = ({
  boardMemberData,
  setIsFormVisible,
  id,
  isEditing = false,
  handleToggleEditForm,
  masjidId,
}) => {
  const navigation = useNavigationprop();

  const [formData, setFormData] = useState<BoardMember>({
    name: "",
    email: "",
    position: "",
    about: "",
    phone: "",
    isSubBtnClicked: false,
    image: [],
  });
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    if (formData?.image.length) setImages(formData?.image);
  }, [formData?.image]);
  // console.log("formData => ", formData);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    const requiredField = ["name", "email", "position", "about"];

    setFormData((prevFormData: any) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
      const validRes = validateForm(updatedFormData, requiredField);

      setValidationErrors(validRes);
      return updatedFormData;
    });
  };
  const handleBackBasedOnIsEditing = () => {
    if (isEditing) {
      if (handleToggleEditForm) handleToggleEditForm();
    } else {
      if (navigation) navigation("/feed/0");
      else customNavigatorTo("/feed/0");
    }
  };

  const handleSubmit = () => {
    handleChange({
      target: {
        name: "isSubBtnClicked",
        value: true,
      },
    });

    // Perform final validation check before submission
    if (validationErrors?.all) {
      setIsPreviewVisible(true);
    } else {
      // Show toast with validation errors
      for (const [key] of Object.entries(validationErrors)) {
        if (key === "all" || validationErrors[key]) continue; // Skip the 'all' key
        toast.error(`${key} is Required`);
      }
    }
  };

  useEffect(() => {
    if (boardMemberData && isEditing && boardMemberData) {
      setFormData(boardMemberData);
    }
  }, [boardMemberData, id, isEditing]);

  const [updateEventPhotos, setUpdateEventPhotos] = useState<
    { url: string; _id: string }[]
  >([]);
  const [activeStep, setActiveStep] = React.useState(0); // current image step on carousel
  const [maxSteps, setMaxSteps] = useState(0); // total images in the ImageUploader component
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleImageUpload = (e: any) => {
    const newImages = e.target.files[0];

    setImages([newImages]);
    handleChange({
      target: {
        name: "image",
        value: [newImages],
      },
    });
  };

  const handleImageDelete = (index: number | string) => {
    setImages([]);
    handleChange({
      target: {
        name: "image",
        value: [],
      },
    });
  };
  const [createBoardMember, { data, loading: cLoading, error: cError }] =
    useMutation(CREATE_BOARD_MEMBER, {
      refetchQueries: [
        { query: Get_BoardMember, variables: { masjidId: masjidId } },
      ],
      awaitRefetchQueries: true,
    });
  const [updateBoardMember] = useMutation(UPDATE_BOARD_MEMBER, {
    refetchQueries: [
      { query: Get_BoardMember, variables: { masjidId: masjidId } },
    ],
    awaitRefetchQueries: true,
  });
  const handleFinalSubmitting = async () => {
    const loadingToast = toast.loading("Submitting your BoardMember...");
    const imgURL = await uploadImage(formData?.image[0]);

    // Define the boardMember input based on formData
    const boardMemberInput = {
      name: formData.name,
      email: formData.email,
      about: formData.about,
      phone: formData.phone,
      position: formData.position,
      image: imgURL || "",
      // image: formData.image,
    };

    try {
      const mutation = formData?._id ? updateBoardMember : createBoardMember;
      const variables = formData?._id
        ? { masjidId: masjidId, id: formData._id, input: boardMemberInput }
        : { masjidId: masjidId, input: boardMemberInput };

      await mutation({ variables });

      // Update the toast to show success message
      toast.success(
        ` boardMember ${formData._id ? " updated" : " created"} successfully`,
        {
          id: loadingToast, // Update the existing toast
        }
      );
      setOpenSuccessModal(true);
    } catch (error) {
      // Update the toast to show error message
      toast.error(
        `Error ${formData._id ? "updating" : "creating"} Board Member: ${
          error?.message
        }`,
        {
          id: loadingToast, // Update the existing toast
        }
      );
    }
  };

  const checkError = (field: string) => {
    if (formData.isSubBtnClicked && !validationErrors[field])
      return { border: "2px solid red" };
    else return {};
  };

  console.log(formData);
  return (
    <>
      <SuccessMessageModel
        message={` Board Member ${
          formData?._id ? "Updated" : "Added"
        } Successfully`}
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          setIsPreviewVisible(false);
          setIsFormVisible?.(false);
          customNavigatorTo("/feed/10");
        }}
      />
      {isPreviewVisible ? (
        <div>
          <BoardMemberPreview
            formData={formData}
            isEditing={false}
            isPreviewMode={true}
            setIsPreviewVisible={setIsPreviewVisible}
            handleDisclaimerStatus={handleFinalSubmitting}
            masjidId={masjidId}
          ></BoardMemberPreview>
        </div>
      ) : (
        <>
          <div className="board-form">
            <div className="goback" style={{ margin: "0" }}>
              <BackButton handleBackBtn={handleBackBasedOnIsEditing} />
            </div>
            <h3
              className="page-title"
              style={{ color: "#3D5347", fontSize: "22px" }}
            >
              Add Board Members
            </h3>
            <p></p>
          </div>
          <div className="main-form board-member-form">
            <ImageUploader
              images={images}
              componentName={"boardMember"}
              updateEventPhotos={updateEventPhotos}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
              handleDeleteImage={() => {}}
              openBar={false}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setIsDeleteWarningVisible={setIsDeleteWarningVisible}
              setMaxSteps={setMaxSteps}
            />
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="position">
                  Role <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder="Role"
                  type="text"
                  id="position"
                  name="position"
                  style={checkError("position")}
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  style={checkError("name")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="about">
                  About <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="about"
                  placeholder="About"
                  name="about"
                  rows={4}
                  style={checkError("about")}
                  value={formData.about || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  style={checkError("email")}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Number (Optional)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button onClick={handleSubmit} className="btn">
                  <img
                    src={addServiceIcon}
                    alt="Next"
                    className="btn-icon"
                    style={{ width: "30px" }}
                  />
                  <span className="btn-text">
                    {isEditing ? "Update" : "Add"} Board Member
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardMemberForm;
