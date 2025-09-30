import { Form } from "../../components/form/form";
import { ContactsComponent } from "../../components/contacts/contactsComponent";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { Social } from "../../components/social/social";
import styles from "./contactsPage.module.css";
import { Input } from "../../components/input/input";
import { Select } from "../../components/select/select";
import { type FormEvent } from "react";
import { Button } from "../../components/button/button";
import clsx from "clsx";

const optionSubjects = ["математика", "физика", "информатика"];
let optionClasses = Array.from({ length: 11 }, (_, i) => i + 1);

export const ContactsPage = () => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };


  return (
    <ContentWrapper className={styles.contentContactsPage}>
      <h2>Свяжитесь со мной удобным способом</h2>
      <p>Буду рад ответить на ваши вопросы!</p>
      <div className={styles.contactsWrapper}>
        <ContactsComponent
          className={styles.pageContacts}
          itemClassName={styles.pageContactItem}
          iconClassName={styles.pageContactIcon}
          linkClassName={styles.pageContactLink}
        >
          {" "}
          <div className={styles.social}>
            <Social />
          </div>
        </ContactsComponent>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Свяжитесь со мной</h2>
          <Input
            placeholder="Иван Иванов"
            name="name"
            label="Ваше имя"
            required
            className={styles.input}
          />
          <Input
            placeholder="+7 (999) 999-99-99"
            type="tel"
            name="tel"
            label="Телефон"
            mask="phone"
            required
            className={styles.input}
          />
          <Select
            name="subjects"
            placeholderOption="Выберите предмет"
            label="Предмет"
            options={optionSubjects}
            required
            containerClassName={styles.field}
            className={clsx(`${styles.input} ${styles.select}`)}
          />
          <Select
            name="grade"
            placeholderOption="Выберите класс"
            label="Класс"
            required
            options={optionClasses}
            containerClassName={styles.field}
            className={clsx(`${styles.input} ${styles.select}`)}
          />
          <Input
            type="radio"
            name="agree"
            value="yes"
            className={styles.radio}
            label={
              <>
                Я согласен с{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  политикой конфиденциальности
                </a>
              </>
            }
            required
          />
          <div className={styles.buttonList}>
            <Button
              htmlType="submit"
              className={clsx(`${styles.formButton} ${styles.submitButton}`)}
            >
              Отправить
            </Button>
            <Button
              htmlType="reset"
              className={clsx(`${styles.formButton} ${styles.resetButton}`)}
            >
              Очистить форму
            </Button>
          </div>
        </Form>
      </div>
    </ContentWrapper>
  );
};
