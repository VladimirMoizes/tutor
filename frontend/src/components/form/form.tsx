import { type FormHTMLAttributes } from "react";

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  containerClassName?: string;
};

export const Form = ({
  children,
  className,
  containerClassName,
  onSubmit,
  ...rest
}: FormProps) => {
  return (
    <div className={containerClassName}>
      <form className={className} onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </div>
  );
};
