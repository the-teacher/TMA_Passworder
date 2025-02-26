type Props = {
  children: string | React.ReactNode;
};

const FormError = ({ children }: Props) => (
  <div className="info info--danger mb20">{children}</div>
);

export default FormError;
