import Button from "../button/button";
import { TelegramIcon, WhatsAppIcon } from "../icons/icons";
import styles from "./social.module.css";

export const Social = () => {
  return (
    <div className={styles.social}>
      <div className={styles.buttonList}>
        <Button className={styles.button}>
          <WhatsAppIcon className={styles.icon} />
        </Button>
        <Button className={styles.button}>
          <TelegramIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};
