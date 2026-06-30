"use client";
import React from "react";
import { Modal } from "react-responsive-modal";
import ReactPlayer from "react-player";
import { EnquiryFormContainer } from "@/components/homes/home-one/EnquiryForm";
interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({
  isOpen,
  onClose,
  videoId,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      classNames={{ modal: "video-modal" }}
      styles={{
        modal: {
          padding: "0px",
          width: "fit-content",
          maxWidth: "fit-content",
          display: "inline-block",
          background: "#f7f7fa",
          borderRadius: "16px"
        },
        closeButton: {
          top: "12px",
          right: "12px",
          padding: "4px",
        },
      }}
    >
      <EnquiryFormContainer />
    </Modal>
  );
};

export default VideoPopup;
