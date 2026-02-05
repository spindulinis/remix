import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";

export interface LinkProps extends React.AnchorHTMLAttributes<unknown> {
  type?: "link" | "button" | undefined;
  to: string;
  children?: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const {type = 'link', ...rest} = props
    const className = cn(
      type === 'button' && "inline-flex sm:ml-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500",
    );
    return (
      <NavLink
        className={className}
        {...rest}
        ref={ref}
      >{props.children}</NavLink>
    );
  });
Link.displayName = "Link";
export default Link;