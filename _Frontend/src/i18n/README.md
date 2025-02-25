# Internationalization (i18n) System

This document provides an overview of the internationalization system used in the HamsterPass application.

## How the Localization System Works

The application uses `i18next` and `react-i18next` for internationalization. The system follows these principles:

1. **Component-based localization**: Each component can have its own localization files in a `__locales__` directory
2. **Namespace-based organization**: Translations are organized into namespaces (e.g., `footerNavigation`, `common`)
3. **Schema generation**: A build-time process combines all locale files into schema files
4. **Multiple languages**: Currently supports English (en) and Russian (ru)

## Directory Structure

The `i18n` directory contains:

```
i18n/
├── __locales__/           # Global translations
│   ├── en.json            # English translations
│   └── ru.json            # Russian translations
├── __tests__/             # Tests for i18n functionality
├── generateLocaleSchema.js # Script to generate schema files
├── index.ts               # Main i18n configuration
├── locales.schema.en.json # Generated English schema
├── locales.schema.ru.json # Generated Russian schema
├── README.md              # This documentation
└── utils.js               # Utility functions for i18n
```

### Key Files

- **index.ts**: Configures i18next with the available languages and resources
- **generateLocaleSchema.js**: Script that scans the project for locale files and combines them
- **locales.schema.\*.json**: Generated files containing all translations for a language

## Locale Schema Generation

The locale schema generation process is automated and integrated into various npm scripts in the project:

```json
{
  "scripts": {
    "locales:generate": "node src/i18n/generateLocaleSchema.js ./src ./src/i18n/",
    "translate": "yarn locales:generate",
    "start": "yarn locales:generate && vite dev --host 0.0.0.0 --port 4000",
    "build": "yarn build:clean && yarn locales:generate && yarn tsc -b && vite build",
    "preview": "yarn locales:generate && vite preview",
    "test": "yarn locales:generate && NODE_NO_WARNINGS=1 jest --config jest.config.ts",
    "storybook": "yarn locales:generate && storybook dev -p 4000 --no-open"
  }
}
```

The schema generation happens:

- When running `yarn translate` or `yarn locales:generate` directly
- Before starting the development server (`yarn start`)
- Before building the application (`yarn build`)
- Before running tests (`yarn test`)
- Before starting Storybook (`yarn storybook`)

This ensures that the latest translations are always available to the application.

## How to Localize a Component

### Step 1: Create Locale Files for Your Component

Create a `__locales__` directory in your component's folder with language-specific JSON files:

```
YourComponent/
├── __locales__/
│   ├── en.json
│   └── ru.json
├── YourComponent.tsx
└── ...
```

### Step 2: Define Translations

Define translations in your locale files using namespaces. Here's an example:

**`YourComponent/__locales__/en.json`**:

```json
{
  "yourComponentNamespace": {
    "title": "Your Component Title",
    "description": "This is a description",
    "actions": {
      "submit": "Submit",
      "cancel": "Cancel"
    }
  }
}
```

**`YourComponent/__locales__/ru.json`**:

```json
{
  "yourComponentNamespace": {
    "title": "Заголовок компонента",
    "description": "Это описание",
    "actions": {
      "submit": "Отправить",
      "cancel": "Отмена"
    }
  }
}
```

### Step 3: Use Translations in Your Component

Use the `useTranslation` hook to access translations:

```tsx
import { useTranslation } from "react-i18next";

const YourComponent = () => {
  // Use your component's namespace
  const { t } = useTranslation("yourComponentNamespace");

  // For common translations
  const { t: c } = useTranslation("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>

      <div>
        <button>{t("actions.submit")}</button>
        <button>{c("cancel")}</button> {/* Using common namespace */}
      </div>
    </div>
  );
};
```

### Example with Two Namespaces

Here's a complete example showing how to use both component-specific and common translations:

**Component Structure**:

```
MyForm/
├── __locales__/
│   ├── en.json
│   └── ru.json
├── MyForm.tsx
└── ...
```

**`MyForm/__locales__/en.json`**:

