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

function AppIcon({ size, type, alt, ...props }: AppIconProps) {
  const iconPath = `/icons/${type}.svg`;

  return <img src={iconPath} width={size} height={size} alt={alt} {...props} />;
}

export default AppIcon;
