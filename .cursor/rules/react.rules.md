### Use Arrow Functions

Where is is possible and reasonable use arrow functions instead of function declarations.

### Export at the end of the file

If file has more then 3 exports, export functions at the end of the file.

### Use Yarn

Use `yarn` instead of `npm`.

### Use TypeScript

Always use TypeScript by default.

### Use SCSS

Use SCSS by default.

### Use BEM

Use BEM naming convention for CSS classes.

### Do not use

Do not use `React.FC` for components.

### TypeScript

Use Yarn with Node Modules and `"moduleResolution": "node"` for TypeScript configuration.

### React Router 7

Instead of `"react-router-dom"` use `"react-router"`

### Module Structure

Important rules for file organization:

1. If there is only ONE file of a certain type (test, util, service, etc), it should be placed directly in the component's root folder, NOT in a subfolder
2. Create specialized subfolders (**tests**, utils/, services/, etc) ONLY when there are MULTIPLE files of that type
3. Examples:
   - Single test file → `MyComponent/MyComponent.test.ts`
   - Multiple test files → `MyComponent/__tests__/MyComponent.test1.ts`, `MyComponent/__tests__/MyComponent.test2.ts`
   - Single utility file → `MyComponent/utils.ts`
   - Multiple utility files → `MyComponent/utils/utils.time.ts`, `MyComponent/utils/utils.string.ts`

If I have a component with name `MyComponent`
It has the following structure:

```
components/
  MyComponent/
    __tests__/ (optional, if has more then one file)
      MyComponent.test.ts
      MyComponent.test1.ts
      MyComponent.test2.ts
    services/ (optional, if has services)
      service1.ts
      service2.ts
    utils/ (optional, if has more then one file)
      utils.time.ts
      utils.string.ts
      utils.array.ts
      utils.object.ts
    components/ (optional, if has subcomponents)
        SubComponent1/
            index.ts
            SubComponent1.stories.ts
            SubComponent1.test.ts
            SubComponent1.tsx
        SubComponent2/
            index.ts
            SubComponent2.stories.ts
            SubComponent2.test.ts
            SubComponent2.tsx
    index.ts
    types.ts (optional, if has types)
    utils.ts (optional, if the only one file)
    MyComponent.stories.ts (optional, if has the only one file)
    MyComponent.test.ts (optional, if has the only one file)
    MyComponent.tsx
```

`index.ts` is the main entry point for the component.

```
export { default } from "./MyComponent";
export { SubComponent1 } from "./components/SubComponent1";
export { SubComponent2 } from "./components/SubComponent2";
```

`MyComponent.tsx` is the main component file.

```
const MyComponent = () => {
  return <div>MyComponent</div>;
};

export default MyComponent;
```

### Naming of styles

Bad:

```
MyComponent/
    index.ts
    MyComponent.tsx
    MyComponent.scss
```

Good:

```
MyComponent/
    index.ts
    MyComponent.tsx
    styles.scss
```

### Child components and types

Bad:

```ts
type AsideLeftProps = {
  children: ReactNode;
};

const AsideLeft = ({ children }: AsideLeftProps) => (...);
```

Good:

```ts
const AsideLeft = ({ children }: { children: ReactNode }) => (...);
```

### Components without return when it is not necessary

Bad:

```ts
const IndexPage = () => {
  return (
    <div className="index-page">
      <h1>Home Page</h1>
    </div>
  );
};
```

Good:

```ts
const IndexPage = () => (
  <div className="index-page">
    <h1>Home Page</h1>
  </div>
);
```
