import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

export const Register = ({ onSubmit, className }: FormContactsProps) => {
  return (
    <Form className={clsx(`${styles.form} ${className}`)} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Регистрация</h2>
      <Input
        required
        label="Имя"
        name="name"
        placeholder="Иван"
        className={styles.input}
      ></Input>
      <Input
        required
        label="Фамилия"
        name="lastName"
        placeholder="Иванов"
        className={styles.input}
      ></Input>
      <Input
        required
        label="Логин"
        name="login"
        placeholder="ivan@mail.ru"
        className={styles.input}
      ></Input>
      <Input
        required
        label="Придумайте пароль"
        type="password"
        name="password"
        placeholder="Придумайте пароль"
        className={styles.input}
      ></Input>
      <Input
        required
        label="Повторите пароль"
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        className={styles.input}
      ></Input>
      <div className={styles.buttonList}>
        <Button
          htmlType="submit"
          className={clsx(`${styles.formButton} ${styles.submitButton}`)}
        >
          Зарегистрироваться
        </Button>
        <Button
          htmlType="reset"
          className={clsx(`${styles.formButton} ${styles.resetButton}`)}
        >
          Очистить
        </Button>
      </div>
    </Form>
  );
};
