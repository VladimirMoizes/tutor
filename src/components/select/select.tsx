import {
  forwardRef,
  useId,
  useRef,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";

export type OptionValue = string | number;
export type SelectOption =
  | OptionValue
  | { value: OptionValue; label: ReactNode; disabled?: boolean };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: ReactNode;
  placeholderOption?: ReactNode;
  options: SelectOption[];
  error?: ReactNode;
  containerClassName?: string;
};

function normalize(opt: SelectOption) {
  if (typeof opt === "string" || typeof opt === "number") {
    return { value: opt, label: String(opt), disabled: false };
  }
  const { value, label, disabled } = opt;
  return { value, label, disabled: !!disabled };
}

// helper: вызываем все переданные пользователем обработчики + наш
const callAll =
  <T extends (...a: any[]) => any>(...fns: Array<T | undefined>) =>
  (...args: Parameters<T>) =>
    fns.forEach((fn) => fn?.(...args));

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      id,
      name,
      label,
      placeholderOption,
      options,
      className,
      containerClassName,
      error,
      required,
      disabled,
      multiple,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    const uid = useId();
    const selectId = id ?? name ?? `select-${uid}`;
    const describedBy = error ? `${selectId}-error` : undefined;

    // контейнер, на него будем вешать data-open
    const containerRef = useRef<HTMLDivElement>(null);
    const setOpen = (open: boolean) => {
      const el = containerRef.current;
      if (!el) return;
      if (open) el.setAttribute("data-open", "true");
      else el.removeAttribute("data-open");
    };

    const effectiveDefaultValue =
      !multiple &&
      placeholderOption &&
      value === undefined &&
      defaultValue === undefined
        ? ""
        : defaultValue;

    return (
      <div className={containerClassName} ref={containerRef}>
        {label && (
          <label htmlFor={selectId} style={{ display: "block" }}>
            {label}
            {required ? " *" : null}
          </label>
        )}

        <select
          id={selectId}
          name={name}
          ref={ref}
          className={className}
          required={required}
          disabled={disabled}
          multiple={multiple}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          value={value}
          defaultValue={effectiveDefaultValue}
          // помечаем "открыто" на mousedown/keydown
          onMouseDown={callAll(rest.onMouseDown as any, () => setOpen(true))}
          onKeyDown={callAll(
            rest.onKeyDown as any,
            (e: React.KeyboardEvent<HTMLSelectElement>) => {
              const k = e.key;
              if (
                k === " " ||
                k === "Enter" ||
                k === "ArrowDown" ||
                k === "ArrowUp"
              ) {
                setOpen(true);
              }
            }
          )}
          // закрываем по выбору/расфокусу
          onChange={callAll(rest.onChange as any, () => setOpen(false))}
          onBlur={callAll(rest.onBlur as any, () => setOpen(false))}
          {...rest}
        >
          {placeholderOption != null && !multiple && (
            <option value="" disabled hidden>
              {placeholderOption}
            </option>
          )}

          {options.map((opt, i) => {
            const n = normalize(opt);
            return (
              <option
                key={`${String(n.value)}-${i}`}
                value={String(n.value)}
                disabled={n.disabled}
              >
                {n.label}
              </option>
            );
          })}
        </select>

        {error && (
          <div id={describedBy} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

// export type TOptions = string[];

// export type TSelectProps = {
//   options: TOptions;
//   name?: string;
//   title: string;
// };

// export const Select = ({ options, name, title }: TSelectProps) => {
//   return (
//     <div>
//       <label htmlFor={name}>
//         <select>
//           <option value="">{title}</option>
//           <optgroup>
//             {options.map((item) => {
//               return (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               );
//             })}
//           </optgroup>
//         </select>
//       </label>
//     </div>
//   );
// };
