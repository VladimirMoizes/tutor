import { forwardRef, type ReactNode } from "react";
import styles from "./contentWrapper.module.css";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ContentWrapper = forwardRef<HTMLElement, ContentWrapperProps>(
  ({ children, className = "" }, ref) => {
    return (
      <section ref={ref} className={`${styles.content} ${className}`}>
        {children}
      </section>
    );
  }
);
