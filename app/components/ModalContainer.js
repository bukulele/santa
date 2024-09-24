import React, { useEffect } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

function ModalContainer({ modalIsOpen, children, setModalClose }) {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          contentLabel="Modal Popup"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={setModalClose ? setModalClose : null}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            content: {
              backgroundColor: "transparent",
              border: "none",
              inset: "unset",
              overflow: "hidden",
            },
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxHeight: "98%",
              maxWidth: "98%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflow: "hidden",
            }}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default ModalContainer;
