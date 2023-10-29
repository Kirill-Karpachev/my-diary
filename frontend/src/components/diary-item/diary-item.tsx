import { FC } from "react";
import { format } from "date-fns";

import DateSVG from "../../assets/icons/date.svg";
import ClockSVG from "../../assets/icons/clock.svg";

import styles from "./diary-item.module.css";

interface IDiaryItem {
  title: string;
  description: string;
  date: string;
}

const DiaryItem: FC<IDiaryItem> = ({ title, description, date }) => {
  const day = format(new Date(date), "dd.MM.y");
  const clock = format(new Date(date), "kk:mm");

  return (
    <li className={styles.item}>
      <div>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.date_container}>
        <div className={styles.date_item}>
          <img src={DateSVG} alt="date" />
          <p className={styles.date_text}>{day}</p>
        </div>
        <div className={styles.date_item}>
          <img src={ClockSVG} alt="clock" />
          <p className={styles.date_text}>{clock}</p>
        </div>
      </div>
    </li>
  );
};

export default DiaryItem;
