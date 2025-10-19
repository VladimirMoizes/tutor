import { Register } from "../../components/auth/register";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import styles from "./authPage.module.css";
import Button from "../../components/button/button";
import { Login } from "../../components/auth/login";
import { useState } from "react";

export const Auth = () => {
  const [isHaveAccount, setIsHaveAccount] = useState(true);

  return (
    <ContentWrapper className={styles.auth}>
      {!isHaveAccount ? (
        <div className={styles.authForm}>
          <Register></Register>
        </div>
      ) : (
        <div className={styles.authForm}>
          <Login></Login>
        </div>
      )}
      <Button
        className={styles.button}
        onClick={() => setIsHaveAccount((prev) => !prev)}
      >
        {isHaveAccount
          ? "Нет аккаунта / Зарегистрироваться"
          : "Уже есть аккаунт /Войти"}
      </Button>
    </ContentWrapper>
  );
};
