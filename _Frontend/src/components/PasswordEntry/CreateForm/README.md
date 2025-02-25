# Password Entry Create Form

## Overview

The Password Entry Create Form is a React component that allows users to create new password entries in the password management system. It provides a user-friendly interface for entering service details, username, password, URL, and notes. The form includes features like password visibility toggle, password generation, and clipboard copy functionality.

## Component Structure

```
CreateForm/
├── __locales__/               # Translations for form texts
│   ├── en.json               # English translations
│   └── ru.json               # Russian translations
├── __stories__/              # Storybook documentation
│   └── CreatePasswordEntryForm.stories.tsx
├── __tests__/                # Component tests
│   ├── CreatePasswordEntryForm.test.tsx
│   ├── CreatePasswordEntryFormView.test.tsx
│   └── validationSchema.test.ts
├── api/                      # API integration
│   ├── __tests__/
│   │   └── submitPasswordEntry.test.ts
│   └── submitPasswordEntry.ts
├── components/               # Reusable UI components
│   ├── CopyButton/          # Password copy functionality
│   ├── EyeIcon/             # Password visibility toggle
│   ├── FormError/           # Error message display
│   └── GenerateButton/      # Password generation
├── hooks/                    # Custom React hooks
│   └── useSubmitForm.ts     # Form submission logic
├── utils/                    # Helper functions
│   ├── copyToClipboard.ts   # Clipboard operations
│   ├── generatePassword.ts  # Password generation logic
│   └── getFieldStatus.ts    # Field validation status
└── styles.scss              # Component styles
```

## External Dependencies

### Form Management and Validation

- `react-hook-form`: Form state management and validation
- `@hookform/resolvers/zod`: Integration with Zod schema validation
- `zod`: Schema validation library

### Internationalization

- `react-i18next`: Translation and localization support

### Testing

- `@testing-library/react`: Component testing utilities
- `@testing-library/user-event`: User interaction simulation
- `jest`: Testing framework

## Project Dependencies

### UI Components

- `@ui-kit/form-inputs`: Form input components
- `@ui-kit/buttons`: Button components
- `@ui-kit/form-groups`: Form layout components
- `@ui-kit/text-styles`: Typography styles
- `@ui-kit/info-blocks`: Information display components
- `@ui-kit/common`: Common UI utilities
- `@ui-kit/spaces`: Spacing utilities

### Utilities

- `@lib/EventEmitter`: Application-wide event handling
- `@components/AppIcon`: Icon component system
- `@test/testUtils`: Testing utilities and helpers

## Usage Example

```tsx
import CreatePasswordEntryForm from "@components/PasswordEntry/CreateForm";

const PasswordManagementPage = () => {
  return (
    <div className="page">
      <h1>Create New Password Entry</h1>
      <CreatePasswordEntryForm />
    </div>
  );
};
```

The form handles:

- Service name entry
- Username input
- Password management (generation, visibility, copying)
- Service URL input
- Additional notes
- Form validation
- Submission handling
- Error display
- Internationalization
