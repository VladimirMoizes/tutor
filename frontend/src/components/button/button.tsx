import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./button.module.css";
import type { TButtonProps } from "./type";

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      onClick,
      disabled = false,
      htmlType = "button",
      className = "",
      children,
    },
    ref
  ) => {
    return (
      <button
        className={clsx(styles.button, className)}
        onClick={onClick}
        disabled={disabled}
        type={htmlType}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
