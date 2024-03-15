import React, { useState, ReactNode, ReactElement } from "react";
import ReactDOM from "react-dom";

interface CustomModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

interface UseCustomModalHook {
  showModalFunction: (
    title: string,
    content: string,
    onConfirm: () => void,
    onCancel: () => void
  ) => Promise<boolean>;
  showModal: boolean;
}

const useCustomModal = (): UseCustomModalHook => {
  const [showModal, setShowModal] = useState(false);

  const showModalFunction = (
    title: string,
    content: string,
    onConfirm: () => void,
    onCancel: () => void
  ): Promise<boolean> => {
    setShowModal(true);

    return new Promise<boolean>((resolve) => {
      const handleConfirm = (): void => {
        onConfirm();
        setShowModal(false);
        resolve(true);
      };

      const handleCancel = (): void => {
        onCancel();
        setShowModal(false);
        resolve(false);
      };

      ReactDOM.render(
        <CustomModal
          title={title}
          content={content}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />,
        document.getElementById("modal-root")
      );
    });
  };

  return { showModalFunction, showModal };
};

export default useCustomModal;
