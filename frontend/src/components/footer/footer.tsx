import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { ContactsComponent } from "../contacts/contactsComponent";
import { Social } from "../social/social";
import { menuItems } from "../../constants/constants";
import clsx from "clsx";

export const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div
          className={clsx(`${styles.footerBlock} ${styles.footerDescription}`)}
        >
          <div className={styles.footerLogo}>
            <button
              className={styles.buttonLogo}
              aria-label="Калькулятор"
              type="button"
            >
              <img
                className={styles.imageCalc}
                src="/images/calculator.png"
                alt="Калькулятор"
              />
            </button>
            <h3 className={styles.blockTitle}>MathTutor</h3>
          </div>
          <p>
            Индивидуальные уроки по математике, физике и информатике. Подготовка
            к ЕГЭ и повышение успеваемости.
          </p>
        </div>

        <div className={clsx(`${styles.footerBlock} ${styles.footerLinks}`)}>
          <h3 className={styles.blockTitle}>Быстрые ссылки</h3>
          <nav className={styles.linkList}>
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={styles.link}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={clsx(`${styles.footerBlock} ${styles.footerContacts}`)}>
          <h3 className={styles.blockTitle}>Контакты</h3>
          <ContactsComponent
            className={styles.footerContacts}
            itemClassName={styles.footerContactItem}
            iconClassName={styles.footerContactIcon}
            linkClassName={styles.footerContactLink}
          />
        </div>

        <div className={clsx(`${styles.footerBlock} ${styles.footerSocial}`)}>
          <h3 className={styles.blockTitle}>Социальные сети</h3>
          <Social />
        </div>
      </div>
    </footer>
  );
};
