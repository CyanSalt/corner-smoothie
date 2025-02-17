# corner-smoothie

[![npm](https://img.shields.io/npm/v/corner-smoothie.svg)](https://www.npmjs.com/package/corner-smoothie)

![Squircle without smoothing](./playground/squircle.svg)
&nbsp;
![Squircle with full smoothing](./playground/squircle-smoothie-60.svg)
&nbsp;
![Squircle with full smoothing](./playground/squircle-smoothie-100.svg)

Create elements with [Figma corner smoothing](https://www.figma.com/blog/desperately-seeking-squircles/).

[Live Demo](https://raw.githack.com/CyanSalt/corner-smoothie/main/playground/index.html)

## Usage

### CSS Painting API (Recommended)

> [!TIP]
> See [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API#browser_compatibility).

```js
CSS.paintWorklet.addModule('<url-to-corner-smoothie-worklet>')
```

#### Using CDN (jsdelivr)

```js
CSS.paintWorklet.addModule('https://cdn.jsdelivr.net/npm/corner-smoothie/dist/worklet.js')
```

#### Using Vite

```js
import smoothieWorklet from 'corner-smoothie/worklet?url'

CSS.paintWorklet.addModule(smoothieWorklet)
```

#### CSS Declarations

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

JS API is especially useful for browsers that do not support the CSS Painting API such as Firefox. You can use `ResizeObserver` to have a similar experience to the CSS Painting API:

```js
import { createMaskImage } from 'corner-smoothie'

const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.borderBoxSize.length) {
      entry.target.style.maskImage = createMaskImage({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      }, {
        // Normally you can't use the CSS Typed OM API
        // because you only need to use the CSS Painting API in these browsers
        borderRadius: parseFloat(getComputedStyle(entry.target).getPropertyValue('--smoothie-border-radius')),
        borderRadiusSmoothing: 0.6,
      })
    }
  }
})

observer.observe(element)
```

> Some older browsers may not support [`borderBoxSize`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/borderBoxSize), you may need to use [`contentRect`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect) instead.

## Differences between mask and background

| Feature | Mask | Background |
| --- | --- | --- |
| Corner radius | ✅ | ✅ |
| Background image | ✅ | ❌ |
| Border | ❌ | ✅ |
| Overflow content | ❌ | ✅ |
