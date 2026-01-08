export const registerRules = {
  name: [
    {
      test: (value: string) => value.trim().length > 0,
      message: "Имя обязательно для заполнения",
    },
    {
      test: (value: string) => value.trim().length >= 2,
      message: "Имя должно содержать минимум 2 символа",
    },
  ],
  lastName: [
    {
      test: (value: string) => value.trim().length > 0,
      message: "Фамилия обязательна для заполнения",
    },
  ],
  login: [
    {
      test: (value: string) => value.trim().length > 0,
      message: "Email обязателен для заполнения",
    },
    {
      test: (value: string) => value.includes("@") && value.includes("."),
      message: "Введите корректный email адрес",
    },
  ],
  password: [
    {
      test: (value: string) => value.length > 0,
      message: "Пароль обязателен для заполнения",
    },
    {
      test: (value: string) => value.length >= 6,
      message: "Пароль должен содержать минимум 6 символов",
    },
  ],
  repeatPassword: [
    {
      test: (value: string) => value.length > 0,
      message: "Повторите пароль",
    },
    {
      test: (value: string, allValues?: Record<string, string>) =>
        value === allValues?.password,
      message: "Пароли не совпадают",
    },
  ],
};
