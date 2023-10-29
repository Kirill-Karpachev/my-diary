import { FC, FormEvent, useEffect, useState } from "react";
import useForm from "../../hooks/use-form";
import { validation } from "../../utils/validation";
import { diaryAPI } from "../../services/diary-service";

import { Button } from "../../ui";
import Error from "../../ui/error/error";

import styles from "./diary-form.module.css";

interface IDiaryForm {
  onClick: () => void;
}

const DiaryForm: FC<IDiaryForm> = ({ onClick }) => {
  const { values, handleChange } = useForm({
    title: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    date: false,
    description: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const [postDiary] = diaryAPI.usePostDiaryMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validation(values));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      postDiary(values);
      onClick();
    }
  }, [errors]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.form_title}>Новая запись</h3>

      <div className={styles.form_inputs_container}>
        <div className={styles.form_inputs}>
          <label className={styles.form_label}>
            Заголовок
            <input
              className={`${styles.form_input} ${
                errors.title && styles.form_input_error
              }`}
              name="title"
              type="text"
              minLength={1}
              maxLength={200}
              value={values.title.text}
              onChange={handleChange}
            />
            {errors.title && <Error />}
          </label>
          <label className={styles.form_label}>
            Дата
            <input
              className={`${styles.form_input} ${
                errors.date && styles.form_input_error
              }`}
              name="date"
              type="datetime-local"
              value={values.date.text}
              onChange={handleChange}
            />
            {errors.date && <Error />}
          </label>
        </div>

        <label className={styles.form_label}>
          Заметка
          <textarea
            className={`${styles.form_input} ${styles.form_textarea} ${
              errors.description && styles.form_input_error
            }`}
            name="description"
            maxLength={2000}
            minLength={1}
            value={values.description.text}
            onChange={handleChange}
          />
          {errors.description && <Error />}
        </label>
      </div>

      <Button text="Поделиться наболевшим" extraClass={styles.modal_button} />
    </form>
  );
};

export default DiaryForm;
