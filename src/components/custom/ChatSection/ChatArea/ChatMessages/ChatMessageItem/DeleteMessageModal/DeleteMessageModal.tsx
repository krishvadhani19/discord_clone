"use client";

import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import "./DeleteMessageModal.scss";
import { useCallback } from "react";

type DeleteMessageModalPropsType = {
  onClose: () => void;
  messageId: string;
  messageContent: string;
};

const DeleteMessageModal = ({
  onClose,
  messageId,
  messageContent,
}: DeleteMessageModalPropsType) => {
  const handleDeleteMessage = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen onClose={onClose}>
      <div className="delete-message-modal-container">
        <div className="delete-message-modal-header">
          Are you sure you wanna delete the message?
        </div>

        <div className="delete-message-modal-message-content">
          {messageContent}
        </div>

        <div className="flex-center gap-2">
          <Button
            type="secondary"
            text="Cancel"
            onClick={onClose}
          />

          <Button text="Save" onClick={handleDeleteMessage} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteMessageModal;