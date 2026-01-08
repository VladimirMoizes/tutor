import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import styles from "./subject.module.css";
import Button from "../../components/button/button";
import { subjectDetails } from "../../constants/constants";
import {
  ArrowBackIcon,
  CheckIcon,
  ClockIcon,
  FormatIcon,
  StarIcon,
} from "../../components/icons/icons";

export const Subject = () => {
  const { subjectId } = useParams();
  const subject = subjectDetails.find((item) => item.id === Number(subjectId));
  const navigate = useNavigate();

  if (!subject) {
    return (
      <ContentWrapper className={styles.notFound}>
        <h2>Предмет не найден</h2>
        <p>Извините, запрашиваемый предмет не существует.</p>
        <NavLink to="/subjects">
          <Button>Вернуться к предметам</Button>
        </NavLink>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className={styles.subjectPage}>
      {/* Хедер страницы */}
      <header className={styles.subjectHeader}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowBackIcon className={styles.backIcon} />
          Назад к предметам
        </button>

        <div className={styles.subjectHero}>
          <div className={styles.iconWrapper}>{subject.icon}</div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{subject.title}</h1>
            <p className={styles.heroDescription}>{subject.description}</p>
            <div className={styles.priceBadge}>
              {subject.price} ₽/час
              <span className={styles.badgeNote}>Индивидуально</span>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <div className={styles.subjectContent}>
        {/* Программы для разных классов */}
        <section className={styles.gradeSection}>
          <h2 className={styles.sectionTitle}>Программы обучения</h2>
          <div className={styles.gradeCards}>
            {subject.gradeLevels.map((level, index) => (
              <div key={index} className={styles.gradeCard}>
                <div className={styles.gradeHeader}>
                  <h3 className={styles.gradeTitle}>{level.grade}</h3>
                  <span className={styles.focus}>{level.focus}</span>
                </div>
                <p className={styles.gradeDescription}>{level.description}</p>

                <div className={styles.topics}>
                  <h4>Основные темы:</h4>
                  <ul className={styles.topicsList}>
                    {level.topics.map((topic, idx) => (
                      <li key={idx} className={styles.topicItem}>
                        <CheckIcon className={styles.checkIcon} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <ClockIcon className={styles.metaIcon} />
                    {level.duration}
                  </div>
                  <div className={styles.metaItem}>
                    <FormatIcon className={styles.metaIcon} />
                    {level.format}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Преимущества подхода */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Особенности преподавания</h2>
          <div className={styles.featuresGrid}>
            {subject.features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <StarIcon />
                </div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Результаты обучения */}
        <section className={styles.resultsSection}>
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>Ожидаемый результат</h3>
            <p className={styles.resultDescription}>{subject.result}</p>
            <div className={styles.resultMetrics}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>95%</span>
                <span className={styles.metricLabel}>
                  учеников сдают экзамены
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>+2 балла</span>
                <span className={styles.metricLabel}>
                  средний прирост оценки
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Готовы начать обучение?</h2>
            <p className={styles.ctaDescription}>
              Запишитесь на первое пробное занятие и оцените качество
              преподавания
            </p>
            <div className={styles.ctaButtons}>
              <Button className={styles.primaryButton}>
                Записаться на пробный урок
              </Button>
              <Button className={styles.secondaryButton}>
                Бесплатная консультация
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ContentWrapper>
  );
};
