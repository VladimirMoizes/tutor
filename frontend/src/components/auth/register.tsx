import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";
import { useDispatch } from "react-redux";
import { useState, type SyntheticEvent } from "react";
import { registerUser } from "../../services/slices/userSlice";
import type { AppDispatch } from "../../services/store";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

export const Register = ({ className }: FormContactsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log("Отправляемые данные:", {
      userName,
      userLastName,
      email,
      password,
    });

    dispatch(
      registerUser({
        firstName: userName,
        lastName: userLastName,
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
      <h2 className={styles.formTitle}>Регистрация</h2>
      
      <Input
        required
        label="Имя"
        name="name"
        placeholder="Иван"
        className={styles.input}
        onChange={(e) => setUserName(e.target.value)}
      ></Input>
      <Input
        required
        label="Фамилия"
        name="lastName"
        placeholder="Иванов"
        className={styles.input}
        onChange={(e) => setUserLastName(e.target.value)}
      ></Input>
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
        label="Придумайте пароль"
        type="password"
        name="password"
        placeholder="Придумайте пароль"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
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
