import styles from "./contactsComponent.module.css";
import { contacts } from "../../constants/constants";
import type { ReactNode } from "react";

interface ContactsComponentProps {
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  linkClassName?: string;
  children?: ReactNode;
}

export const ContactsComponent = ({
  className = "",
  itemClassName = "",
  iconClassName = "",
  linkClassName = "",
  children,
}: ContactsComponentProps) => {
  return (
    <div className={`${styles.contacts} ${className}`}>
      {contacts.map((contact) => (
        <div
          key={contact.label}
          className={`${styles.contactItem} ${itemClassName}`}
        >
          <span className={`${styles.contactIcon} ${iconClassName}`}>
            {contact.icon}
          </span>
          <a
            className={`${styles.contactLink} ${linkClassName}`}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{contact.value}</span>
          </a>
        </div>
      ))}
      {children}
    </div>
  );
};
