import { FC } from "react";
import styles from "./button.module.css";

interface IButton {
  text: string;
  onClick?: () => void;
  extraClass?: string;
  type?: "button" | "reset" | "submit";
}
const Button: FC<IButton> = ({
  text,
  onClick,
  extraClass,
  type,
}) => {
  return (
    <button
      className={`${styles.button} ${extraClass}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
