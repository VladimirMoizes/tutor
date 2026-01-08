import { useState, useCallback } from "react";

// Типы
type ValidationRule = {
  test: (value: string, allValues?: Record<string, string>) => boolean;
  message: string;
};

type ValidationRules = {
  [fieldName: string]: ValidationRule[];
};

type UseValidationConfig = {
  initialValues?: Record<string, string>;
};

// Сам хук
export const useValidation = (
  rules: ValidationRules,
  config: UseValidationConfig = {}
) => {
  // Состояние значений полей
  const [values, setValues] = useState<Record<string, string>>(
    config.initialValues || {}
  );

  // Состояние ошибок
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Функция для установки значения поля с валидацией
  const setFieldValue = useCallback(
    (fieldName: string, value: string) => {
      // 1. Обновляем значение поля
      setValues((prev) => {
        const newValues = { ...prev, [fieldName]: value };
        return newValues;
      });

      // 2. Валидируем поле
      const fieldRules = rules[fieldName];
      if (!fieldRules) return;

      // Проверяем все правила для этого поля
      for (const rule of fieldRules) {
        if (!rule.test(value, values)) {
          // Нашли ошибку - устанавливаем её
          setErrors((prev) => ({ ...prev, [fieldName]: rule.message }));
          return;
        }
      }

      // Если все правила прошли - очищаем ошибку
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    },
    [rules, values]
  );

  // Функция для валидации всей формы
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    // Проверяем все поля
    Object.keys(rules).forEach((fieldName) => {
      const value = values[fieldName] || "";
      const fieldRules = rules[fieldName];

      for (const rule of fieldRules) {
        if (!rule.test(value, values)) {
          newErrors[fieldName] = rule.message;
          hasErrors = true;
          break;
        }
      }
    });

    // Устанавливаем все ошибки разом
    setErrors(newErrors);
    return !hasErrors;
  }, [rules, values]);

  // Проверяем, валидна ли форма
  const isValid = Object.keys(errors).every((key) => !errors[key]);

  const resetForm = useCallback(() => {
    setValues(config.initialValues || {});
    setErrors({});
  }, [config.initialValues]);

  return {
    values,
    errors,
    isValid,
    setFieldValue,
    validateForm,
    resetForm
  };
};
