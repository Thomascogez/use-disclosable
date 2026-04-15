# use-disclosable

<center>
<img src="https://use-disclosable.thomas-cogez.fr/logo.png" width="200px" />
</center>

<p align="center">
  <a href="https://www.npmjs.com/package/use-disclosable">
    <img src="https://img.shields.io/npm/v/use-disclosable" alt="npm version" />
  </a>
  <a href="https://bundlephobia.com/package/use-disclosable">
    <img src="https://badgen.net/bundlephobia/minzip/use-disclosable" alt="bundle size" />
  </a>
  <a href="https://github.com/Thomascogez/use-disclosable/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/Thomascogez/use-disclosable/ci" alt="CI" />
  </a>
</p>

[Documentation](https://use-disclosable.thomas-cogez.fr) · [GitHub](https://github.com/Thomascogez/use-disclosable) · [npm](https://www.npmjs.com/package/use-disclosable)

---

`use-disclosable` is a React library that allows you to easily manage disclosable elements (modals, dialogs, drawers, etc.) with a powerful promise-based API.

> [!NOTE]
> Disclosable elements are UI elements with a short lifespan such as modals, dialogs, drawers, popovers, etc.

## Why use-disclosable?

| Feature                | use-disclosable                     | Traditional Approach      |
| ---------------------- | ----------------------------------- | ------------------------- |
| **Promise Support**    | `await open(Dialog)` returns result | Manual callback passing   |
| **State Management**   | Built-in                            | You manage `isOpen` state |
| **Component Tree**     | Declarative                         | Imperative prop drilling  |
| **Multiple Instances** | Built-in with identifiers           | Manual implementation     |
| **Framework Agnostic** | Works with any UI library           | Coupled to implementation |

## Features

- ✨ **Promise-based API** - Get results directly from your dialogs with `await`
- 📚 **Framework Agnostic** - Works with any UI library (Radix, Shadcn, Headless UI, custom)
- 🔗 **Type Safe** - Full TypeScript support with auto-complete
- 💪 **Zero Dependencies** - Lightweight, no external runtime deps
- 🔥 **Lightweight** - ~1KB gzipped
- 🎯 **Global Access** - Open dialogs from anywhere without prop drilling

## Quick Start

### 1. Install the Package

```bash
npm install use-disclosable
# or
pnpm add use-disclosable
# or
yarn add use-disclosable
```

### 2. Register the DisclosableRoot

The root component mounts your dialogs at the top level:

```tsx filename="App.tsx"
import { DisclosableRoot } from "use-disclosable";

const App = () => {
  return (
    <>
      <YourApp />
      <DisclosableRoot />
    </>
  );
};
```

### 3. Create Your Dialog Component

Wrap any dialog component with the injected props:

```tsx filename="MyDialog.tsx"
import type { DisclosableInjectedProps } from "use-disclosable";

type MyDialogProps = {
  title: string;
} & DisclosableInjectedProps;

export const MyDialog: React.FC<MyDialogProps> = ({
  title,
  isDisclosableOpen,
  closeDisclosable,
}) => {
  return (
    <Dialog
      open={isDisclosableOpen}
      onOpenChange={(open) => !open && closeDisclosable()}
    >
      <h1>{title}</h1>
    </Dialog>
  );
};
```

### 4. Open Dialogs from Anywhere

Use the promise-based API to get results directly:

```tsx filename="Page.tsx"
import { useDisclosable } from "use-disclosable";
import { MyDialog } from "./MyDialog";

const Page = () => {
  const { open } = useDisclosable();

  const handleClick = async () => {
    const result = await open(MyDialog, { props: { title: "Hello" } });
    console.log("Dialog closed with:", result); // undefined | string
  };

  return <button onClick={handleClick}>Open Dialog</button>;
};
```

## Usage with Popular UI Libraries

### Shadcn UI / Radix

```tsx filename="ShadcnDialog.tsx"
import * as Dialog from "@radix-ui/react-dialog";
import type { DisclosableInjectedProps } from "use-disclosable";

type Props = { title: string; description: string } & DisclosableInjectedProps;

export const ShadcnDialog: React.FC<Props> = ({
  title,
  description,
  isDisclosableOpen,
  closeDisclosable,
}) => (
  <Dialog.Root
    open={isDisclosableOpen}
    onOpenChange={(open) => !open && closeDisclosable()}
  >
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

### Headless UI

```tsx filename="HeadlessDialog.tsx"
import { Dialog } from "@headlessui/react";
import type { DisclosableInjectedProps } from "use-disclosable";

type Props = { title: string } & DisclosableInjectedProps;

export const HeadlessDialog: React.FC<Props> = ({
  title,
  isDisclosableOpen,
  closeDisclosable,
}) => (
  <Dialog open={isDisclosableOpen} onClose={closeDisclosable}>
    <Dialog.Panel>
      <Dialog.Title>{title}</Dialog.Title>
    </Dialog.Panel>
  </Dialog>
);
```

## API Reference

### `useDisclosable()`

Returns an object with methods to manage dialogs:

```ts
const { open, close, closeAll, setProps, disclosables } = useDisclosable();
```

| Method                        | Description         | Returns                        |
| ----------------------------- | ------------------- | ------------------------------ |
| `open(component, options)`    | Open a dialog       | `Promise<string \| undefined>` |
| `close(identifier, options)`  | Close a dialog      | `void`                         |
| `closeAll(options)`           | Close all dialogs   | `void`                         |
| `setProps(identifier, props)` | Update dialog props | `void`                         |

### Options

```ts
open(MyDialog, {
  props: { title: "Hello" }, // Props passed to the dialog
  identifier: "my-dialog", // Custom ID (defaults to component name)
  replace: false, // Replace existing dialog with same ID
});
```

```ts
close("my-dialog", {
  closeReason: "save", // Reason string passed back to promise
  destroyAfter: 300, // Delay before unmounting (for animations)
});
```

---

<a href="https://use-disclosable.thomas-cogez.fr">
  <img src="https://img.shields.io/badge/Documentation-View%20Docs-blue" />
</a>
