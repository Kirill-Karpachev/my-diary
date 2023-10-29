import { FC, useEffect } from "react";
import ReactDom from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";

import CloseSVG from "../../assets/icons/close.svg";

import styles from "./modal.module.css";

const modalContainer = document.querySelector("#modal") as HTMLElement;

interface IModal {
  onClick: () => void;
  children: JSX.Element;
}

const Modal: FC<IModal> = ({ onClick, children }) => {
  useEffect(() => {
    function closeEscModal(evt: KeyboardEvent) {
      if (evt.key === "Escape") onClick();
    }

    document.addEventListener("keydown", closeEscModal);

    return () => {
      document.removeEventListener("keydown", closeEscModal);
    };
  }, [onClick]);

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClick={onClick} />
      <div className={styles.content}>
        {children}
        <button className={styles.close} onClick={onClick} type="button">
          <img src={CloseSVG} alt="close" />
        </button>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
