/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useRef, useState } from "react";
import { css } from "goober";
import {
  CreateObject,
  ICanvasObject,
  MoveAnimate,
  IParticlesProps,
  IDraw,
} from "../../types/particles";

const canvasStyle = css`
  height: 100%;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  z-index: -1;
  width: 100vw;
`;

const opacityAnimate = (object: ICanvasObject, fps: number) => {
  if (object.transitions.opacity.name === "show") {
    object.rgba[3] += 0.05 / fps;
    if (object.rgba[3] > object.transitions.opacity.range[1]) {
      object.transitions.opacity.name = "hide";
    }
  } else {
    object.rgba[3] -= 0.05 / fps;
    if (object.rgba[3] < object.transitions.opacity.range[0]) {
      object.transitions.opacity.name = "show";
    }
  }
};

const swayAnimate = (object: ICanvasObject, fps: number) => {
  if (object.transitions.sway.name === "left") {
    object.pos[0] -= 4 / fps;
    if (object.pos[0] < object.pos[0] - object.size) {
      object.transitions.sway.name = "right";
    }
  } else {
    object.pos[0] += 4 / fps;
    if (object.pos[0] > object.pos[0] + object.size) {
      object.transitions.sway.name = "left";
    }
  }
};

const moveAnimate = ({ direction, object, canvas, fps }: MoveAnimate) => {
  if (direction === "Up") {
    object.pos[1] -= 8 / fps;

    if (object.pos[1] < -object.size) {
      object.pos[1] = canvas.height + object.size;
      object.pos[0] = Math.random() * canvas.width;
    }
  } else if (direction === "Down") {
    object.pos[1] += 8 / fps;

    if (object.pos[1] > canvas.height + object.size) {
      object.pos[1] = object.size;
      object.pos[0] = Math.random() * canvas.width;
    }
  }
};

const createCanvasObject = ({
  canvas,
  size,
  direction,
  minSize,
}: CreateObject): ICanvasObject => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  let object: ICanvasObject = {
    initPos: [x, y],
    pos: [x, y],
    rgba: [145, 145, 145, 0],
    direction,
    transitions: {
      opacity: {
        name: Math.random() < 0.5 ? "show" : "hide",
        range: [0.05, 0.25],
      },
      sway: { name: Math.random() < 0.5 ? "left" : "right" },
    },
    size: Math.random() * size,
  };

  object.rgba[3] = Math.random() * object.transitions.opacity.range[1];
  if (object.size < minSize) object.size = minSize;

  return object;
};

const getAmounts = (props: IParticlesProps): IParticlesProps["amount"] => {
  if (props.amountBreakpoints) {
    const entries = Object.entries(props.amountBreakpoints).sort(
      (a, b) => parseInt(b[0]) - parseInt(a[0])
    );

    for (let entry of entries) {
      if (window.matchMedia(`(min-width: ${entry[0]}px)`).matches) {
        return entry[1];
      }
    }
  }

  return props.amount;
};

const draw = ({ ctx, fps, preset, direction, objects }: IDraw) => {
  const canvas = ctx.canvas;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < objects.length; i++) {
    const [x, y] = objects[i].pos;
    let [r, g, b, a] = objects[i].rgba;
    let object = objects[i];

    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    opacityAnimate(object, fps);
    swayAnimate(object, fps);
    moveAnimate({ direction, object, canvas, fps });
    ctx.beginPath();

    if (preset === "Triangle") {
      ctx.moveTo(x, y);
      ctx.lineTo(x - 0.6 * object.size, y + object.size);
      ctx.lineTo(x + 0.6 * object.size, y + object.size);
    }

    if (preset === "Circle") {
      ctx.beginPath();
      ctx.arc(x, y, object.size, 0, 2 * Math.PI);
    }

    ctx.fill();
  }
};

export const Particles: FC<IParticlesProps> = memo((props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [init, setInit] = useState<boolean>(false);
  const canvasResizeTimeout = useRef<any>(null);
  let objects = useRef<ICanvasObject[] | null>(null);

  // Update draw loop
  useEffect(() => {
    if (canvasRef.current && init && objects.current) {
      const ctx = canvasRef.current.getContext("2d")!;
      const update = setInterval(
        () => draw({ ctx, objects: objects.current!, ...props }),
        1000 / props.fps
      );

      return () => clearInterval(update);
    }
    return;
  }, [objects, canvasRef, init]);

  // Initialize
  useEffect(() => {
    if (canvasRef.current && !init) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      let newObjects: ICanvasObject[] = [];
      for (let i = 0; i < getAmounts(props); i++) {
        newObjects.push(
          createCanvasObject({
            canvas,
            ...props,
          })
        );
      }

      objects.current = newObjects;
      setInit(true);
    }
  }, [canvasRef, init]);

  // Resize canvas
  const resizeCanvas = () => {
    clearTimeout(canvasResizeTimeout.current);
    canvasResizeTimeout.current = setTimeout(() => setInit(false), 250);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", () => resizeCanvas);
    };
  }, []);

  return (
    <canvas
      aria-label="Particle Background"
      ref={canvasRef}
      className={canvasStyle}
    />
  );
});
