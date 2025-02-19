import { createSVGPath } from './path'

function toCSSURL(url: string) {
  return `url(${JSON.stringify(url)})`
}

function createDataURL(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`
}

export interface SmoothieSize {
  height: number,
  width: number,
}

export interface SmoothieBackgroundOptions {
  backgroundColor?: string,
  borderColor?: string,
  borderRadius?: number,
  borderRadiusSmoothing?: number,
  borderWidth?: number,
}

export function createBackgroundImage({
  width,
  height,
}: SmoothieSize, {
  backgroundColor,
  borderColor,
  borderRadius = 0,
  borderRadiusSmoothing = 0,
  borderWidth = 0,
}: SmoothieBackgroundOptions = {}) {
  const sizeAttrs = ` width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"`
  const fillAttrs = backgroundColor ? ` fill="${backgroundColor}"` : ''
  const strokeAttrs = borderColor && borderWidth > 0 ? ` stroke="${borderColor}" stroke-width="${borderWidth * 2}"` : ''
  const path = createSVGPath(width, height, borderRadius, borderRadiusSmoothing)
  const content = strokeAttrs ? `<path id="path-1" d="${path}" clip-path="url(#clip-1)"${strokeAttrs}/><clipPath id="clip-1"><use xlink:href="#path-1"/></clipPath>` : `<path d="${path}"/>`
  const nsAttrs = ` xmlns="http://www.w3.org/2000/svg"${strokeAttrs ? ` xmlns:xlink="http://www.w3.org/1999/xlink"` : ''}`
  return toCSSURL(createDataURL(`<svg${nsAttrs}${sizeAttrs}${fillAttrs}>${content}</svg>`))
}

export interface SmoothieMaskOptions {
  borderRadius?: number,
  borderRadiusSmoothing?: number,
}

export function createMaskImage(size: SmoothieSize, {
  borderRadius = 0,
  borderRadiusSmoothing = 0,
}: SmoothieMaskOptions = {}) {
  return createBackgroundImage(size, {
    backgroundColor: '#000',
    borderRadius,
    borderRadiusSmoothing,
  })
}

export function registerProperties() {
  CSS.registerProperty({
    name: '--smoothie-background-color',
    syntax: '<color>',
    inherits: false,
    initialValue: 'transparent',
  })
  CSS.registerProperty({
    name: '--smoothie-border-color',
    syntax: '<color>',
    inherits: false,
    initialValue: 'transparent',
  })
  CSS.registerProperty({
    name: '--smoothie-border-radius',
    syntax: '<length>',
    inherits: false,
    initialValue: 'transparent',
  })
  CSS.registerProperty({
    name: '--smoothie-border-smoothing',
    syntax: '<number> | <percentage>',
    inherits: false,
    initialValue: '0',
  })
  CSS.registerProperty({
    name: '--smoothie-border-width',
    syntax: '<length>',
    inherits: false,
    initialValue: '0px',
  })
}
