import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { useState, type SyntheticEvent } from "react";
import { loginUser } from "../../services/slices/userSlice";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

export const Login = ({ className }: FormContactsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log("Данные", { email, password });

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <Form
      className={clsx(`${styles.form} ${className}`)}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.formTitle}>Вход</h2>
      <Input
        required
        label="Логин"
        name="login"
        placeholder="ivan@mail.ru"
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        required
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
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
