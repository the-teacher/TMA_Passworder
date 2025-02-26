import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: string | React.ReactNode;
};

const FormError = ({ children, ...props }: Props) => (
  <div className="info info--danger mb20" {...props}>
    {children}
  </div>
);

export default FormError;
