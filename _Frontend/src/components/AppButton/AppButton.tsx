import React from "react";
import AppIcon, { IconType, IconSize } from "@components/AppIcon";
import "@ui-kit/buttons.scss";

/**
 * AppButton Component
 *
 * Usage examples:
 *
 * Basic usage:
 * ```tsx
 * <AppButton
 *   icon="home"
 *   title="Home"
 *   alt="Home button"
 *   onClick={handleClick}
 * />
 * ```
 *
 * With custom variant and size:
 * ```tsx
 * <AppButton
 *   icon="search"
 *   variant="primary"
 *   size="large"
 *   title="Search"
 *   alt="Search button"
 * />
 * ```
 *
 * With custom icon parameters:
 * ```tsx
 * <AppButton
 *   icon="eye"
 *   iconParams={{
 *     iconSize: 24,
 *     className: "custom-icon-class"
 *   }}
 *   title="View details"
 * />
 * ```
 *
 * Disabled button:
 * ```tsx
 * <AppButton
 *   icon="refresh"
 *   disabled
 *   title="Loading..."
 *   alt="Loading"
 * />
 * ```
 */

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "icon";

export type ButtonSize = "small" | "medium" | "large" | "jumbo";

export type IconParams = {
  iconType?: IconType;
  iconSize?: IconSize;
  alt?: string;
  className?: string;
  [key: `data-${string}`]: string; // Allow any data-* attributes
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "src" | "width" | "height"
>;

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon: IconType;
  iconParams?: IconParams;
  className?: string;
  title?: string;
  alt?: string;
};

const AppButton = ({
  variant = "default",
  size = "medium",
  icon = "star",
  iconParams = {},
  className = "",
  title,
  alt,
  ...props
}: AppButtonProps) => {
  const {
    iconType = icon,
    iconSize = 16,
    alt: iconAlt,
    ...restIconProps
  } = iconParams;

  // Build class names
  const buttonClasses = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  // Use title from props or generate from alt if not provided
  const buttonTitle = title || props["aria-label"] || alt;

  return (
    <button
      className={buttonClasses}
      type="button"
      title={buttonTitle}
      {...props}
    >
      <AppIcon
        type={iconType}
        size={iconSize}
        alt={iconAlt || alt || props["aria-label"] || "button icon"}
        {...restIconProps}
      />
    </button>
  );
};

export default AppButton;