```json
{
  "myForm": {
    "title": "My Form",
    "fields": {
      "name": "Name",
      "email": "Email"
    },
    "validation": {
      "nameRequired": "Name is required",
      "emailInvalid": "Email is invalid"
    }
  }
}
```

**`MyForm/MyForm.tsx`**:

```tsx
import { useTranslation } from "react-i18next";

const MyForm = () => {
  // Component-specific translations
  const { t } = useTranslation("myForm");

  // Common translations
  const { t: c } = useTranslation("common");

  return (
    <form>
      <h2>{t("title")}</h2>

      <div>
        <label>{t("fields.name")}</label>
        <input type="text" />
      </div>

      <div>
        <label>{t("fields.email")}</label>
        <input type="email" />
      </div>

      <div>
        <button type="submit">{c("save")}</button>
        <button type="button">{c("reset")}</button>
      </div>
    </form>
  );
};
```

### Step 4: Generate Schema Files

After adding new locale files, run the schema generation script to update the combined schema files:

```bash
node src/i18n/generateLocaleSchema.js ./src ./src/i18n
```

This will scan all `__locales__` directories and combine their contents into the schema files.

## Storybook Integration

Storybook is configured to use the same i18n system as the main application. The configuration is in `.storybook/i18next.ts`:

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enSchema from "@i18n/locales.schema.en.json";
import ruSchema from "@i18n/locales.schema.ru.json";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

const resources = {
  en: enSchema,
  ru: ruSchema
};

// Get all namespaces from the default language
const Namespaces = Object.keys(resources[DEFAULT_LANGUAGE] || {});

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources,
  defaultNS: "translations",
  fallbackNS: Namespaces, // Use all namespaces as fallbacks
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
```

The Storybook preview is wrapped with the `I18nextProvider` in `.storybook/preview.tsx`:

```typescript
import { I18nextProvider } from "react-i18next";
import i18n from "./i18next";

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    )
  ],
  // ...other configuration
};
```

### Switching Languages in Storybook

To switch languages in a story, you can use the `play` function:

```typescript
export const Russian: Story = {
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
```

## Testing with i18n

For testing, a similar i18n configuration is set up in `test/setupFilesAfterEnv.ts`:

```typescript
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enBase from "@i18n/locales.schema.en.json";
import ruBase from "@i18n/locales.schema.ru.json";

const DEFAULT_LANGUAGE = "en";

const resources = {
  en: enBase,
  ru: ruBase
};

const Namespaces = Object.keys(resources[DEFAULT_LANGUAGE] || {});

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources,
  defaultNS: "translations",
  fallbackNS: Namespaces,
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
```

A `TestWrapper` component is provided in `test/testUtils.tsx` to wrap components with the i18n provider:

```typescript
import { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "./setupFilesAfterEnv";

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{children}</BrowserRouter>
    </I18nextProvider>
  );
};
```

### Using the TestWrapper in Tests

Use the `TestWrapper` to wrap components in tests:

```typescript
import { render } from "@testing-library/react";
import { TestWrapper } from "@test/testUtils";
import YourComponent from "./YourComponent";

describe("YourComponent", () => {
  it("renders with translations", () => {
    render(<YourComponent />, { wrapper: TestWrapper });
    // Your test assertions...
  });
});
```

### Mocking Translations in Tests

For more isolated tests, you can mock the `useTranslation` hook:

```typescript
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations = {
        title: "Mocked Title",
        description: "Mocked Description"
      };
      return translations[key] || key;
    }
  })
}));
```

## Best Practices

1. **Use namespaces**: Always use namespaces to avoid key conflicts between components
2. **Keep translations close to components**: Store component-specific translations in the component's directory
3. **Use common namespace for shared strings**: Put reusable strings in the common namespace
4. **Consistent naming**: Use consistent key naming conventions (camelCase is recommended)
5. **Nested structure**: Organize translations in a logical nested structure
6. **Test translations**: Include tests to verify that translations are correctly applied

## Adding a New Language

To add a new language:

1. Create new locale files with the language code (e.g., `de.json`) in each `__locales__` directory
2. Add the language to the resources in `i18n/index.ts`
3. Add the language code to the `languages` array in `i18n/index.ts`
4. Run the schema generation script to create the new schema file
