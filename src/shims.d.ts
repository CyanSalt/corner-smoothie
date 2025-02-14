export {}

declare global {

  interface PaintSize {
    readonly height: number,
    readonly width: number,
  }

  type PaintRenderingContext2D = Pick<
    CanvasRenderingContext2D,
    // Context
    'isContextLost'
    // State
    | 'save' | 'restore' | 'reset'
    // Transformations
    | 'getTransform' | 'rotate' | 'scale' | 'translate' | 'transform' | 'setTransform' | 'resetTransform'
    // Compositing
    | 'globalAlpha' | 'globalCompositeOperation'
    // Image smoothing
    | 'imageSmoothingEnabled' | 'imageSmoothingQuality'
    // Fill and stroke styles
    | 'fillStyle' | 'strokeStyle'
    // Gradients and patterns
    | 'createConicGradient' | 'createLinearGradient' | 'createRadialGradient' | 'createPattern'
    // Shadows
    | 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'
    // Drawing rectangles
    | 'clearRect' | 'fillRect' | 'strokeRect'
    // Drawing paths
    | 'beginPath' | 'fill' | 'stroke' | 'clip' | 'isPointInPath' | 'isPointInStroke'
    // Drawing images
    | 'drawImage'
    // Line styles
    | 'lineWidth' | 'lineCap' | 'lineJoin' | 'miterLimit' | 'getLineDash' | 'setLineDash' | 'lineDashOffset'
    // Paths
    | 'closePath' | 'moveTo' | 'lineTo' | 'bezierCurveTo' | 'quadraticCurveTo' | 'arc' | 'arcTo' | 'ellipse' | 'rect' | 'roundRect'
    // Filters
    | 'filter'
  >

  interface PaintContextOptions {
    alpha?: boolean,
  }

  interface PaintWorklet {
    paint(
      ctx: PaintRenderingContext2D,
      size: PaintSize,
      properties: StylePropertyMapReadOnly,
    ): void,
  }

  interface PaintWorkletConstructor {
    new(): PaintWorklet,
    readonly contextOptions?: {
      alpha?: boolean,
    },
    readonly inputProperties?: string[],
  }

  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope/registerPaint}
   */
  function registerPaint(name: string, classRef: PaintWorkletConstructor): void

}
