import draw from 'draw-svg-path'
import { createSVGPath } from './path'

function coalesceNaN(value: number, fallback: number) {
  return isNaN(value) ? fallback : value
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
    const borderRadius = properties.get('--smoothie-border-radius')
    const borderRadiusSmoothing = properties.get('--smoothie-border-radius-smoothing')
    const borderWidth = properties.get('--smoothie-border-width')

    const radius = borderRadius ? coalesceNaN(parseFloat(borderRadius.toString()), 0) : 0
    const smoothing = borderRadiusSmoothing ? coalesceNaN(parseFloat(borderRadiusSmoothing.toString()), 0) : 0
    const strokeWidth = borderWidth ? coalesceNaN(parseFloat(borderWidth.toString()), 0) : 0

    ctx.beginPath()
    draw(ctx, createSVGPath(size.width, size.height, radius, smoothing))
    ctx.closePath()

    if (backgroundColor) {
      ctx.fillStyle = backgroundColor.toString()
      ctx.fill()
    }
    if (borderColor && strokeWidth > 0) {
      // Inner stroke
      ctx.clip()
      ctx.strokeStyle = borderColor.toString()
      ctx.lineWidth = strokeWidth * 2
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
    const borderRadius = properties.get('--smoothie-border-radius')
    const borderRadiusSmoothing = properties.get('--smoothie-border-radius-smoothing')
    const radius = borderRadius ? coalesceNaN(parseFloat(borderRadius.toString()), 0) : 0
    const smoothing = borderRadiusSmoothing ? coalesceNaN(parseFloat(borderRadiusSmoothing.toString()), 0) : 0

    ctx.beginPath()
    draw(ctx, createSVGPath(size.width, size.height, radius, smoothing))
    ctx.closePath()

    ctx.fillStyle = '#000'
    ctx.fill()
  }

}

registerPaint('smoothie-background', SmoothieBackground)
registerPaint('smoothie-mask', SmoothieMask)
