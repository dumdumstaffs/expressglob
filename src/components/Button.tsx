import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";

type Props = {
  loading?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const Button = ({ children, loading, ...props }: Props) => (
  <button
    className={`fxg-button fxg-button--orange tw-button ${
      loading ? "!p-0 h-[60px] flex items-center" : ""
    }`}
    disabled={loading}
    {...props}
  >
    {loading ? <Spinner /> : children}
  </button>
);

export default Button;
