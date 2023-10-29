import ErrorSVG from "../../assets/icons/error.svg";
import styles from "./error.module.css";

const Error = () => {
  return (
    <span className={styles.error}>
      <img src={ErrorSVG} alt="error" /> Обязательное поле
    </span>
  );
};

export default Error;
