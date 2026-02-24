# Injected Props

When a disclosable is opened, it receives injected props that allow it to communicate with the disclosable system.

## Provided Props

```ts
type DisclosableInjectedProps = {
  disclosableIndex: number;
  isDisclosableOpen: boolean;
  closeDisclosable: (options?: CloseDisclosableOptions) => void;
};
```

---

## isDisclosableOpen

```ts
isDisclosableOpen: boolean;
```

A boolean indicating whether the disclosable is currently open. Use this to control your dialog component's visibility.

```tsx filename="MyDialog.tsx"
import { Dialog } from "./ui/dialog";

export const MyDialog: React.FC<Props> = ({
  isDisclosableOpen,
  // ...other props
}) => {
  return <Dialog open={isDisclosableOpen}>{/* Dialog content */}</Dialog>;
};
```

<Callout type="info">
  Most UI libraries (Radix, Headless UI, etc.) use this boolean to trigger entrance/exit animations. Always pass it to your underlying dialog component.
</Callout>

---

## closeDisclosable

```ts
closeDisclosable: (options?: CloseDisclosableOptions) => void
```

A function to close the disclosable. This is the primary way to communicate back to the caller.

### Parameters

```ts
interface CloseDisclosableOptions {
  destroyAfter?: number; // Delay before unmounting (for animations)
  closeReason?: string; // Value passed to the Promise returned by open()
}
```

### Usage Examples

**Basic close:**

```tsx
<Button onClick={() => closeDisclosable()}>Close</Button>
```

**With close reason:**

```tsx
// Confirm action
<Button onClick={() => closeDisclosable({ closeReason: "confirm" })}>
  Confirm
</Button>

// Cancel action
<Button onClick={() => closeDisclosable({ closeReason: "cancel" })}>
  Cancel
</Button>
```

**With animation delay:**

```tsx
<Button onClick={() => closeDisclosable({ destroyAfter: 300 })}>
  Close (wait for animation)
</Button>
```

---

## disclosableIndex

```ts
disclosableIndex: number;
```

A unique index for this disclosable instance. Useful for:

- **Z-index management** - Higher index = higher z-index for stacked dialogs
- **Tracking dialog order** - Know which dialog was opened first/last

```tsx filename="MyDialog.tsx"
export const MyDialog: React.FC<Props> = ({
  disclosableIndex,
  isDisclosableOpen,
}) => {
  return (
    <Dialog
      open={isDisclosableOpen}
      style={{ zIndex: 1000 + disclosableIndex }}
    >
      {/* Dialog content */}
    </Dialog>
  );
};
```

---

## Full Example

```tsx filename="ConfirmationDialog.tsx"
import type { DisclosableInjectedProps } from "use-disclosable";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

type ConfirmationDialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
} & DisclosableInjectedProps;

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDisclosableOpen,
  closeDisclosable,
  disclosableIndex,
}) => {
  return (
    <Dialog open={isDisclosableOpen}>
      <DialogContent style={{ zIndex: 1000 + disclosableIndex }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => closeDisclosable({ closeReason: "cancel" })}
          >
            {cancelLabel}
          </Button>
          <Button onClick={() => closeDisclosable({ closeReason: "confirm" })}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

## Usage with Different UI Libraries

### Radix UI

```tsx
import * as Dialog from "@radix-ui/react-dialog";

export const MyDialog: React.FC<Props> = ({
  isDisclosableOpen,
  closeDisclosable,
}) => (
  <Dialog.Root
    open={isDisclosableOpen}
    onOpenChange={(open) => !open && closeDisclosable()}
  >
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>{/* Content */}</Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

### Headless UI

```tsx
import { Dialog } from "@headlessui/react";

export const MyDialog: React.FC<Props> = ({
  isDisclosableOpen,
  closeDisclosable,
}) => (
  <Dialog open={isDisclosableOpen} onClose={closeDisclosable}>
    <Dialog.Panel>{/* Content */}</Dialog.Panel>
  </Dialog>
);
```

### Custom CSS

```tsx filename="CustomDialog.tsx"
export const CustomDialog: React.FC<Props> = ({
  isDisclosableOpen,
  closeDisclosable,
}) => {
  return (
    <div className={`dialog ${isDisclosableOpen ? "dialog--open" : ""}`}>
      <div className="dialog__content">
        <button onClick={() => closeDisclosable()}>Close</button>
      </div>
    </div>
  );
};
```
