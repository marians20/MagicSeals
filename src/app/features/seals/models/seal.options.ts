export type StrokeStyle = string | CanvasGradient | CanvasPattern;

export interface SealOptions {
  backgroundColor: StrokeStyle;
  sigilColor: StrokeStyle;
  circleColor: StrokeStyle;
  mapColor: StrokeStyle;
  shouldDrawMap: boolean;
};
