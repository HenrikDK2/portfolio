import { RefObject } from "react";

export type Position = [number, number];
export type Range = [number, number];
export type Preset = "Circle" | "Triangle";
export type Direction = "Up" | "Down";
export type Transitions = {
  opacity: { name: "show" | "hide"; range: Range };
  sway: { name: "left" | "right" };
};
export interface IParticleInit {
  canvas: HTMLCanvasElement;
  fps: number;
  direction: Direction;
  objects: RefObject<ICanvasObject[]>;
  preset: Preset;
  amount: number;
  size: number;
  minSize: number;
}

export type CreateObject = IParticleGenerator & {
  canvas: HTMLCanvasElement;
};

export interface ICanvasObject {
  initPos: Position;
  pos: Position;
  size: number;
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
