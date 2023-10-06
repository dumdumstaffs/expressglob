import { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  name: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, error, ...props }, ref) => {
    return (
      <div className={`fxg-field tw-input ${error ? "error" : ""}`}>
        <input
          ref={ref}
          type="text"
          className="fxg-field__input-text fxg-field__input--required fxg-input__autocomplete"
          required
          aria-label={label}
          aria-required="true"
          name={name}
          {...props}
        />
        <span className="fxg-field__placeholder fxg-field__floating-placeholder">
          {error || label}
        </span>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
