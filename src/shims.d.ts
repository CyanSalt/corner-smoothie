export {}

declare global {

  interface PaintSize {
    readonly height: number,
    readonly width: number,
  }

  // eslint-disable-next-line @stylistic/js/max-len
  interface PaintRenderingContext2D extends CanvasCompositing, CanvasDrawImage, CanvasDrawPath, CanvasFillStrokeStyles, CanvasFilters, CanvasImageSmoothing, CanvasPath, CanvasPathDrawingStyles, CanvasRect, CanvasShadowStyles, CanvasState, CanvasTransform {}

  interface PaintContextOptions {
    alpha?: boolean,
  }

  interface PaintWorklet {
    paint(
      ctx: PaintRenderingContext2D,
      size: PaintSize,
      properties: StylePropertyMapReadOnly,
      args: string[],
    ): void,
  }

  type PaintRenderingContext2DSettings = CanvasRenderingContext2DSettings

  interface PaintWorkletConstructor {
    new(): PaintWorklet,
    readonly inputProperties?: string[],
    readonly inputArguments?: string[],
    readonly contextOptions?: PaintRenderingContext2DSettings,
  }

  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope/registerPaint}
   */
  function registerPaint(name: string, classRef: PaintWorkletConstructor): void

}
