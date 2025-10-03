import { useNavigate } from "react-router-dom";
import styles from "./NotFound404.module.css";
import { Button } from "../../components/button/button";

export const NotFound404 = () => {
  const navigate = useNavigate();

  const backToMain = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1>404 ERROR</h1>
        <h2 className={styles.mainTitle}>Страница не существует</h2>
        <img src="/images/not_found_image.webp" alt="Картинка кота" />
        <Button onClick={backToMain} className={styles.button}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};
