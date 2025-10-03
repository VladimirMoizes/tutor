import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { aboutSections } from "../../constants/constants";
import styles from "./about.module.css";

export const About = () => {
  return (
    <ContentWrapper className={styles.content}>
      <h2>Обо мне</h2>

      <div className={styles.about}>
        {aboutSections.map((item) => (
          <article key={item.id} className={styles.themeBlock}>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
            <div className={styles.descriptionBlock}>
              <h3 className={styles.title}>
                {item.id}. {item.title}
              </h3>
              <p className={styles.text}> {item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </ContentWrapper>
  );
};
