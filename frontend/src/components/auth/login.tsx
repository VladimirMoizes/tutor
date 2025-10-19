import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

export const Login = ({ onSubmit, className }: FormContactsProps) => {
  return (
    <Form className={clsx(`${styles.form} ${className}`)} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Вход</h2>
      <Input
        required
        label="Логин"
        name="login"
        placeholder="ivan@mail.ru"
        className={styles.input}
      ></Input>
      <Input
        required
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        className={styles.input}
      ></Input>
      <div className={styles.buttonList}>
        <Button
          htmlType="submit"
          className={clsx(`${styles.formButton} ${styles.submitButton}`)}
        >
          Войти
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
