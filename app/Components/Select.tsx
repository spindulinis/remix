import { forwardRef, ReactNode } from "react";

export interface SelectProps extends React.SelectHTMLAttributes<unknown> {
  name: string;
  children?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props: SelectProps, ref) => {
    const {name, ...rest} = props
    const className = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-solid border border-gray-300";
    return (
      <select
        className={className}
        name={name}
        id={name}
        {...rest}
        ref={ref}
      >
        {props.children}
      </select>
    );
  });
Select.displayName = "Select";
export default Select;