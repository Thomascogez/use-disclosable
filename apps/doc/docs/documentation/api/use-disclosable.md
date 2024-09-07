# use-disclosable

The `use-disclosable` hook is the way to interact with the disclosable system.

## API
### open
Allow to open a disclosable. 
#### Parameters
- `disclosable`: The disclosable component to open or the disclosable identifier.
- `options`: An object containing the options for the disclosable.
  - `options.props`: An object containing the props to pass to the disclosable.
  - `options.identifier`: An optional identifier for the disclosable. If not provided, the disclosable will be opened using the component name (usally used to display to component of the same type)
#### Usage
```tsx
import { useDisclosable } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';
const App: React.FC = () => {
  const { open } = useDisclosable();

  return (
    <button onClick={() => open(DisclosableComponent, { props: { text: 'Hello' } })}>
      Open disclosable
    </button>
  );
};
```

### close
Allow to close an opened disclosable.
#### Parameters
- `disclosable`: The disclosable component to close or the disclosable identifier.
- `options`: An object containing the options for the disclosable.
  - `options.destroyAfter`: An optional number indicating the delay in milliseconds before destroying the disclosable. (useful for animations)

#### Usage
```tsx
import { useDisclosable } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';
const App: React.FC = () => {
  const { open, close } = useDisclosable();

  return (
    <>
      <button onClick={() => open(DisclosableComponent, { props: { text: 'Hello' } })}>
        Open disclosable
      </button>
      <button onClick={() => close(DisclosableComponent)}>
        Close disclosable
      </button>
    </>
  );
};
```

### closeAll
Allow to close all opened disclosables.
#### Parameters
- `options`: An object containing the options for the disclosable.
  - `options.destroyAfter`: An optional number indicating the delay in milliseconds before destroying the disclosable. (useful for animations)

#### Usage
```tsx
import { useDisclosable } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';
const App: React.FC = () => {
  const { open, closeAll } = useDisclosable();

  return (
    <>
      <button onClick={() => open(DisclosableComponent, { props: { text: 'Hello' } })}>
        Open disclosable
      </button>
      <button onClick={() => closeAll()}>
        Close all disclosables
      </button>
    </>
  );
};
```

### setProps
Allow to set props on an opened disclosable.
#### Parameters
- `disclosable`: The disclosable component to set props on or the disclosable identifier.
- `props`: An object containing the props to set on the disclosable.

#### Usage
```tsx
import { useDisclosable } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';
const App: React.FC = () => {
  const { open, setProps } = useDisclosable();

  return (
    <>
      <button onClick={() => open(DisclosableComponent, { props: { text: 'Hello' } })}>
        Open disclosable
      </button>
      <button onClick={() => setProps(DisclosableComponent, { text: 'World' })}>
        Set props on disclosable
      </button>
    </>
  );
};
```

### disclosables
An object containing all the opened disclosables.

#### Usage
```tsx
import { useDisclosable } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';
const App: React.FC = () => {
  const { open, disclosables } = useDisclosable();

  return (
    <>
      <button onClick={() => open(DisclosableComponent, { props: { text: 'Hello' } })}>
        Open disclosable
      </button>
      <button onClick={() => console.log(disclosables)}>
        Log disclosables
      </button>
    </>
  );
};