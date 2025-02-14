import { getSvgPath } from 'figma-squircle'

export function createSVGPath(
  width: number,
  height: number,
  radius: number,
  smoothing: number,
): string {
  return getSvgPath({
    cornerRadius: radius,
    cornerSmoothing: smoothing,
    width,
    height,
  })
}
