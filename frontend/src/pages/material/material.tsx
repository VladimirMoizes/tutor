import { NavLink, useNavigate, useParams } from "react-router-dom";
import { materials } from "../../constants/constants";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import styles from "./material.module.css";
import Button from "../../components/button/button";
import { ArrowBackIcon } from "../../components/icons/icons";

export const Material = () => {
  const { materialId } = useParams();
  const material = materials.find((item) => item.id === Number(materialId));

  const navigate = useNavigate();

  if (!material) {
    return (
      <ContentWrapper className={styles.notFound}>
        <h2>Не найдено</h2>
        <p>Извините, в данный момент статья не доступна.</p>
        <NavLink to="/materials">
          <Button>Вернуться к материалам</Button>
        </NavLink>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className={styles.materialPage}>
      {/* Хедер страницы */}
      <header className={styles.subjectHeader}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowBackIcon className={styles.backIcon} />
          Назад к предметам
        </button>
      </header>
      <section>
        <p>{material.details && material.details.text}</p>
      </section>
    </ContentWrapper>
  );
};
