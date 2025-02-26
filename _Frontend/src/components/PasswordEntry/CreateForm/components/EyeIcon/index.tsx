import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  showPassword: boolean;
  onClick: () => void;
};

const EyeIcon = ({ showPassword, onClick, ...props }: Props) => (
  <button
    type="button"
    className="btn btn--icon"
    onClick={onClick}
    title={showPassword ? "Hide password" : "Show password"}
    {...props}
  >
    <img
      src={`/icons/eye${showPassword ? "" : "-off"}.svg`}
      alt={showPassword ? "Hide password" : "Show password"}
      width={16}
      height={16}
    />
  </button>
);

export default EyeIcon;
