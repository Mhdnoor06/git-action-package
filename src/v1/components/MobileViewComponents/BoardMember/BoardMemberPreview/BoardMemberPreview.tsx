import React, { useState } from "react";

import { Box } from "@mui/material";

import serviceIcon from "../../../../photos/Newuiphotos//BoardMember/Vector (11).webp";
import BoardMember from "../../../../photos/Newuiphotos/BoardMember/member-default.webp";
import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../../photos/Newuiphotos/Icons/delete.svg";

import "./boardMemberPreview.css";
import { useMutation } from "@apollo/client";
import CustomBtn from "../../Shared/CustomBtn";
import Disclaimer from "../../Shared/Disclaimer/Disclaimer";
import DeleteWarningCard from "../../Shared/DeleteWarningCard/DeleteWarningCard";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../MyProvider";
import { DELETE_BOARD_MEMBER } from "../../../../graphql-api-calls/mutation";
import { Get_BoardMember } from "../../../../graphql-api-calls/query";
import toast from "react-hot-toast";
import MoreBtn from "../../Shared/MoreBtn";
import PreviewPageContainer from "../../Shared/previewPageContainer/PreviewPageContainer";

const BoardMemberPreview = ({
  formData,
  handleDisclaimerStatus,
  isPreviewMode,
  isEditing = true,
  setIsPreviewVisible,
  handleEditButton,
  masjidId,
}: any) => {
  const navigation = useNavigationprop();

  const [isSubmitWarningVisible, setIsSubmitWarningVisible] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [open, setOpen] = useState(false);
  //console.log("from program proview=> ", formData);
  const [deleteMember, { loading, error }] = useMutation(DELETE_BOARD_MEMBER, {
    refetchQueries: [
      { query: Get_BoardMember, variables: { masjidId: masjidId } },
    ],
    awaitRefetchQueries: true,
  });
  const handleBoardMemberDelete = async (id: string) => {
    const loadingToast = toast.loading("Deleting boardMember...");
    try {
      const { data } = await deleteMember({ variables: { masjidId, id } });
      console.log(data.deleteBoardMember);
      if (data.deleteBoardMember) {
        toast.success("Board Member deleted successfully");
        toast.success("Board Member deleted successfully", {
          id: loadingToast, // Update the existing toast
        });
        setIsDeleteWarningVisible(false);
        customNavigatorTo("/feed/10");
      } else {
        toast.error("Failed to delete Board Member", {
          id: loadingToast, // Update the existing toast
        });
      }
    } catch (e) {
      console.error("Error deleting Board Member:", e);
    } finally {
      // Ensure the toast is dismissed
      toast.dismiss(loadingToast);
    }
  };

  const handleBackPreview = () => {
    if (setIsPreviewVisible) {
      setIsPreviewVisible(false);
    } else {
      handleBackDetails();
    }
  };
  const handleBackDetails = () => {
    if (navigation) navigation("/feed/10");
    else customNavigatorTo(`/feed/10`);
  };
  const handleImg = () => {
    const image = formData?.image?.[0];
    if (Array.isArray(formData?.image)) {
      return typeof image === "string"
        ? image
        : image
        ? URL.createObjectURL(image)
        : BoardMember;
    }
    return formData?.image || BoardMember;
  };
  return (
    <PreviewPageContainer
      handleBackBtn={isPreviewMode ? handleBackPreview : handleBackDetails}
      title="Board Members Details"
    >
      <div className="board-member-input-img-prev">
        <Box
          component="img"
          sx={{
            height: "100px",
            maxHeight: 120,
            display: "block",
            overflow: "hidden",
            width: "100px",
            borderRadius: "50%",
          }}
          src={handleImg()}
          alt={`Photo`}
        />
      </div>

      <div className="board-member-details">
        <div className="board-member-title">
          <p>
            {formData.name} <span>{"(" + formData.position + ")"}</span>{" "}
            <span className="del-edit-box">
              <img
                onClick={() =>
                  isPreviewMode ? handleBackPreview() : handleEditButton()
                }
                src={edit}
                alt="edit-btn"
              />{" "}
              {isEditing ? (
                <img
                  onClick={() =>
                    setIsDeleteWarningVisible(!isDeleteWarningVisible)
                  }
                  className="del-img"
                  src={del}
                  alt="delete-img"
                />
              ) : null}
            </span>
          </p>
        </div>
        <div className="board-member-drop-item">
          <h5>About </h5>
          <p>
            <MoreBtn tsx={formData?.about} txLength={formData?.about.length} />
          </p>
        </div>
        <div className="board-member-drop-item">
          <h5>Email Address</h5>
          <p>{formData?.email}</p>
        </div>
        <div className="board-member-drop-item">
          <h5>Contact Number </h5>
          <p>{formData?.phone || "N/A"}</p>
        </div>

        <div
          className="board-preview-btn"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {isPreviewMode && (
            <div className="confirm-btn">
              <CustomBtn
                // size={"5px"}
                eventHandler={() => {
                  setIsSubmitWarningVisible(true);
                }}
                label={"Confirm Board Member"}
                isDisabled={false}
                icon={serviceIcon}
                imgWidth={"10%"}
              />
            </div>
          )}
        </div>
      </div>
      {isDeleteWarningVisible ? (
        <DeleteWarningCard
          wariningType="Remove Board Member"
          warining={"Are you sure you want to Remove Board Member?"}
          onClose={() => setIsDeleteWarningVisible(false)}
          onConfirm={() => {
            handleBoardMemberDelete(formData._id);
          }}
          icon={del}
          progress={loading}
        />
      ) : null}
      {isSubmitWarningVisible ? (
        <Disclaimer
          showDisclaimer={isSubmitWarningVisible}
          handleDisclaimerStatus={handleDisclaimerStatus}
          setDisclaimer={setIsSubmitWarningVisible}
          setIsSubmitting={setIsSubmitting}
        />
      ) : null}
    </PreviewPageContainer>
  );
};

export default BoardMemberPreview;
