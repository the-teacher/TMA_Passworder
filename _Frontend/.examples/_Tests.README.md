# Testing Guide

This document describes the testing approach used in the project.

## Testing Stack

The project uses the following testing libraries:

- **Jest**: Test runner and assertion library
- **@testing-library/react**: For testing React components
- **@testing-library/user-event**: For simulating user interactions
- **jest-dom**: For additional DOM assertions

## Test Structure

Tests follow a consistent structure using Jest's describe/it pattern:

```typescript
describe("ComponentName", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByText("some text")).toBeInTheDocument();
  });
});
```

## Common Testing Patterns

### 1. Component Rendering Tests

Basic component rendering tests verify that components render correctly:

```typescript
it("renders component content", () => {
  render(<MyComponent />);
  expect(screen.getByText("Expected Text")).toBeInTheDocument();
});
```

### 2. Router Testing

For components that use routing, tests are wrapped in router providers:

```typescript
const renderWithRouter = () => {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
};
```

### 3. Mocking

The project extensively uses Jest mocking capabilities:

```typescript
// Mocking components
jest.mock("@components/SomeComponent", () => ({
  __esModule: true,
  default: () => <div>Mocked Component</div>
}));

// Mocking browser APIs
jest.spyOn(console, "warn").mockImplementation();
```

### 4. User Interactions

Testing user interactions using fireEvent:

```typescript
it("handles user interaction", () => {
  render(<Component />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByText("Changed State")).toBeInTheDocument();
});
```

### 5. Testing Props and Callbacks

```typescript
it("calls onSubmit with correct data", () => {
  const mockOnSubmit = jest.fn();
  render(<Form onSubmit={mockOnSubmit} />);

  // Trigger form submission
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(mockOnSubmit).toHaveBeenCalledWith(expectedData);
});
```

### 6. Async Testing

For asynchronous operations:

```typescript
it("loads data asynchronously", async () => {
  render(<AsyncComponent />);
  expect(await screen.findByText("Loaded Data")).toBeInTheDocument();
});
```

## Test File Organization

Tests are organized following the component structure:

```
ComponentName/
  ├── __tests__/
  │   └── ComponentName.test.tsx
  ├── ComponentName.tsx
  └── index.ts
```

## Best Practices

1. Test component behavior, not implementation
2. Use semantic queries (getByRole, getByLabelText) over getByTestId
3. Mock external dependencies and APIs
4. Test error states and edge cases
5. Keep tests focused and isolated

## Common Assertions

```typescript
// DOM presence
expect(element).toBeInTheDocument();

// Text content
expect(element).toHaveTextContent("expected text");

// Classes
expect(element).toHaveClass("expected-class");

// Attributes
expect(element).toHaveAttribute("href", "/expected-path");

// State
expect(element).toBeDisabled();
expect(element).toBeVisible();
```

## Testing Utilities

The project includes common test utilities and wrappers:

```typescript
// TestWrapper for common providers
const renderWithWrapper = (ui: React.ReactElement) => {
  render(ui, { wrapper: TestWrapper });
};
```

This testing approach ensures consistent, maintainable, and reliable tests across the project.
