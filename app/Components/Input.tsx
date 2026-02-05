import { forwardRef, ReactNode } from "react";

export interface InputProps extends React.InputHTMLAttributes<unknown> {
  name: string;
  type?: string;
  children?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {name, type = 'text', ...rest} = props
    const className = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-solid border border-gray-300";
    return (
      <input
        className={className}
        type={type}
        name={name}
        id={name}
        {...rest}
        ref={ref}/>
    );
  });
Input.displayName = "Input";
export default Input;