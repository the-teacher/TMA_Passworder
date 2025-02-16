type IconSize = 12 | 16 | 20 | 24 | 28 | 32;
type IconType =
  | "circle-plus"
  | "clipboard-check"
  | "eye-off"
  | "eye"
  | "home"
  | "refresh"
  | "search"
  | "settings"
  | "square-x"
  | "star";

type AppIconProps = {
  size: IconSize;
  type: IconType;
  className?: string;
};

function AppIcon({ size, type, className = "" }: AppIconProps) {
  const iconPath = `/icons/${type}.svg`;

  return (
    <img
      src={iconPath}
      alt={type}
      width={size}
      height={size}
      className={`app-icon ${className}`}
    />
  );
}

export default AppIcon;
