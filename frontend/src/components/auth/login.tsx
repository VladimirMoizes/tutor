import clsx from "clsx";
import Button from "../button/button";
import { Form } from "../form/form";
import { Input } from "../input/input";
import styles from "./auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { type SyntheticEvent } from "react";
import {
  clearLoginError,
  getUserSelectors,
  loginUser,
} from "../../services/slices/userSlice";
import { useValidation } from "../../hooks/useValidation";
import { registerRules } from "../../utils/validation-rules";

type FormContactsProps = {
  onSubmit?: () => void;
  className?: string;
};

// export const Login = ({ className }: FormContactsProps) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { loginUserError, loginUserRequest } = useSelector(getUserSelectors);

//   const { values, errors, isValid, setFieldValue, validateForm, resetForm } =
//     useValidation(registerRules);

//   const handleFieldChange = (fieldName: string, value: string) => {
//     setFieldValue(fieldName, value);
//     // Очищаем серверную ошибку при изменении полей
//     if (loginUserError) {
//       dispatch(clearLoginError());
//     }
//   };

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     // Валидируем форму перед отправкой
//     if (validateForm()) {
//       console.log("Отправляемые данные:", values);

//       dispatch(
//         loginUser({
//           email: values.login,
//           password: values.password,
//         })
//       );
//     } else {
//       console.log("Форма содержит ошибки:", errors);
//     }
//   };

//   // Обработчик reset
//   const handleReset = () => {
//     resetForm(); // Сбрасываем состояние валидации
//     dispatch(clearLoginError()); // Очищаем серверные ошибки
//   };

//   return (
//     <Form
//       className={clsx(`${styles.form} ${className}`)}
//       onSubmit={handleSubmit}
//       onReset={handleReset}
//     >
//       <h2 className={styles.formTitle}>Вход</h2>
//       <Input
//         required
//         label="Логин"
//         name="login"
//         placeholder="ivan@mail.ru"
//         className={styles.input}
//         value={values.login || ""} // Добавляем value из хука
//         error={errors.login} // Добавляем ошибку из хука
//         onChange={(e) => handleFieldChange("login", e.target.value)}
//       ></Input>
//       <Input
//         required
//         label="Пароль"
//         type="password"
//         name="password"
//         placeholder="Введите пароль"
//         className={styles.input}
//         value={values.password || ""} // Добавляем value из хука
//         error={errors.password} // Добавляем ошибку из хука
//         onChange={(e) => handleFieldChange("password", e.target.value)}
//       ></Input>

//       {loginUserError && (
//         <div
//           className={styles.serverError}
//           role="alert"
//           style={{
//             marginBottom: "16px",
//             padding: "12px",
//             backgroundColor: "#fee",
//             border: "1px solid #fcc",
//             color: "#c33",
//             borderRadius: "4px",
//             textAlign: "center",
//           }}
//         >
//           {loginUserError}
//         </div>
//       )}

//       <div className={styles.buttonList}>
//         <Button
//           htmlType="submit"
//           className={clsx(`${styles.formButton} ${styles.submitButton}`)}
//           disabled={!isValid}
//         >
//           {loginUserRequest ? "Войти" : "Вход"}
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

export const Login = ({ className }: FormContactsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Используем селекторы для получения ошибок и состояния загрузки логина
  const { loginUserError, loginUserRequest } = useSelector(getUserSelectors);

  // Используем только нужные поля из registerRules
  const loginRules = {
    login: registerRules.login,
    password: registerRules.password,
  };

  const { values, errors, isValid, setFieldValue, validateForm, resetForm } =
    useValidation(loginRules);

  // Очищаем серверную ошибку при изменении любого поля
  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValue(fieldName, value);
    // Очищаем серверную ошибку при изменении полей
    if (loginUserError) {
      dispatch(clearLoginError());
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Валидируем форму перед отправкой
    if (validateForm()) {
      console.log("Отправляемые данные:", values);

      dispatch(
        loginUser({
          email: values.login,
          password: values.password,
        })
      );
    } else {
      console.log("Форма содержит ошибки:", errors);
    }
  };

  // Обработчик reset
  const handleReset = () => {
    resetForm(); // Сбрасываем состояние валидации
    dispatch(clearLoginError()); // Очищаем серверные ошибки
  };

  return (
    <Form
      className={clsx(`${styles.form} ${className}`)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <h2 className={styles.formTitle}>Вход</h2>

      <Input
        required
        label="Логин"
        name="login"
        placeholder="ivan@mail.ru"
        className={styles.input}
        value={values.login || ""}
        error={errors.login}
        onChange={(e) => handleFieldChange("login", e.target.value)}
      />
      <Input
        required
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        className={styles.input}
        value={values.password || ""}
        error={errors.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
      />

      {/* Серверная ошибка - показываем перед кнопками */}
      {loginUserError && (
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
          {loginUserError}
        </div>
      )}

      <div className={styles.buttonList}>
        <Button
          htmlType="submit"
          className={clsx(`${styles.formButton} ${styles.submitButton}`)}
          disabled={!isValid || loginUserRequest}
        >
          {loginUserRequest ? "Вход..." : "Войти"}
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
