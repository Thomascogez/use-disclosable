# DisclosableRoot

The `<DisclosableRoot />` component represents the mount point of all your disclosables elements.
It should be registered once, ideally at the root of your application.

## Usage

```tsx
import { DisclosableRoot } from 'use-disclosable';

function App() {
  return (
    <>
        <YourApp />
        <DisclosableRoot />
    </>
  );
}
```