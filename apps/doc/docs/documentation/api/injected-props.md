# Injected props

When a disclosable is opened, it receives some injected props.
These props are useful to interact with the disclosable system.

## isDisclosableOpen
The `isDisclosableOpen` prop is a boolean that indicates if the disclosable is currently open.
Since most of the framework will use this a boolean to trigger some animations, it is a good practice to use it.

## disclosableIndex
The `disclosableIndex` prop is a number that represents the index of the disclosable.
This is useful when you need to keep track of the order of the disclosables or when you want to get a proper z-index.

## closeDisclosable
The `closeDisclosable` prop is a function that allows to close the disclosable.
It takes an optional object as parameter, which can contain the following properties:
- `destroyAfter`: An optional number indicating the delay in milliseconds before destroying the disclosable.

## Usage
```tsx
import type { DisclosableInjectedProps } from 'use-disclosable';
import DisclosableComponent from './DisclosableComponent';

type DisclosableComponentProps = {
  title: string;
} & DisclosableInjectedProps;

const DisclosableComponent: React.FC = ({title, closeDisclosable, disclosableIndex}) => {
  return (
    <div>
        <h1>{title}</h1>
        <p>I'm the ${disclosableIndex} disclosable </p>
        <button onClick={() => closeDisclosable()}>Close disclosable</button>
    </div>
  );
};
```