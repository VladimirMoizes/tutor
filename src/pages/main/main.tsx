import clsx from "clsx";
import Button from "../../components/button/button";
import { ArrowIcon, BookIcon, PlayIcon } from "../../components/icons/icons";
import styles from "./main.module.css";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";

export const Main = () => {
  return (
    <ContentWrapper className={styles.content}>
      <div className={styles.mainStart}>
        <h1 className={styles.title}>
          Индивидуальные уроки по{" "}
          <span className={styles.colorFirst}>математике</span>,
          <span className={styles.colorSecond}> физике </span> и
          <span className={styles.colorThird}> информатике</span>
        </h1>
        <p className={styles.mainText}>
          Подготовка к ЕГЭ, повышение успеваемости и глубокое понимание точных
          наук. Индивидуальный подход к каждому ученику.
        </p>
        <div className={styles.achievements}>
          <div className={styles.achievement}>
            <p className={clsx(styles.numbers, styles.colorFirst)}>7 +</p>
            <span>лет опыта</span>
          </div>
          <div className={styles.achievement}>
            <p className={clsx(styles.numbers, styles.colorSecond)}>100 +</p>
            <span>учеников</span>
          </div>
          <div className={styles.achievement}>
            <p className={clsx(styles.numbers, styles.colorThird)}>80 +</p>
            <span>баллов ЕГЭ</span>
          </div>
        </div>
        <div className={styles.buttonList}>
          <Button className={styles.buttonSchedule}>
            <BookIcon className={styles.icon} />
            <span>Записаться на урок</span>
            <ArrowIcon className={styles.icon} />
          </Button>
          <Button className={styles.buttonVideo}>
            <PlayIcon className={styles.icon} />
            <span>Смотреть видео</span>
          </Button>
        </div>
      </div>
      <div className={styles.mainEnd}>
        <img src="/images/my_photo_main.jpg" alt="Моё фото" />
      </div>
    </ContentWrapper>
  );
};
