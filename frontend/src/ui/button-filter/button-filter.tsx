import { FC } from "react";

import FilterNew from "../../assets/icons/filter-new.svg";
import FilterOld from "../../assets/icons/filter-old.svg";

import styles from "./button-filter.module.css";

interface IButtonFilter {
  text: string;
  onClick: () => void;
  active?: boolean;
  desk?: boolean;
  extraClass?: string;
}
const ButtonFilter: FC<IButtonFilter> = ({
  text,
  onClick,
  active,
  desk,
  extraClass,
}) => {
  return (
    <button
      className={`${styles.button} ${active && styles.active} ${extraClass}`}
      onClick={onClick}
    >
      {desk ? (
        <img className={styles.img_active} src={FilterOld} alt="filter" />
      ) : (
        <img className={styles.img_active} src={FilterNew} alt="filter" />
      )}
      {text}
    </button>
  );
};

export default ButtonFilter;
