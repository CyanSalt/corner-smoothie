import draw from 'draw-svg-path'
import { createSVGPath } from './path'

function toCSSNumericValue(source: CSSStyleValue | null | undefined) {
  if (!source) return null
  try {
    return source instanceof CSSNumericValue
      ? source
      : CSSNumericValue.parse(source.toString())
  } catch {
    return null
  }
}

function toLength(input: CSSStyleValue | null | undefined, fallback = 0) {
  const source = toCSSNumericValue(input)
  if (!source) return fallback
  try {
    return source.to('px').value
  } catch {
    return fallback
  }
}

function toPercentage(input: CSSStyleValue | null | undefined, fallback = 0) {
  const source = toCSSNumericValue(input)
  if (!source) return fallback
  try {
    if (source instanceof CSSUnitValue && source.unit === 'number') return source.value
    return source.to('percent').value * 0.01
  } catch {
    return fallback
  }
}

class SmoothieBackground implements PaintWorklet {

  static get inputProperties() {
    return [
      '--smoothie-background-color',
      '--smoothie-border-color',
      '--smoothie-border-radius',
      '--smoothie-border-radius-smoothing',
      '--smoothie-border-width',
    ]
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: PaintSize,
    properties: StylePropertyMapReadOnly,
  ) {
    const backgroundColor = properties.get('--smoothie-background-color')
    const borderColor = properties.get('--smoothie-border-color')
    const borderRadius = toLength(properties.get('--smoothie-border-radius'))
    const borderRadiusSmoothing = toPercentage(properties.get('--smoothie-border-radius-smoothing'))
    const borderWidth = toLength(properties.get('--smoothie-border-width'))

    ctx.beginPath()
    draw(ctx, createSVGPath(size.width, size.height, borderRadius, borderRadiusSmoothing))
    ctx.closePath()

    if (backgroundColor) {
      ctx.fillStyle = backgroundColor.toString()
      ctx.fill()
    }
    if (borderColor && borderWidth > 0) {
      // Inner stroke
      ctx.clip()
      ctx.strokeStyle = borderColor.toString()
      ctx.lineWidth = borderWidth * 2
      ctx.stroke()
    }
  }

}

class SmoothieMask implements PaintWorklet {

  static get inputProperties() {
    return [
      '--smoothie-border-radius',
      '--smoothie-border-radius-smoothing',
    ]
  }

  paint(
    ctx: PaintRenderingContext2D,
    size: PaintSize,
    properties: StylePropertyMapReadOnly,
  ) {
    const borderRadius = toLength(properties.get('--smoothie-border-radius'))
    const borderRadiusSmoothing = toPercentage(properties.get('--smoothie-border-radius-smoothing'))

    ctx.beginPath()
    draw(ctx, createSVGPath(size.width, size.height, borderRadius, borderRadiusSmoothing))
    ctx.closePath()

    ctx.fillStyle = '#000'
    ctx.fill()
  }

}

registerPaint('smoothie-background', SmoothieBackground)
registerPaint('smoothie-mask', SmoothieMask)
