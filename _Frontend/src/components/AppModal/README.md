# AppModal Component

A flexible and reusable modal component for React applications with built-in accessibility features, responsive design, and customization options.

## Features

- 🚀 Simple API with hooks-based implementation
- 🎨 Multiple size options (small, medium, large)
- 📱 Fully responsive design
- ♿ Accessibility support
- 🔒 Body scroll locking when modal is open
- ⌨️ Keyboard support (ESC to close)
- 🔄 Custom container support
- 🌐 Internationalization support

## Installation

    import { useAppModal } from "@components/AppModal";

## Basic Usage

```tsx
const MyComponent = () => {
  const { open, modal } = useAppModal({
    title: "My Modal",
    children: (
      <div>
        <p>This is a basic modal with some content.</p>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Modal
      </button>
      {modal}
    </div>
  );
};
```

## Common Patterns

### Alert Modal

```tsx
const useAlert = (message: string) => {
  return useAppModal({
    title: "Alert",
    size: "small",
    children: ({ close }) => (
      <div className="text--center">
        <p>{message}</p>
        <button className="btn btn--primary mt16" onClick={close}>
          OK
        </button>
      </div>
    )
  });
};

// Usage
const MyComponent = () => {
  const alert = useAlert("Operation completed successfully!");

  return (
    <button className="btn btn--primary" onClick={alert.open}>
      Show Alert
    </button>
  );
};
```

### Confirmation Modal

```tsx
const useConfirm = (message: string, onConfirm: () => void) => {
  return useAppModal({
    title: "Confirm Action",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>{message}</p>
        <div className="form-group--actions mt16">
          <button className="btn btn--secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  });
};

// Usage
const MyComponent = () => {
  const confirm = useConfirm("Are you sure you want to delete this item?", () =>
    console.log("Item deleted!")
  );

  return (
    <button className="btn btn--danger" onClick={confirm.open}>
      Delete Item
    </button>
  );
};
```

### Form Modal

```tsx
const FormModal = () => {
  const { open, close, modal } = useAppModal({
    title: "Edit Profile",
    size: "medium",
    children: ({ close }) => (
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault();
          // Process form...
          close();
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" className="form-input" type="text" />
        </div>

        <div className="form-group--actions mt16">
          <button type="button" className="btn btn--secondary" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save Changes
          </button>
        </div>
      </form>
    )
  });

  return (
    <button className="btn btn--primary" onClick={open}>
      Edit Profile
    </button>
  );
};
```

## Size Options

The modal supports three predefined sizes:

- `small` (400px max-width) - for alerts, confirmations
- `medium` (600px max-width) - default size, for forms
- `large` (800px max-width) - for complex content

Example:

```tsx
const { open, modal } = useAppModal({
  title: "Large Modal",
  size: "large", // "small" | "medium" | "large"
  children: <div>Content...</div>
});
```

## Custom Container

You can specify where the modal should be rendered:

```tsx
// Using custom container ID
const modal = useAppModal({
  title: "Modal",
  containerId: "custom-modal-root",
  children: <div>Content</div>
});

// Using container element reference
const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const modal = useAppModal({
    title: "Modal",
    containerElement: containerRef.current ?? undefined,
    children: <div>Content</div>
  });

  return (
    <div>
      <div ref={containerRef} className="custom-container" />
      <button onClick={modal.open}>Open</button>
      {modal.modal}
    </div>
  );
};
```

## Internationalization

The modal supports i18n through react-i18next:

English locale:

```json
{
  "AppModal": {
    "actions": {
      "close": "Close modal"
    }
  }
}
```

Russian locale:

```json
{
  "AppModal": {
    "actions": {
      "close": "Закрыть окно"
    }
  }
}
```

## API Reference

### useAppModal Options

| Property           | Type                                                         | Default            | Description                |
| ------------------ | ------------------------------------------------------------ | ------------------ | -------------------------- |
| `title`            | `string`                                                     | `undefined`        | Modal title                |
| `children`         | `ReactNode \| ((props: { close: () => void }) => ReactNode)` | -                  | Modal content              |
| `size`             | `"small" \| "medium" \| "large"`                             | `"medium"`         | Modal size                 |
| `containerId`      | `string`                                                     | `"app-modal-root"` | Container element ID       |
| `containerElement` | `HTMLElement`                                                | `undefined`        | Direct container reference |

### Return Value

| Property | Type         | Description               |
| -------- | ------------ | ------------------------- |
| `open`   | `() => void` | Opens the modal           |
| `close`  | `() => void` | Closes the modal          |
| `modal`  | `ReactNode`  | Modal component to render |

## Accessibility

- Uses semantic HTML with `role="dialog"`
- Manages focus trap within modal
- Supports keyboard navigation (ESC to close)
- Provides ARIA attributes
- Locks body scroll when open
