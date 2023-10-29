import { FC } from "react";
import PostSVG from "../../assets/icons/post.svg";

import styles from "./button-mobile.module.css";
interface IButtonMobile {
  onClick: () => void;
}

const ButtonMobile: FC<IButtonMobile> = ({ onClick }) => {
  return (
    <button className={styles.button_mobile} onClick={onClick}>
      <img src={PostSVG} alt="post" />
    </button>
  );
};

export default ButtonMobile;
