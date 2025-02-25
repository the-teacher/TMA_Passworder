# UI Kit Documentation

This UI Kit provides a set of reusable components and styles for consistent application design. Below is a guide to using the various components available in the kit.

## Table of Contents

- [Colors](#colors)
- [Buttons](#buttons)
- [Form Inputs](#form-inputs)
- [Form Groups](#form-groups)
- [Info Blocks](#info-blocks)
- [Text Styles](#text-styles)
- [Spacing Utilities](#spacing-utilities)
- [BEM Naming Convention](#bem-naming-convention)
- [Importing Styles](#importing-styles)

## Colors

The UI Kit uses a consistent color palette defined in `colors.scss`:

```scss
$color-primary: #007bff;
$color-secondary: #868e96;
$color-success: #4caf50;
$color-warning: #ffc107;
$color-danger: #c82333;
$color-info: #138496;
$color-light: #f8f9fa;
$color-dark: #343a40;
```

## Buttons

Buttons are styled using the `.btn` class with modifiers for different types and sizes.

### Basic Usage

```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
<button class="btn btn--success">Success Button</button>
<button class="btn btn--warning">Warning Button</button>
<button class="btn btn--danger">Danger Button</button>
<button class="btn btn--info">Info Button</button>
```

### Button Sizes

```html
<button class="btn btn--small">Small Button</button>
<button class="btn btn--medium">Medium Button</button>
<button class="btn btn--large">Large Button</button>
```

### Button with Icons

```html
<button class="btn btn--icon">
  <img src="/icons/eye.svg" alt="Icon" />
</button>

<button class="btn btn--icon-text">
  <img src="/icons/clipboard-check.svg" alt="Icon" />
  <span>Text</span>
</button>
```

### Disabled Button

```html
<button class="btn" disabled>Disabled Button</button>
```

## Form Inputs

Form inputs include text inputs, selects, and textareas.

### Basic Usage

```html
<!-- Text Input -->
<input class="form-input" placeholder="Default Input" />

<!-- Select Input -->
<select class="form-select">
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
</select>

<!-- Textarea -->
<textarea class="form-textarea" placeholder="Enter text here..."></textarea>
```

### Input States

```html
<!-- Error State -->
<input class="form-input form-input--error" placeholder="Error Input" />

<!-- Success State -->
<input class="form-input form-input--success" placeholder="Success Input" />

<!-- Disabled State -->
<input class="form-input" placeholder="Disabled Input" disabled />
```

### Search Input

```html
<input class="form-input form-input__search" placeholder="Search..." />
```

## Form Groups

Form groups provide structure for form elements with labels and help text.

### Basic Usage

```html
<div class="form-group">
  <label class="form-group--label text--dark" for="username">Username</label>
  <div class="form-group--input">
    <input
      class="form-input"
      id="username"
      type="text"
      placeholder="Enter your username"
    />
  </div>
  <div class="form-group--info text--info text--small">
    Please enter a unique username.
  </div>
</div>
```

### With Icon

```html
<div class="form-group">
  <label class="form-group--label text--dark" for="email">Email</label>
  <div class="form-group--input form-group__with-icon">
    <input
      class="form-input"
      id="email"
      type="email"
      placeholder="Enter your email"
    />
    <div class="form-group--icon">
      <img src="/icons/search.svg" alt="search" />
    </div>
  </div>
</div>
```

## Info Blocks

Info blocks are used to display messages, alerts, and notifications.

### Basic Usage

```html
<div class="info">Plain Info Block</div>
<div class="info info--primary">Primary Info Block</div>
<div class="info info--secondary">Secondary Info Block</div>
<div class="info info--success">Success Info Block</div>
<div class="info info--warning">Warning Info Block</div>
<div class="info info--danger">Danger Info Block</div>
```

### Closable Info Blocks

```html
<div class="info info--primary info--closable">
  Primary Info Block
  <button class="info__close" aria-label="Close">&times;</button>
</div>
```

## Text Styles

Text styles provide consistent typography with different colors and sizes.

### Text Colors

```html
<p class="text text--primary">Primary Text</p>
<p class="text text--secondary">Secondary Text</p>
<p class="text text--success">Success Text</p>
<p class="text text--warning">Warning Text</p>
<p class="text text--danger">Danger Text</p>
<p class="text text--info">Info Text</p>
<p class="text text--light">Light Text</p>
<p class="text text--dark">Dark Text</p>
```

### Text Sizes

```html
<p class="text text--small">Small Text</p>
<p class="text text--medium">Medium Text</p>
<p class="text text--large">Large Text</p>
```

### Combined Styles

```html
<p class="text text--primary text--small">Small Primary Text</p>
<p class="text text--danger text--large">Large Danger Text</p>
```

## Spacing Utilities

Spacing utilities provide consistent margins and padding.

### Margin Utilities

```html
<div class="m16">16px margin on all sides</div>
<div class="mt8">8px margin top</div>
<div class="mb16">16px margin bottom</div>
<div class="ml24">24px margin left</div>
<div class="mr32">32px margin right</div>
```

### Padding Utilities

```html
<div class="p16">16px padding on all sides</div>
<div class="pt8">8px padding top</div>
<div class="pb16">16px padding bottom</div>
<div class="pl24">24px padding left</div>
<div class="pr32">32px padding right</div>
```

Available spacing values: 0, 8, 16, 20, 24, 32 (in pixels).

## BEM Naming Convention

This UI Kit follows the BEM (Block, Element, Modifier) naming convention for CSS classes, with some custom adaptations:

- **Block**: The main component (e.g., `btn`, `form-group`, `info`)
- **Element**: A part of the block, denoted with `--` (e.g., `form-group--label`, `info--closable`)
- **Modifier**: A variant of a block or element, denoted with `__` (e.g., `btn__primary`, `text__large`)

### Examples

```
Block:           .btn
Element:         .form-group--label
Modifier:        .btn__primary
Element+Modifier: .form-input__error
```

### Warning: Naming Inconsistencies

**Note**: The current implementation of the UI Kit contains naming inconsistencies that don't follow the standard BEM convention described above. Many classes use `--` for modifiers instead of `__`.

#### Inconsistent Classes

The following classes use inconsistent naming patterns:

- Modifiers using `--` instead of `__`:

  - `btn--primary`, `btn--secondary`, `btn--success`, etc.
  - `text--primary`, `text--secondary`, `text--small`, etc.
  - `info--primary`, `info--secondary`, `info--closable`, etc.
  - `form-input--error`, `form-input--success`

- Elements using `__` instead of `--`:

  - `info__close` (should be `info--close`)

- Special contextual variants:
  - `form-group__with-icon` (uses `__` for a contextual variant)

When using the UI Kit, be aware of these inconsistencies and follow the actual implementation patterns rather than the standard BEM convention.

## Importing Styles

### In SCSS Files

To import UI Kit styles in your SCSS files:

```scss
// Import specific components
@use "@ui-kit/buttons.scss";
@use "@ui-kit/form-inputs.scss";
@use "@ui-kit/text-styles.scss";

// Import variables only
@use "@ui-kit/colors.scss" as *;

// In your component styles
.my-component {
  background-color: $color-primary;
  padding: 16px;

  &__title {
    color: $color-dark;
  }
}
```

### In React Components

To import UI Kit styles in your React components:

```tsx
// Import in your component file
import "@ui-kit/buttons.scss";
import "@ui-kit/form-inputs.scss";
import "./your-component.scss"; // Your component-specific styles

const YourComponent = () => {
  return (
    <div className="your-component">
      <h2 className="your-component--title text--large">Title</h2>
      <button className="btn btn--primary">Click Me</button>
    </div>
  );
};
```

### In Storybook Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/buttons.scss";
import "@ui-kit/text-styles.scss";
import YourComponent from "./YourComponent";

const meta: Meta<typeof YourComponent> = {
  title: "Components/YourComponent",
  component: YourComponent
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {};
```
