import type { Meta, StoryObj } from "@storybook/react";
import { useAppModal } from "@components/AppModal/hooks/useAppModal";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/spaces.scss";
import React, { useState } from "react";
import i18n from "@story/i18next";

const meta: Meta = {
  title: "3-Components/6-AppModal",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// Basic Modal Example with English locale
const BasicExample = () => {
  const { open, modal } = useAppModal({
    title: "Basic Modal",
    children: (
      <div>
        <p>This is a basic modal with some content.</p>
        <p>Click outside, press ESC, or click the X to close.</p>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Basic Modal
      </button>
      {modal}
    </div>
  );
};

export const English: Story = {
  render: () => <BasicExample />,
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

// Basic Modal Example with Russian locale
const RussianExample = () => {
  const { open, modal } = useAppModal({
    title: "Базовое модальное окно",
    children: (
      <div>
        <p>Это базовое модальное окно с контентом.</p>
        <p>Нажмите снаружи, нажмите ESC или нажмите X, чтобы закрыть.</p>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Открыть модальное окно
      </button>
      {modal}
    </div>
  );
};

export const Russian: Story = {
  render: () => <RussianExample />,
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};

// Different Sizes Example
const SizesExample = () => {
  const smallModal = useAppModal({
    title: "Small Modal",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>This is a small modal with minimal content.</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const mediumModal = useAppModal({
    title: "Medium Modal",
    size: "medium",
    children: ({ close }) => (
      <div>
        <p>
          This is a medium modal (default size) with a moderate amount of
          content. It's suitable for most use cases.
        </p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const largeModal = useAppModal({
    title: "Large Modal",
    size: "large",
    children: ({ close }) => (
      <div>
        <p>This is a large modal suitable for complex content.</p>
        <p>
          It can accommodate more content and is useful for forms, tables, or
          other complex UI elements that need more space.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="btn btn--primary" onClick={smallModal.open}>
        Small Modal
      </button>
      <button className="btn btn--primary" onClick={mediumModal.open}>
        Medium Modal
      </button>
      <button className="btn btn--primary" onClick={largeModal.open}>
        Large Modal
      </button>
      {smallModal.modal}
      {mediumModal.modal}
      {largeModal.modal}
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />
};

// Form Component
const ModalForm = ({ onClose }: { onClose: () => void }) => (
  <form className="form-group">
    <div className="form-group">
      <label className="form-group--label" htmlFor="name">
        Name
      </label>
      <input
        className="form-input"
        id="name"
        type="text"
        placeholder="Enter your name"
      />
    </div>
    <div className="form-group">
      <label className="form-group--label" htmlFor="email">
        Email
      </label>
      <input
        className="form-input"
        id="email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
    <div className="form-group">
      <label className="form-group--label" htmlFor="message">
        Message
      </label>
      <textarea
        className="form-textarea"
        id="message"
        rows={4}
        placeholder="Enter your message"
      />
    </div>
    <div className="form-group--actions">
      <button type="button" className="btn btn--secondary" onClick={onClose}>
        Cancel
      </button>
      <button type="submit" className="btn btn--primary">
        Submit
      </button>
    </div>
  </form>
);

// Form Example
const FormExample = () => {
  const { open, modal } = useAppModal({
    title: "Form Example",
    size: "medium",
    children: ({ close }) => <ModalForm onClose={close} />
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Form Modal
      </button>
      {modal}
    </div>
  );
};

export const WithForm: Story = {
  render: () => <FormExample />
};

// Long Content Example
const LongContentExample = () => {
  const { open, modal } = useAppModal({
    title: "Scrollable Content",
    size: "medium",
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1} demonstrating scrollable content in the
            modal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Scrollable Modal
      </button>
      {modal}
    </div>
  );
};

export const ScrollableContent: Story = {
  render: () => <LongContentExample />
};

// Custom Container Example
const CustomContainerExample = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { open, modal } = useAppModal({
    title: "Custom Container Modal",
    size: "medium",
    containerElement: containerRef.current ?? undefined,
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in a custom container.</p>
        <p>Check the DOM to see that it's not in the default root.</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>The modal will be rendered inside this custom container:</p>
      </div>

      <div
        ref={containerRef}
        className="info info--secondary mb16"
        style={{ minHeight: "200px" }}
      >
        <p>Custom Modal Container</p>
      </div>

      <button className="btn btn--primary" onClick={open}>
        Open Modal in Custom Container
      </button>
      {modal}
    </div>
  );
};

export const CustomContainer: Story = {
  render: () => <CustomContainerExample />
};

// Custom ID Example
const CustomIdExample = () => {
  const { open: openFirst, modal: firstModal } = useAppModal({
    title: "First Modal",
    containerId: "first-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in container with ID: first-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const { open: openSecond, modal: secondModal } = useAppModal({
    title: "Second Modal",
    containerId: "second-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in container with ID: second-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>
          These modals will be rendered in different containers with custom IDs.
          Check the DOM to see the different root elements.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button className="btn btn--primary" onClick={openFirst}>
          Open First Modal
        </button>
        <button className="btn btn--primary" onClick={openSecond}>
          Open Second Modal
        </button>
      </div>
      {firstModal}
      {secondModal}
    </div>
  );
};

export const CustomIds: Story = {
  render: () => <CustomIdExample />
};

// Multiple Containers Example
const MultipleContainersExample = () => {
  // Default container
  const defaultModal = useAppModal({
    title: "Default Container Modal",
    children: ({ close }) => (
      <div>
        <p>This modal uses the default app-modal-root container</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  // Custom ID container
  const customIdModal = useAppModal({
    title: "Custom ID Modal",
    containerId: "custom-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal uses a container with ID: custom-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  // Custom element container
  const containerRef = React.useRef<HTMLDivElement>(null);
  const customElementModal = useAppModal({
    title: "Custom Element Modal",
    containerElement: containerRef.current ?? undefined,
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in the custom element container below</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>This example demonstrates all three container options:</p>
        <ul>
          <li>Default container (app-modal-root)</li>
          <li>Custom ID container (custom-modal-root)</li>
          <li>Custom element container (ref-based)</li>
        </ul>
      </div>

      <div
        ref={containerRef}
        className="info info--secondary mb16"
        style={{ minHeight: "100px" }}
      >
        <p>Custom Element Container</p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button className="btn btn--primary" onClick={defaultModal.open}>
          Default Container
        </button>
        <button className="btn btn--primary" onClick={customIdModal.open}>
          Custom ID Container
        </button>
        <button className="btn btn--primary" onClick={customElementModal.open}>
          Custom Element Container
        </button>
      </div>

      {defaultModal.modal}
      {customIdModal.modal}
      {customElementModal.modal}
    </div>
  );
};

export const MultipleContainers: Story = {
  render: () => <MultipleContainersExample />
};

// Alert Example
const AlertExample = () => {
  const { open, modal } = useAppModal({
    title: "Alert",
    size: "small",
    children: ({ close }) => (
      <div className="text-center">
        <p>This is an alert message!</p>
        <button className="btn btn--primary mt16" onClick={close}>
          OK
        </button>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Show Alert
      </button>
      {modal}
    </div>
  );
};

export const Alert: Story = {
  render: () => <AlertExample />
};

// Confirm Example
const ConfirmExample = () => {
  const { open, close, modal } = useAppModal({
    title: "Confirm Action",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>Are you sure you want to perform this action?</p>
        <div className="form-group--actions mt16">
          <button className="btn btn--secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              console.log("Action confirmed!");
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Show Confirm
      </button>
      {modal}
    </div>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmExample />
};

// Reusable Alert/Confirm Hooks Example
const useAlert = (message: string) => {
  return useAppModal({
    title: "Alert",
    size: "small",
    children: ({ close }) => (
      <div className="text-center">
        <p>{message}</p>
        <button className="btn btn--primary mt16" onClick={close}>
          OK
        </button>
      </div>
    )
  });
};

const useConfirm = (message: string, onConfirm: () => void) => {
  return useAppModal({
    title: "Confirm",
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

// Reusable Hooks Usage Example
const ReusableDialogsExample = () => {
  const alert = useAlert("This is a reusable alert message!");
  const confirm = useConfirm("Are you sure?", () => {
    console.log("Action confirmed!");
    // Show alert after confirmation
    alert.open();
  });

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="btn btn--primary" onClick={alert.open}>
        Show Alert
      </button>
      <button className="btn btn--primary" onClick={confirm.open}>
        Show Confirm
      </button>
      {alert.modal}
      {confirm.modal}
    </div>
  );
};

export const ReusableDialogs: Story = {
  render: () => <ReusableDialogsExample />
};

// Async Confirm Example
const AsyncConfirmModal = ({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const { open, modal } = useAppModal({
    title: "Confirm Action",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>Are you sure you want to proceed?</p>
        <div className="form-group--actions mt16">
          <button
            className="btn btn--secondary"
            onClick={() => {
              onCancel();
              close();
            }}
          >
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

  React.useEffect(() => {
    open();
  }, [open]);

  return modal;
};

const AsyncConfirmExample = () => {
  const [result, setResult] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setResult("Action was confirmed!");
    setIsConfirming(false);
  };

  const handleCancel = () => {
    setResult("Action was cancelled.");
    setIsConfirming(false);
  };

  return (
    <div>
      <button
        className="btn btn--primary"
        onClick={() => setIsConfirming(true)}
      >
        Show Async Confirm
      </button>
      {isConfirming && (
        <AsyncConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      {result && <p className="info info--primary mt16">Result: {result}</p>}
    </div>
  );
};

export const AsyncConfirm: Story = {
  render: () => <AsyncConfirmExample />
};
