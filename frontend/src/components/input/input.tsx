import React, { forwardRef, useEffect, useId, useRef, useState } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  containerClassName?: string;
  mask?: "phone";
};

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(value);
      else (ref as React.RefObject<T | null>).current = value;
    });
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    name,
    type = "text",
    label,
    value,
    error,
    containerClassName,
    className,
    mask,
    onChange,
    ...rest
  },
  ref
) {
  const uid = useId();
  const inputId = id ?? name ?? `input-${uid}`;
  const isCheck = type === "checkbox" || type === "radio";
  const describedBy = error ? `${inputId}-error` : undefined;

  const innerRef = useRef<HTMLInputElement>(null);
  const setRefs = mergeRefs<HTMLInputElement>(ref, innerRef);

  const [phoneValue, setPhoneValue] = useState("");
  const [phoneMaskActive, setPhoneMaskActive] = useState(false);

  function formatRuPhone(digits: string) {
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (digits.startsWith("9")) digits = "7" + digits; // prepend 7
    if (!digits.startsWith("7")) digits = "7" + digits;

    let f = "+7";
    if (digits.length > 1) f += " (" + digits.slice(1, 4);
    if (digits.length >= 4) f += ") " + digits.slice(4, 7);
    if (digits.length >= 7) f += "-" + digits.slice(7, 9);
    if (digits.length >= 9) f += "-" + digits.slice(9, 11);
    return f;
  }

  function caretPosByDigitsCount(formatted: string, digitsCountLeft: number) {
    if (digitsCountLeft <= 0) return 0;
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) count++;
      if (count === digitsCountLeft) return i + 1;
    }
    return formatted.length;
  }

  useEffect(() => {
    if (mask !== "phone") return;
    const el = innerRef.current;
    if (!el) return;
    const form = el.closest("form");
    if (!form) return;

    const handleReset = () => {
      setPhoneValue("");
      setPhoneMaskActive(false);
      requestAnimationFrame(() => innerRef.current?.setSelectionRange(0, 0));
    };

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [mask]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const el = innerRef.current;
    const raw = e.target.value;
    const caret = el?.selectionStart ?? raw.length;

    const rawDigitsLeft = raw.slice(0, caret).replace(/\D/g, "").length;

    let digits = raw.replace(/\D/g, "");

    if (digits.length === 0) {
      setPhoneMaskActive(false);
      setPhoneValue("");
      onChange?.({
        ...e,
        target: { ...e.target, value: "" },
        currentTarget: { ...e.currentTarget, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      requestAnimationFrame(() => innerRef.current?.setSelectionRange(0, 0));
      return;
    }

    let activateNow = false;
    if (!phoneMaskActive) {
      const first = digits[0];
      if (
        first === "9" ||
        raw.startsWith("+7") ||
        first === "7" ||
        first === "8" ||
        first === "4"
      ) {
        activateNow = true;
        setPhoneMaskActive(true);
      }
    }

    if (!phoneMaskActive && !activateNow) {
      setPhoneValue(raw);
      onChange?.(e);
      return;
    }

    let caretDigitsLeft = rawDigitsLeft;
    if (
      activateNow &&
      (digits[0] === "9" || digits[0] === "4") &&
      rawDigitsLeft > 0
    ) {
      caretDigitsLeft += 1;
    }

    const formatted = formatRuPhone(digits);
    setPhoneValue(formatted);

    requestAnimationFrame(() => {
      const pos = caretPosByDigitsCount(formatted, caretDigitsLeft);
      innerRef.current?.setSelectionRange(pos, pos);
    });

    onChange?.({
      ...e,
      target: { ...e.target, value: formatted },
      currentTarget: { ...e.currentTarget, value: formatted },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Tab",
    ];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key.length === 1 && /[A-Za-zА-Яа-яЁё]/.test(e.key)) {
      e.preventDefault();
    }
  }

  const phoneProps =
    mask === "phone"
      ? {
          value: phoneValue,
          onChange: handlePhoneChange,
          onKeyDown: handlePhoneKeyDown,
          maxLength: 18 as number | undefined,
          inputMode:
            "tel" as React.HTMLAttributes<HTMLInputElement>["inputMode"],
        }
      : {};

  return (
    <div className={containerClassName}>
      {!isCheck && label && <label htmlFor={inputId}>{label}</label>}

      <div style={{ display: isCheck ? "inline-flex" : "block", gap: 8 }}>
        <input
          id={inputId}
          name={name}
          type={type}
          ref={setRefs}
          className={className}
          value={mask === "phone" ? phoneValue : value}
          onChange={mask === "phone" ? handlePhoneChange : onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...phoneProps}
          {...rest}
        />
        {isCheck && label && <label htmlFor={inputId}>{label}</label>}
      </div>

      {error && (
        <div id={describedBy} role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
