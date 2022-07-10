export type Position = [number, number];
export type Range = [number, number];
export type Preset = "Circle" | "Triangle";
export type Direction = "Up" | "Down";
export type Transitions = {
  opacity: { name: "show" | "hide"; range: Range };
  sway: { name: "left" | "right" };
};

export type CreateObject = IParticlesProps & {
  canvas: HTMLCanvasElement;
};

export interface IParticlesProps {
  fps: number;
  amount: number;
  minSize: number;
  size: number;
  direction: Direction;
  preset: Preset;
  amountBreakpoints?: { [key in number]: number };
}

export interface ICanvasObject {
  initPos: Position;
  pos: Position;
  size: number;
  moveSpeed: [number, number];
  direction: Direction;
  rgba: [number, number, number, number];
  transitions: Transitions;
}

export interface MoveAnimate {
  direction: Direction;
  object: ICanvasObject;
  fps: number;
  canvas: HTMLCanvasElement;
}

export interface IDraw {
  ctx: CanvasRenderingContext2D;
  fps: number;
  preset: Preset;
  direction: Direction;
  objects: ICanvasObject[];
}
