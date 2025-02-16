import React from "react";

export type IconSize = 12 | 16 | 20 | 24 | 28 | 32;
export type IconType =
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
  alt: string;
} & React.HTMLAttributes<HTMLElement>;

const AppIcon: React.FC<AppIconProps> = ({ size, type, alt, ...props }) => {
  const iconPath = `/icons/${type}.svg`;

  return <img src={iconPath} alt={alt} width={size} height={size} {...props} />;
};

export default AppIcon;
