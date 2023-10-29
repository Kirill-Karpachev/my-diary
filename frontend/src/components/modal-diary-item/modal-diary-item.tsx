import { FC, FormEvent, useEffect, useState } from "react";
import useForm from "../../hooks/use-form";
import { validation } from "../../utils/validation";
import styles from "./modal-diary-item.module.css";
import { diaryAPI } from "../../services/diary-service";
import { Button, Error } from "../../ui";
import { format } from "date-fns";

interface IModalDiaryItem {
  onClick: () => void;
  id: string;
}
// можно лучше, сделать один компонент с diary-form
const ModalDiaryItem: FC<IModalDiaryItem> = ({ onClick, id }) => {
  const { data: post, isSuccess, refetch } = diaryAPI.useGetPostByIdQuery(id);
  const [updatePostDiary] = diaryAPI.useUpdatePostDiaryMutation();
  const [deletePostDiary] = diaryAPI.useDeletePostDiaryMutation();
  const { values, handleChange, setValues } = useForm({
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

  useEffect(() => {
    refetch();
    if (isSuccess) {
      setValues({
        title: post?.title,
        date: format(new Date(post.date), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        description: post?.description,
      });
    }
  }, [isSuccess]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validation(values));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      updatePostDiary({ id, item: values });
      onClick();
    }
  }, [errors]);

  const handleDelete = () => {
    deletePostDiary(id);
    onClick();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.form_title}>Редактировать запись</h3>

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
              value={values.title}
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
              value={values.date}
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
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <Error />}
        </label>
      </div>

      <div className={styles.buttons}>
        <Button text="Сохранить изменения" extraClass={styles.modal_button} />
        <Button
          text="Удалить запись"
          extraClass={`${styles.modal_button} ${styles.modal_button_delete}`}
          type="button"
          onClick={() => handleDelete()}
        />
      </div>
    </form>
  );
};

export default ModalDiaryItem;
