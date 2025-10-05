import Button from "../../components/button/button";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { ArrowIcon, MarkerIcon } from "../../components/icons/icons";
import { subjectsSection } from "../../constants/constants";
import styles from "./subjects.module.css";

export const Subjects = () => {
  return (
    <ContentWrapper className={styles.sectionSubjects}>
      <h2 className={styles.title}>Какие предметы преподаю</h2>
      <p>Глубокие знания и современные методики преподавания точных наук</p>
      <ul className={styles.subjects}>
        {subjectsSection.map((item, index) => {
          return (
            <li key={item.id} className={styles.cardItem}>
              <article className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.descriptionSubject}>{item.description}</p>
                <ul className={styles.listDescription}>
                  {item.list.map((listItem, listIndex) => {
                    return (
                      <li key={listIndex} className={styles.listItem}>
                        <MarkerIcon
                          className={`${styles.marker} ${styles[`markerColor${index + 1}`]}`}
                        />
                        <span>{listItem}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className={styles.priceBlock}>
                  <p className={styles.price}>{item.price} ₽/час</p>
                  <p className={styles.plate}>Индивидуально</p>
                </div>
                <Button className={styles.button}>
                  <span>Подробнее</span>
                  <ArrowIcon className={styles.arrowIcon} />
                </Button>
              </article>
            </li>
          );
        })}
      </ul>
    </ContentWrapper>
  );
};
