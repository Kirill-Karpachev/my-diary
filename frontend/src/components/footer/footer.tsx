import { ButtonUp } from "../../ui";
import styles from "./footer.module.css";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.footer_text}>Мой Дневничок</p>
        <ButtonUp
          text="Наверх"
          onClick={scrollTop}
          extraClass={styles.footer_button}
        />
      </div>
    </footer>
  );
};

export default Footer;
