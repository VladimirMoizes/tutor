import type { ReactElement } from "react";

export type TMenuItem = {
  to: string;
  label: string;
};

export type TTheme = "light" | "dark";

export type TContact = {
  type: string;
  label: string;
  value: string;
  href: string;
  icon: ReactElement;
};

export type TContacts = TContact[];
