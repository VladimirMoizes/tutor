import { useState } from "react";
import Button from "../../components/button/button";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { BookIcon, ClockIcon } from "../../components/icons/icons";
import { getSubjectClass, materials } from "../../constants/constants";
import styles from "./materials.module.css";
import { NavLink } from "react-router-dom";

export const Materials = () => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const showMaterials = showAll ? materials : materials.slice(0, 3);

  return (
    <ContentWrapper className={styles.materials}>
      <h2>Материалы</h2>
      <p className={styles.materialsDescription}>
        Авторские статьи, задачники и методические пособия для изучения точных
        наук
      </p>
      <ul className={styles.list}>
        {showMaterials.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <article className={styles.card}>
              <div
                className={`${styles.plate} ${styles[getSubjectClass(item.subject)]}`}
              >
                {item.subject}
              </div>
              <img
                className={styles.cardImage}
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.timeToRead}>
                  <ClockIcon className={styles.clockIcon} />
                  {item.timeToRead ? `${item.timeToRead} мин` : item.format}
                </span>
                <NavLink to={`/material/${item.id}`}>
                  <Button className={styles.button}>
                    Читать
                    <BookIcon className={styles.bookIcon} />
                  </Button>
                </NavLink>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {materials.length > 3 && (
        <Button onClick={handleShowAll} className={styles.moreButton}>
          {showAll ? "Скрыть" : "Показать ещё"}
        </Button>
      )}
    </ContentWrapper>
  );
};
