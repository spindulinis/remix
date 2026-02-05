import { forwardRef, ReactNode } from "react";

export interface InputLabelProps extends React.LabelHTMLAttributes<unknown> {
  children?: ReactNode;
}

const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  (props: InputLabelProps, ref) => {
    const {...rest} = props
    const className = "block text-sm/6 font-medium text-gray-900";
    return (
      <label className={className} {...rest} ref={ref}>
        {props.children}
      </label>
    );
  });
InputLabel.displayName = "InputLabel";
export default InputLabel;