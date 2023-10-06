import { ReactNode, ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type Props = {
  loading?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const Button = ({ children, loading, ...props }: Props) => (
  <button
    className={`fxg-button fxg-button--orange tw-button ${
      loading ? "px-10 h-[60px] flex items-center" : ""
    }`}
    disabled={loading}
    {...props}
  >
    {loading ? <Spinner /> : children}
  </button>
);

export default Button;
