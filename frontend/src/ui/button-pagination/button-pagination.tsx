import { FC } from "react";
import styles from "./button-pagination.module.css";

interface IButtonPagination {
  item: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ButtonPagination: FC<IButtonPagination> = ({ item, page, setPage }) => {
  return (
    <button
      className={`${styles.button_pagination} ${
        page + 1 === item && styles.button_pagination_active
      }`}
      onClick={() => setPage(item - 1)}
    >
      {item}
    </button>
  );
};

export default ButtonPagination;
