# Project Structure Overview

This document provides an overview of the project's structure, highlighting the organization and purpose of each directory and file.

## Main Directories

- **src/**: The main directory containing the source code of the application.

  - **App.tsx**: The main entry point of the application.
  - \***\*tests**/\*\*: Contains test files for various components and modules to ensure code quality and functionality.
  - **assets/**: Holds static assets such as images and icons.
  - **components/**: This is where the core components of the application reside. Each component is organized in its own directory, which typically includes:
    - **ComponentName.tsx**: The main component file.
    - \***\*stories**/\*\*: Storybook files for component visualization and testing.
    - \***\*tests**/\*\*: Unit tests for the component.
    - **index.ts**: An entry point for exporting the component.
    - **styles.scss**: Styles specific to the component.
  - **globalStyles.scss**: Contains global styles applied across the application.
  - **i18n/**: Manages internationalization, including JSON files for different languages and related tests.
  - **lib/**: Contains libraries and utilities used throughout the application, such as `EventEmitter` and `Toastr`.
  - **mocks/**: Includes mock data for testing purposes.
  - **pages/**: Contains the different pages of the application, each with its own components, tests, and stories.
  - **routes/**: Defines the application's routing logic and includes tests for route handling.
  - **ui-kit/**: A collection of reusable UI components and styles, such as buttons and form inputs.

- **vite-env.d.ts**: TypeScript environment configuration for Vite, the build tool used in this project.

## Component Structure

Each component in the `components/` directory is organized to promote modularity and reusability. Here's a typical structure for a component:

- **ComponentName/**
  - **ComponentName.tsx**: The main file where the component logic and JSX are defined.
  - \***\*stories**/\*\*: Contains Storybook files (`ComponentName.stories.tsx`) that allow developers to visualize and interact with the component in isolation.
  - \***\*tests**/\*\*: Includes test files (`ComponentName.test.tsx`) to ensure the component behaves as expected.
  - **index.ts**: Serves as the entry point for the component, making it easier to import elsewhere in the project.
  - **styles.scss**: Contains styles specific to the component, ensuring that styling is encapsulated and does not affect other parts of the application.

This structure ensures that each component is self-contained, making it easier to maintain, test, and reuse across the application.

## Conclusion

The project is organized to facilitate scalability, maintainability, and ease of development. By following a component-based architecture, the project ensures that each part of the application is modular and can be developed independently.
