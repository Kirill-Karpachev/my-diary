import useModal from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";

import Logo from "../../assets/icons/logo.svg";
import { Button } from "../../ui";
import DiaryForm from "../diary-form/diary-form";
import Modal from "../modal/modal";

import styles from "./header.module.css";
import ButtonMobile from "../../ui/button-mobile/button-mobile";

const Header = () => {
  const { closeModal, openModal, isModalOpen } = useModal();
  const isMobile = useMediaQuery({
    query: "(max-width: 376px)",
  });

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img className={styles.logo} src={Logo} alt="logo" />
        {isMobile ? (
          <ButtonMobile onClick={openModal} />
        ) : (
          <Button
            text="Написать"
            onClick={openModal}
            extraClass={styles.header_button}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal onClick={closeModal}>
          <DiaryForm onClick={closeModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
