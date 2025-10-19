import { ContactsComponent } from "../../components/contacts/contactsComponent";
import { ContentWrapper } from "../../components/contentWrapper/contentWrapper";
import { Social } from "../../components/social/social";
import styles from "./contactsPage.module.css";
import { type FormEvent } from "react";
import { FormContacts } from "../../components/formContacts/formContacts";

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

        <FormContacts className={styles.form} onSubmit={() => handleSubmit} />
      </div>
    </ContentWrapper>
  );
};
