import { forwardRef, TextareaHTMLAttributes } from "react";

type Props = {
  name: string;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, label, error, ...props }, ref) => {
    return (
      <div className={`fxg-field tw-input ${error ? "error" : ""}`}>
        <textarea
          ref={ref}
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

Textarea.displayName = "Textarea";

export default Textarea;
