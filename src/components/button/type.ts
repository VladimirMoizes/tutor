export type TButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
};
