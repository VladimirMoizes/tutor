import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { schedule, timeSchedule } from "../../constants/constants";
import styles from "./schedule.module.css";

export const Schedule = () => {
  return (
    <ContentWrapper>
      <h2 className={styles.heading}>Расписание</h2>
      <p className={styles.scheduleDescription}>
        На этой странице можно ознакомиться с уже занятым временем
      </p>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <caption>Расписание занятий</caption>
          <thead>
            <tr>
              <th>Время</th>
              {schedule.map((item) => (
                <th key={item.day}>{item.day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSchedule.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {schedule.map((day) => (
                  <td key={`${day.day}-${time}`}>{day.lessons[time]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className={styles.legendBlock}>
          <div className={styles.legend}></div>
          <span className={styles.legendDescription}>- занято</span>
        </div>
        <div className={styles.legendBlock}>
          <div className={styles.legend}></div>
          <span className={styles.legendDescription}>- свободно</span>
        </div>
      </div>
    </ContentWrapper>
  );
};
