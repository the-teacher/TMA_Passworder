### Breakpoints:

- Mobile: 520px (0-520px is mobile)
- Tablet: 840px (521-840px is tablet)
- Desktop: 1200px (841-1200px is desktop)
- Large Desktop: 1440px (1201-1440px is large desktop)
- Limit container max-width to 1440px.

### Media Queries

Use modern width syntax for media queries. Like this:

```css
@media (0 < width < 520px) {
  ...;
}
```

### BEM Naming Convention

Use BEM naming convention for CSS classes.
`-` - delimiter in names of (block, element, modifier).
`--` - delimiter between block and element.
`__` - delimiter between element and modifier. 4. Where possible Use SCSS by default.

### Modern SCSS

Follow modern SCSS syntax. Use `@use`, `@forward` and other modern SCSS features.

### SCSS Nesting

In SCSS try to avoid using more then 2 levels of nesting (It is difficult to read and maintain).

Example:

```scss
.holy-grail {
  &--container {
    max-width: 1440px;
    margin: 0 auto;

    @media (0 < width < 520px) {
      // mobile styles
    }

    @media (520px < width < 840px) {
      // tablet styles
    }

    @media (840px < width < 1200px) {
      // desktop styles
    }

    @media (1200px < width < 1440px) {
      // large desktop styles
    }
  }
}
```

Sould be written like this:

```scss
.holy-grail {
  &--container {
    max-width: 1440px;
    margin: 0 auto;
  }
}

.holy-grail--container {
  @media (0 < width < 520px) {
    // mobile styles
  }

  @media (520px < width < 840px) {
    // tablet styles
  }

  @media (840px < width < 1200px) {
    // desktop styles
  }

  @media (1200px < width < 1440px) {
    // large desktop styles
  }
}
```

### No Tags in CSS

Do not use tags in CSS. Use classes instead.

### Units

Use PX units for all values.

Example:

```scss
.holy-grail {
  &--container {
    max-width: 1440px;
```
