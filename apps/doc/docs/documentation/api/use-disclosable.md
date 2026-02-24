# useDisclosable

The `useDisclosable` hook is the primary way to interact with the disclosable system.

## API

```tsx
const { open, close, closeAll, setProps, disclosables } = useDisclosable();
```

---

## open

Opens a disclosable component and returns a Promise that resolves when the dialog is closed.

```ts
open(component: ReactComponent, options?: OpenDisclosableOptions): Promise<string | undefined>
```

### Parameters

| Parameter   | Type                     | Description                       |
| ----------- | ------------------------ | --------------------------------- |
| `component` | `React.FC`               | The disclosable component to open |
| `options`   | `OpenDisclosableOptions` | Optional configuration            |

### Options

```ts
interface OpenDisclosableOptions<T> {
  props?: Partial<ComponentProps<T>>; // Props to pass to the component
  identifier?: string; // Custom ID (defaults to component name)
  replace?: boolean; // Replace existing dialog with same ID (default: false)
  dismountOnClose?: boolean; // Unmount on close (default: true)
}
```

### Return Value

Returns a `Promise<string | undefined>` that:

- Resolves with the `closeReason` passed to `closeDisclosable()` when the dialog closes
- Resolves with `undefined` if closed without a reason
- Resolves with `undefined` if a dialog with the same identifier is already open (when `replace: false`)

### Usage

```tsx filename="MyComponent.tsx"
import { useDisclosable } from "use-disclosable";
import ConfirmationDialog from "./ConfirmationDialog";

const Component: React.FC = () => {
  const { open } = useDisclosable();

  const handleDelete = async () => {
    // Wait for user to respond
    const result = await open(ConfirmationDialog, {
      props: {
        title: "Delete Item",
        message: "Are you sure?",
      },
    });

    if (result === "confirm") {
      // User confirmed
      await deleteItem();
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};
```

### With Custom Identifier

```tsx
// Open with custom ID
await open(MyDialog, {
  identifier: "unique-id",
  props: { title: "Hello" },
});

// Open again with same ID (will be ignored by default)
await open(MyDialog, {
  identifier: "unique-id",
  props: { title: "World" },
});

// Replace existing dialog
await open(MyDialog, {
  identifier: "unique-id",
  replace: true, // This will replace the existing one
  props: { title: "New Content" },
});
```

---

## close

Closes a specific disclosable by component or identifier.

```ts
close(identifier: string | ReactComponent, options?: CloseDisclosableOptions): void
```

### Parameters

| Parameter    | Type                       | Description                          |
| ------------ | -------------------------- | ------------------------------------ |
| `identifier` | `string \| ReactComponent` | The component or identifier to close |
| `options`    | `CloseDisclosableOptions`  | Optional configuration               |

### Options

```ts
interface CloseDisclosableOptions {
  closeReason?: string; // Reason/message passed back to the Promise
  destroyAfter?: number; // Delay in ms before unmounting (for animations)
}
```

### Usage

```tsx filename="MyComponent.tsx"
const { open, close } = useDisclosable();

// Open a dialog
await open(MyDialog, { props: { title: "Hello" } });

// Close it programmatically with a reason
close(MyDialog, { closeReason: "saved", destroyAfter: 300 });

// Or close by identifier
close("my-dialog-identifier", { closeReason: "cancelled" });
```

---

## closeAll

Closes all currently open disclosables.

```ts
closeAll(options?: CloseDisclosableOptions): void
```

### Parameters

| Parameter | Type                      | Description                                     |
| --------- | ------------------------- | ----------------------------------------------- |
| `options` | `CloseDisclosableOptions` | Optional configuration (applies to all dialogs) |

### Usage

```tsx filename="MyComponent.tsx"
const { open, closeAll } = useDisclosable();

// Open multiple dialogs
await open(Dialog1);
await open(Dialog2);
await open(Dialog3);

// Close all at once
closeAll({ closeReason: "navigating_away", destroyAfter: 500 });
```

---

## setProps

Updates the props of an already-open disclosable.

```ts
setProps(identifier: string | ReactComponent, props: Partial<ComponentProps<T>>): void
```

### Parameters

| Parameter    | Type                         | Description                 |
| ------------ | ---------------------------- | --------------------------- |
| `identifier` | `string \| ReactComponent`   | The component or identifier |
| `props`      | `Partial<ComponentProps<T>>` | Props to update             |

### Usage

```tsx filename="MyComponent.tsx"
const { open, setProps } = useDisclosable();

// Open dialog
await open(DetailsDialog, {
  identifier: "item-details",
  props: { itemId: null },
});

// Update props later
setProps("item-details", { itemId: 123 });

// Or using the component
setProps(DetailsDialog, { itemId: 456 });
```

---

## disclosables

An object containing all currently open disclosables. Useful for debugging or building custom UI.

```ts
disclosables: Record<string, Disclosable>;
```

### Usage

```tsx filename="DebugPanel.tsx"
const { open, disclosables } = useDisclosable();

return (
  <div>
    <p>Open dialogs: {Object.keys(disclosables).length}</p>
    <ul>
      {Object.entries(disclosables).map(([id, d]) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  </div>
);
```

---

## TypeScript Types

### OpenDisclosableOptions

```ts
type OpenDisclosableOptions<
  T extends AnyReactComponent,
  P = Omit<ComponentProps<T>, keyof DisclosableInjectedProps>,
> = (IsEmptyObject<P> extends true ? { props?: P } : { props: P }) & {
  identifier?: string;
  dismountOnClose?: boolean;
  replace?: boolean;
};
```

### CloseDisclosableOptions

```ts
type CloseDisclosableOptions = {
  destroyAfter?: number; // Delay before unmounting (ms)
  closeReason?: string; // Value passed to the Promise
};
```
