import React from "react";
import Deletemessagemodel from "../../../../../photos/Newuiphotos/Common/Delete.svg";
import Deletemessagemodel1 from "../../../../../photos/Newuiphotos/Common/Delete.webp";

import styles from "./messageModel.module.css";
import { CircularProgress } from "@mui/material";

interface MessageModelProps {
  onClose: () => void;
  onConfirm: () => void;
  messageType: string;
  message?: string;
  isLoading?: boolean;
}

const MessageModel: React.FC<MessageModelProps> = ({
  onClose,
  onConfirm,
  messageType,
  message,
  isLoading,
}: MessageModelProps) => {
  return (
    <div>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <img
            src={Deletemessagemodel1}
            alt="Delete Message"
            className={styles.popupImage}
          />
          <div className={styles.popupText}>
            <div className={styles.textContainer}>
              <div className={styles.popupTextHeading}>{messageType}</div>
              <div className={styles.subtext}>{message}</div>
            </div>
            <div className={styles.popupButtons}>
              <button
                className={styles.noButton}
                onClick={onClose}
                disabled={isLoading}
              >
                No
              </button>
              <button
                className={styles.yesButton}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={15} />
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModel;
