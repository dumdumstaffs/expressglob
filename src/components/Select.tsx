import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";

type Props = {
  name: string;
  label: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ name, label, error, children, ...props }, ref) => {
    return (
      <div className={`fxg-field tw-input ${error ? "error" : ""}`}>
        <select
          ref={ref}
          className="fxg-field__input-text fxg-field__input--required fxg-input__autocomplete outline-none appearance-none"
          required
          aria-label={label}
          aria-required="true"
          name={name}
          {...props}
        >
          {children}
        </select>
        <span className="fxg-field__placeholder fxg-field__floating-placeholder">
          {error || label}
        </span>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
