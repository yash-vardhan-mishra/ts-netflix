import React, { useState } from "react";
import Modal from "react-modal";
import { IVideoResult } from "../../models";
import "./styles.css";

interface VideoPlayerProps {
  isOpen: boolean;
  selectedVideo: IVideoResult;
  onRequestClose: () => void;
}

function VideoPlayerComponent({
  isOpen,
  selectedVideo,
  onRequestClose,
}: VideoPlayerProps) {
  Modal.setAppElement("#root");
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <Modal
      className="custom-dialog"
      onAfterOpen={() => setModalOpened(true)}
      onAfterClose={() => setModalOpened(false)}
      isOpen={isOpen}
      style={{
        content: {
          margin: "auto",
          marginTop: "15%",
        },
        overlay: {
          margin: "auto",
        },
      }}
      contentLabel={selectedVideo.name}
      onRequestClose={onRequestClose}
    >
        {modalOpened ? (
          <iframe
            width="100%"
            height="360"
            allow="autoplay"
            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&mute=0`}
            title={selectedVideo.name}
          ></iframe>
        ) : null}
    </Modal>
  );
}

VideoPlayerComponent.defaultProps = {
  onRequestClose: () => {},
};

export default VideoPlayerComponent;
