import { FC } from "react";
import styles from "./button.module.css";

interface IButton {
  text: string;
  onClick?: () => void;
  extraClass?: string;
}
const Button: FC<IButton> = ({ text, onClick, extraClass }) => {
  return (
    <button className={`${styles.button} ${extraClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
