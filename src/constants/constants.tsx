import type { TContacts, TMenuItem } from "../types/types";
import { EmailIcon, MapIcon, PhoneIcon } from "../components/icons/icons";

export const menuItems: TMenuItem[] = [
  { to: "/", label: "Главная" },
  { to: "/about", label: "Обо мне" },
  { to: "/subjects", label: "Предметы" },
  { to: "/materials", label: "Материалы" },
  { to: "/schedule", label: "Расписание" },
  { to: "/contacts", label: "Контакты" },
];

export const contacts: TContacts = [
  {
    type: "phone",
    label: "Телефон",
    value: "+7-(969)-196-95-95",
    href: "tel:+79691969595",
    icon: <PhoneIcon />,
  },
  {
    type: "email",
    label: "Email",
    value: "vova3x20@mail.ru",
    href: "mailto:vova3x20@mail.ru",
    icon: <EmailIcon />,
  },
  {
    type: "address",
    label: "Адрес",
    value: "г. Москва",
    href: "https://yandex.ru/maps/Moscow",
    icon: <MapIcon />,
  },
];
