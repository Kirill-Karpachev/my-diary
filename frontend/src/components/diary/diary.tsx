import { useEffect, useState } from "react";
import { diaryAPI } from "../../services/diary-service";

import DiaryItem from "../diary-item/diary-item";

import { ButtonFilter, ButtonWhite } from "../../ui";
import ArrowLeftSVG from "../../assets/icons/arrow-left.svg";
import ArrowRightSVG from "../../assets/icons/arrow-right.svg";

import styles from "./diary.module.css";

const Diary = () => {
  const [sort, setSort] = useState<"ask" | "desk">("ask");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const { data: diary } = diaryAPI.useGetAllDiaryQuery({
    sort,
    page,
    limit,
  });
  const [totalPage, setTotalPage] = useState(0);

  const pagesArray: number[] = [];
  for (let i = 0; i < totalPage; i++) {
    pagesArray.push(i + 1);
  }

  useEffect(() => {
    if (diary) {
      setTotalPage(Math.ceil(diary?.totalItems / limit));
    }
  }, [diary, limit]);

  return (
    <main className={styles.main}>
      <div className={styles.main_container}>
        <div className={styles.main_header}>
          <h1 className={styles.title}>Мой дневничок</h1>
          <div className={styles.buttons}>
            <ButtonFilter
              text="Сначала новые"
              onClick={() => setSort("ask")}
              active={sort === "ask"}
            />
            <ButtonFilter
              text="Сначала старые"
              onClick={() => setSort("desk")}
              active={sort === "desk"}
              desk
            />
          </div>
        </div>

        <ul className={styles.list}>
          {diary?.date.map((item) => (
            <DiaryItem
              key={item._id}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          ))}
        </ul>

        {pagesArray.length > 1 && (
          <ButtonWhite
            extraClass={styles.button_diary}
            text="Показать больше"
            onClick={() => {
              setPage(0);
              setLimit((limit) => limit + 6);
            }}
          />
        )}

        {pagesArray.length > 1 && (
          <ul className={styles.buttons_list}>
            <li>
              <button
                className={styles.button_pagination}
                onClick={() => (page !== 0 ? setPage(page - 1) : null)}
              >
                <img src={ArrowLeftSVG} alt="ArrowLeft" />
              </button>
            </li>
            {pagesArray.map((item) => (
              <li key={item}>
                <button
                  className={`${styles.button_pagination} ${
                    page + 1 === item && styles.button_pagination_active
                  }`}
                  onClick={() => setPage(item - 1)}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button
                className={styles.button_pagination}
                onClick={() =>
                  page !== totalPage - 1 ? setPage(page + 1) : null
                }
              >
                <img src={ArrowRightSVG} alt="ArrowRight" />
              </button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
};

export default Diary;
