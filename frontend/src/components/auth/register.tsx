import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type SyntheticEvent } from "react";
import {
  getUserSelectors,
  registerUser,
  clearRegisterError,
} from "../../services/slices/userSlice";
import type { AppDispatch } from "../../services/store";
import { useValidation } from "../../hooks/useValidation";
import { registerRules } from "../../utils/validation-rules";

// type FormContactsProps = {
//   onSubmit?: () => void;
//   className?: string;
// };

// export const Register = ({ className }: FormContactsProps) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { values, errors, isValid, setFieldValue, validateForm } =
//     useValidation(registerRules);

//   const [userName, setUserName] = useState("");
//   const [userLastName, setUserLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     console.log("Отправляемые данные:", {
//       userName,
//       userLastName,
//       email,
//       password,
//     });

//     dispatch(
//       registerUser({
//         firstName: userName,
//         lastName: userLastName,
//         email,
//         password,
//       })
//     );
//   };

//   return (
//     <Form
//       className={clsx(`${styles.form} ${className}`)}
//       onSubmit={handleSubmit}
//     >
//       <h2 className={styles.formTitle}>Регистрация</h2>

//       <Input
//         required
//         label="Имя"
//         name="name"
//         placeholder="Иван"
//         className={styles.input}
//         onChange={(e) => setUserName(e.target.value)}
//       ></Input>
//       <Input
//         required
//         label="Фамилия"
//         name="lastName"
//         placeholder="Иванов"
//         className={styles.input}
//         onChange={(e) => setUserLastName(e.target.value)}
//       ></Input>
//       <Input
//         required
//         label="Логин"
//         name="login"
//         placeholder="ivan@mail.ru"
//         className={styles.input}
//         onChange={(e) => setEmail(e.target.value)}
//       ></Input>
//       <Input
//         required
//         label="Придумайте пароль"
//         type="password"
//         name="password"
//         placeholder="Придумайте пароль"
//         className={styles.input}
//         onChange={(e) => setPassword(e.target.value)}
//       ></Input>
//       <Input
//         required
//         label="Повторите пароль"
//         type="password"
//         name="repeatPassword"
//         placeholder="Повторите пароль"
//         className={styles.input}
//       ></Input>
//       <div className={styles.buttonList}>
//         <Button
//           htmlType="submit"
//           className={clsx(`${styles.formButton} ${styles.submitButton}`)}
//         >
//           Зарегистрироваться
//         </Button>
//         <Button
//           htmlType="reset"
//           className={clsx(`${styles.formButton} ${styles.resetButton}`)}
//         >
//           Очистить
//         </Button>
//       </div>
//     </Form>
//   );
// };

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

export const Register = ({ className }: FormContactsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Используем хук валидации вместо отдельных useState
  const { values, errors, isValid, setFieldValue, validateForm, resetForm } =
    useValidation(registerRules);

  const { registerUserError, registerUserRequest } =
    useSelector(getUserSelectors);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Валидируем форму перед отправкой
    if (validateForm()) {
      console.log("Отправляемые данные:", values);

      dispatch(
        registerUser({
          firstName: values.name, // Используем values из хука
          lastName: values.lastName, // Используем values из хука
          email: values.login, // Используем values из хука
          password: values.password, // Используем values из хука
        })
      );
    } else {
      console.log("Форма содержит ошибки:", errors);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValue(fieldName, value);
    // Если есть серверная ошибка, очищаем её при изменении полей
    if (registerUserError) {
      // Можно добавить action для очистки ошибки или она очистится при следующем запросе
      dispatch(clearRegisterError());
    }
  };

  const handleReset = () => {
    resetForm(); // Сбрасываем состояние валидации
    dispatch(clearRegisterError()); // Очищаем серверные ошибки
  };

  return (
    <Form
      className={clsx(`${styles.form} ${className}`)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <h2 className={styles.formTitle}>Регистрация</h2>

      <Input
        required
        label="Имя"
        name="name"
        placeholder="Иван"
        className={styles.input}
        value={values.name || ""} // Добавляем value из хука
        error={errors.name} // Добавляем ошибку из хука
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />
      <Input
        required
        label="Фамилия"
        name="lastName"
        placeholder="Иванов"
        className={styles.input}
        value={values.lastName || ""} // Добавляем value из хука
        error={errors.lastName} // Добавляем ошибку из хука
        onChange={(e) => handleFieldChange("lastName", e.target.value)}
      />
      <Input
        required
        label="Логин"
        name="login"
        placeholder="ivan@mail.ru"
        className={styles.input}
        value={values.login || ""} // Добавляем value из хука
        error={errors.login} // Добавляем ошибку из хука
        onChange={(e) => handleFieldChange("login", e.target.value)}
      />
      <Input
        required
        label="Придумайте пароль"
        type="password"
        name="password"
        placeholder="Придумайте пароль"
        className={styles.input}
        value={values.password || ""} // Добавляем value из хука
        error={errors.password} // Добавляем ошибку из хука
        onChange={(e) => handleFieldChange("password", e.target.value)}
      />
      <Input
        required
        label="Повторите пароль"
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        className={styles.input}
        value={values.repeatPassword || ""} // Добавляем value из хука
        error={errors.repeatPassword} // Добавляем ошибку из хука
        onChange={(e) => handleFieldChange("repeatPassword", e.target.value)}
      />

      {registerUserError && (
        <div
          className={styles.serverError}
          role="alert"
          style={{
            marginBottom: "16px",
            padding: "12px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            color: "#c33",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {registerUserError}
        </div>
      )}
      <div className={styles.buttonList}>
        <Button
          htmlType="submit"
          className={clsx(`${styles.formButton} ${styles.submitButton}`)}
          disabled={!isValid} // Блокируем кнопку если форма невалидна
        >
          {registerUserRequest ? "Регистрация..." : "Зарегистрироваться"}
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
