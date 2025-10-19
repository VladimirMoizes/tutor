import clsx from "clsx";
import { Form } from "../form/form";
import { Input } from "../input/input";
import { Select } from "../select/select";
import styles from "./formContacts.module.css";
import { optionSubjects } from "../../constants/constants";
import Button from "../button/button";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string
};

let optionClasses = Array.from({ length: 11 }, (_, i) => i + 1);

export const FormContacts = ({ onSubmit, className }: FormContactsProps) => {
  return (
    <Form className={clsx(`${styles.form} ${className}`)} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Свяжитесь со мной</h2>
      <Input
        placeholder="Иван Иванов"
        name="name"
        label="Ваше имя"
        required
        className={styles.input}
      />
      <Input
        placeholder="+7 (999) 999-99-99"
        type="tel"
        name="tel"
        label="Телефон"
        mask="phone"
        required
        className={styles.input}
      />
      <Select
        name="subjects"
        placeholderOption="Выберите предмет"
        label="Предмет"
        options={optionSubjects}
        required
        containerClassName={styles.field}
        className={clsx(`${styles.input} ${styles.select}`)}
      />
      <Select
        name="grade"
        placeholderOption="Выберите класс"
        label="Класс"
        required
        options={optionClasses}
        containerClassName={styles.field}
        className={clsx(`${styles.input} ${styles.select}`)}
      />
      <Input
        type="radio"
        name="agree"
        value="yes"
        className={styles.radio}
        label={
          <>
            Я согласен с{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              политикой конфиденциальности
            </a>
          </>
        }
        required
      />
      <div className={styles.buttonList}>
        <Button
          htmlType="submit"
          className={clsx(`${styles.formButton} ${styles.submitButton}`)}
        >
          Отправить
        </Button>
        <Button
          htmlType="reset"
          className={clsx(`${styles.formButton} ${styles.resetButton}`)}
        >
          Очистить форму
        </Button>
      </div>
    </Form>
  );
};
