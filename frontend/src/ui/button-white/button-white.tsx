import { FC } from "react";
import styles from "./button-white.module.css";

interface IButtonWhite {
  text: string;
  onClick: () => void;
  extraClass?: string;
}
const ButtonWhite: FC<IButtonWhite> = ({ text, onClick, extraClass }) => {
  return (
    <button className={`${extraClass} ${styles.button}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonWhite;
