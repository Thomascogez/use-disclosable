# use-disclosable

<center>
<img src="https://use-disclosable.thomas-cogez.fr/logo.png" width="200px" />
</center>

[Documentation](https://use-disclosable.thomas-cogez.fr)
----
`use-disclosable` is a react library that allow to easily manage disclosable elements.

It provide a simple API that allow you to quickly integrate any disclosable elements (custom or from a library) into your application.

> [!NOTE]  
> Disclosable elements here are defined by an UI elements that have short lifespan such as modal, dialogs, drawers, etc.

- 📚 Framework agnostic
- 🔗 Type safe
- 💪 Zero dependencies
- 🔥 Lightweight

## Quick start

### 1. Install the package

```bash
npm install use-disclosable
```

### 2. Register a disclosable root

The disclosable root is the mount point of your disclosable element. You usally want to mount it close to the body of your application.

```tsx {7} filename="App.tsx"
import { DisclosableRoot } from 'use-disclosable';

const App = () => {
    return (
        <>
            <AppContent />
            </DisclosableRoot>
        </>
    )
}
```

### 3. Update your disclosable element

Now you can update your disclosable element in order to make it `react` to disclosable events.

```tsx {7} filename="MyDisclosableElement.tsx"
import type { DisclosableInjectedProps } from 'use-disclosable';
import { Dialog } from "my-awesome-library";

import MyDialogElement from './MyDialogElement';

type MyDialogElementProps = {
    title: string;
} & DisclosableInjectedProps

const MyDialogElement: React.FC<MyDialogElementProps> = ({ title, isDisclosableOpen, closeDisclosable }) => {
    return (
        <Dialog isOpen={isDisclosableOpen} onOpenChange={(isOpen) => !isOpen && closeDisclosable()}>
            <h1>{title}</h1>
        </Disclosable>
    )
}
```

### 3. Use the disclosable hook

Now you can use the `useDisclosable` hook to manage your disclosable element, anywhere in your application.

```tsx {7} filename="MyDisclosableElement.tsx"
import { useDisclosable } from 'use-disclosable';
import MyDialogElement from './MyDialogElement';

const MyDisclosableElement = () => {
    const { open } = useDisclosable();

    return (
        <div>
            <button onClick={() => open(MyDialogElement, {props: {title: "Hello"}})}>Open My dialog</button>
        </div>
    )
}