# corner-smoothie

[![npm](https://img.shields.io/npm/v/corner-smoothie.svg)](https://www.npmjs.com/package/corner-smoothie)

Create elements with [Figma corner smoothing](https://www.figma.com/blog/desperately-seeking-squircles/).

## Usage

### CSS Paint API (Recommended)

> [!TIP]
> See [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API#browser_compatibility).

```js
CSS.paintWorklet.addModule('https://<url-to-corner-smoothie>/dist/worklet.js')
// e.g.
// CSS.paintWorklet.addModule('https://cdn.jsdelivr.net/npm/corner-smoothie/dist/worklet.js')
```

```css
.my-element {
  border-radius: 12px;
}

@supports (mask-image: paint(smoothie-mask)) {
  .my-element {
    --smoothie-border-radius: 12px;
    --smoothie-border-smoothing: 0.6;
    border-radius: 0;
    mask-image: paint(smoothie-mask);
  }
}
```

```css
.my-element {
  background-color: cyan;
  border-radius: 12px;
}

@supports (background-image: paint(smoothie-background)) {
  .my-element {
    --smoothie-background-color: cyan;
    --smoothie-border-radius: 12px;
    --smoothie-border-smoothing: 0.6;
    background-color: transparent;
    border-radius: 0;
    background-image: paint(smoothie-background);
  }
}
```

#### Supported custom properties

- `--smoothie-background-color`: Alternative to `background-color`. Available in background mode.
- `--smoothie-border-color`: Alternative to `border-color`. Available in background mode.
- `--smoothie-border-radius`: Alternative to `border-radius`. Available in **BOTH** modes.
- `--smoothie-border-radius-smoothing`: A decimal between 0 and 1, aka `ξ` in [Figma smoothing parameterized](https://www.figma.com/blog/desperately-seeking-squircles/#breakthrough-smoothing-parameterized). The larger the value, the smoother the corners. Available in **BOTH** modes.
    - It is consistent with the iOS specification when specified as `0.6`.
- `--smoothie-border-width`: Alternative to `border-width`. Available in background modes.

### JS API

```js
import { createMaskImage } from 'corner-smoothie'

const mask = createMaskImage(
  { width: 72, height: 72 },
  { borderRadius: 12, borderRadiusSmoothing: 0.6 },
)
element.style.maskImage = mask
```

```js
import { createBackgroundImage } from 'corner-smoothie'

const background = createBackgroundImage(
  { width: 72, height: 72 },
  { borderRadius: 12, borderRadiusSmoothing: 0.6, backgroundColor: 'cyan' },
)
element.style.backgroundImage = background
```

## Differences between mask and background

| Feature | Mask | Background |
| --- | --- | --- |
| Corner radius | ✅ | ✅ |
| Background image | ✅ | ❌ |
| Border | ❌ | ✅ |
| Overflow content | ❌ | ✅ |
