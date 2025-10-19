import type { TContacts, TMenuItem } from "../types/types";
import {
  CalculatorIcon,
  CodeIcon,
  EmailIcon,
  LightningIcon,
  MapIcon,
  PhoneIcon,
} from "../components/icons/icons";

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

export const optionSubjects = ["математика", "физика", "информатика"];

export const subjectsSection = [
  {
    id: 1,
    icon: <CalculatorIcon />,
    title: "Математика",
    description:
      "Алгебра, геометрия, математический анализ, подготовка к ЕГЭ и олимпиадам",
    list: [
      "Решение уравнений и неравенств",
      "Стереометрия и планиметрия",
      "Функции и их свойства",
      "Производные и интегралы",
      "Подготовка к ЕГЭ (профиль)",
    ],
    price: "2500",
  },
  {
    id: 2,
    icon: <LightningIcon />,
    title: "Физика",
    description:
      "Механика, термодинамика, электричество, оптика, квантовая физика",
    list: [
      "Кинематика и динамика",
      "Электростатика и магнетизм",
      "Молекулярная физика",
      "Оптика и волны",
      "Подготовка к ЕГЭ",
    ],
    price: "2500",
  },
  {
    id: 3,
    icon: <CodeIcon />,
    title: "Информатика",
    description: "Программирование, алгоритмы, базы данных, подготовка к ЕГЭ",
    list: [
      "JavaScript, Python, Pascal",
      "Алгоритмы и структуры данных",
      "Логика и системы счисления",
      "Базы данных и Excel",
      "Подготовка к ЕГЭ",
    ],
    price: "2500",
  },
];

export const aboutSections = [
  {
    id: 1,
    title: "Репетиторская деятельность",
    image: "/images/tutor.jpg",
    alt: "Мое фото с дипломом",
    text: "Считаю, что математика, физика и информатика — это не просто школьные предметы, а увлекательные науки, развивающие мышление. Уже более 7 лет я помогаю детям и подросткам в этом убедиться. Индивидуальный подход к каждому и понятное объяснение сложных тем — залог нашего общего успеха. Я горжусь прогрессом и отзывами своих довольных учеников и их родителей",
  },
  {
    id: 2,
    title: "Преподавание",
    image: "/images/teacher.jpeg",
    alt: "Фото из инжинириума",
    text: "Моя цель — открыть для каждого ученика мир инженерии будущего. Работая в «Инжинириум МГТУ им. Баумана», я учу детей и подростков не просто собирать роботов и писать код, а мыслить как изобретатель. Через практические занятия по робототехнике, программированию и физике мы вместе постигаем законы мира и создаем технологии, которые меняют его. Я верю, что лучший способ выучить сложное — начать творить.",
  },
  {
    id: 3,
    title: "Высшее образование",
    image: "/images/diploma.jpg",
    alt: "Фото диплома",
    text: "Моё высшее образование — это фундамент, на котором строится преподавание. Я окончил Московский авиационный институт (МАИ) по специальности «Робототехнические и интеллектуальные системы», что дало мне глубокие теоретические знания. Для того чтобы эффективно передавать эти знания ученикам, я дополнительно прошёл сертификацию в МГТУ им. Баумана по методикам преподавания робототехники и программирования. Это сочетание позволяет мне не только увлечь детей практикой, но и заложить у них прочное понимание основ.",
  },
  {
    id: 4,
    title: "Дополнительное образование",
    image: "/images/diploma_additional.png",
    alt: "Фото диплома о дополнительном образовании",
    text: "Мое образование не ограничивается базовой специальностью. Я целенаправленно развиваюсь в двух, на первый взгляд, разных направлениях, что формирует системное мышление. Диплом «Специалиста в области управления проектами» в ракетно-космической отрасли научил меня работать со сложными задачами, где важны каждая деталь и строгий дедлайн. А профессиональная переподготовка в Яндекс Практикуме по программе «Фронтенд-разработчик» дала мне современные инструменты для создания цифровых продуктов. Этот сплав опыта позволяет мне решать задачи любой сложности — от стратегического планирования до технической реализации.",
  },
];

interface Lesson {
  [time: string]: string;
}

interface ScheduleDay {
  day: string;
  lessons: Lesson;
}

export const schedule: ScheduleDay[] = [
  {
    day: "Пн",
    lessons: {
      "18:00": "✔",
      "19:00": "✔",
    },
  },
  {
    day: "Вт",
    lessons: {
      "16:00": "✔",
      "17:00": "✔",
      "19:00": "✔",
    },
  },
  {
    day: "Ср",
    lessons: {
      "16:00": "✔",
      "17:00": "✔",
      "18:00": "✔",
      "19:00": "✔",
    },
  },
  {
    day: "Чт",
    lessons: {
      "16:00": "✔",
      "17:00": "✔",
      "19:00": "✔",
    },
  },
  {
    day: "Пт",
    lessons: {
      "16:00": "✔",
      "17:00": "✔",
    },
  },
  {
    day: "Сб",
    lessons: {
      "11:30": "✔",
    },
  },
  {
    day: "Вс",
    lessons: { "18:00": "✔" },
  },
];

const getAllUniqueTimes = (): string[] => {
  const times = new Set<string>();
  schedule.forEach((day) => {
    Object.keys(day.lessons).forEach((time) => times.add(time));
  });
  return Array.from(times).sort();
};

export const timeSchedule = getAllUniqueTimes();

export type Material = {
  id: number;
  subject: string;
  image: string;
  title: string;
  description: string;
  timeToRead?: number;
  format?: string;
};

export type Materials = Material[];

export const materials: Materials = [
  {
    id: 1,
    subject: "математика",
    image: "images/math_proizv.jpg",
    title: "Как решать задачи на производные",
    description:
      "Пошаговый алгоритм решения задач на нахождение производных функций",
    timeToRead: 8,
  },
  {
    id: 2,
    subject: "физика",
    image: "images/phys_kinem.jpg",
    title: "Основы кинематики в физике",
    description:
      "Разбираем основные понятия и формулы кинематики с примерами задач",
    timeToRead: 12,
  },
  {
    id: 3,
    subject: "информатика",
    image: "images/inf_alg.png",
    title: "Алгоритмы сортировки в JavaScript",
    description:
      "Сравнение различных алгоритмов сортировки и их реализация на JavaScript",
    timeToRead: 15,
  },
  {
    id: 4,
    subject: "математика",
    image: "images/math_zadach.webp",
    title: "Задачник по алгебре - 10 класс",
    description:
      "Сборник задач с подробными решениями по алгебре для 10 класса",
    format: "pdf",
  },
  {
    id: 5,
    subject: "физика",
    image: "images/phys_electro.jpg",
    title: "Электростатика: теория и практика",
    description: "Полный курс по электростатике с примерами и задачами",
    timeToRead: 20,
  },
  {
    id: 6,
    subject: "информатика",
    image: "images/inf_OOP.png",
    title: "Основы объектно-ориентированного программирования",
    description: "Введение в ООП: классы, объекты, наследование, инкапсуляция",
    timeToRead: 18,
  },
];

export const getSubjectClass = (subject: string): string => {
  switch (subject?.toLowerCase()) {
    case "физика":
      return "physics";
    case "математика":
      return "math";
    case "информатика":
      return "informatics";
    default:
      return "default";
  }
};
