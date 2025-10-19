import { useEffect, type ReactNode, useState } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleEscapeClose = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add("modal-open");
    } else if (isVisible) {
      handleClose();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove("modal-open");
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [isVisible, handleEscapeClose]);

  if (!isVisible && !isClosing) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.slideOut : styles.slideIn}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.closeButton} onClick={handleClose}>
          {icon}
        </div>
        <h3 className={styles.modalTitle}>{title}</h3>
        {children}
      </div>
    </div>
  );
};
