# Introduction

`use-disclosable` is a react library that allow to easily manage disclosable elements.

It provide a simple API that allow you to quickly integrate any disclosable elements (custom or from a library) into your application.

<Callout type="info">
    <dfn>
        Disclosable elements here are defined by an UI elements that have short lifespan such as modal, dialogs, drawers, etc.
    </dfn>
</Callout>

## Phylosophy
### Classic approach
Let's take a look at the following example:

```tsx {5,9}
import { useState } from 'react';
import MyDialogElement from './MyDialogElement';

export const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open dialog</button>
            <MyDialogElement isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}
```

In a classic approach, when we want to interact with a disclosable element, we have to manage the open state and mount the element early in the component tree.

Using this approach mean we have to manage every state by hand and we have to keep the element mounted in the component tree even if it's lifespan is relatively short.

Also when dialog require some specific props, we have to pass them to the element and handle case where their could be `undefined`.

### use-disclosable approach

This library as a slightly different approach:
- 1. The disclosable element should be mounted close to the body and not inside page components. Since "disclosable" should appear in the top layer.
- 2. The disclosable element should be mounted in the component tree only when it's open.
- 3. The open state of the component tree should be defined by if he is mounted or not 

Here a brief overview of the general idea:
![](/schema.svg)

Here what's the above example will look like with `use-disclosable`:

```tsx 
import { useDisclosable } from 'use-disclosable';
import MyDialogElement from './MyDialogElement';

const MyComponent = () => {
    const { open } = useDisclosable();

    return (
        <div>
            <button onClick={() =>open(MyDialogElement)}>Open</button>
        </div>
    )
}

