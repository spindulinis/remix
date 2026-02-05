import { forwardRef, ReactNode } from "react";
import { cn } from "~/utils/cn";

export type ButtonVariant = "primary" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  children?: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-500",
  danger: "bg-red-600 hover:bg-red-500",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { type = 'submit', disabled, variant = 'primary', ...rest } = props

    const className = cn(
      "inline-flex sm:ml-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500",
      variantClasses[variant],
      {
        "bg-gray-600 opacity-80 cursor-not-allowed": disabled,
      }
    );
    return (
      <button
        className={className}
        type={type}
        {...rest}
        ref={ref}>
        {props.children}
      </button>
    );
  });
Button.displayName = "Button";
export default Button;