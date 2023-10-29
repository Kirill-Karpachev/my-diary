import { FC } from "react";

import ArrowSVG from "../../assets/icons/arrow.svg";

import styles from "./button-up.module.css";

interface IButtonUp {
  text: string;
  onClick: () => void;
  extraClass?: string;
}
const ButtonUp: FC<IButtonUp> = ({ text, onClick, extraClass }) => {
  return (
    <button className={`${styles.button}  ${extraClass}`} onClick={onClick}>
      <img src={ArrowSVG} alt="arrow" />
      {text}
    </button>
  );
};

export default ButtonUp;
