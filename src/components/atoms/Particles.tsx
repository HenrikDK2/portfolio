import { FC, memo } from "react";
import { css } from "goober";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadTriangleShape } from "tsparticles-shape-polygon";
import { Engine } from "tsparticles-engine";
import Particles, { IParticlesParams } from "preact-particles";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

const particleBg = css`
  height: 100%;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  z-index: -1;
  width: 100vw;
`;

const particlesInit = async (engine: Engine) => {
  await loadOutModesUpdater(engine);
  await loadCircleShape(engine);
  await loadBaseMover(engine);
  await loadColorUpdater(engine);
  await loadOpacityUpdater(engine);
  await loadTriangleShape(engine);
};

const circleParams: IParticlesParams["params"] = {
  fpsLimit: 30,
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    size: {
      value: 27.620603391810075,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    color: {
      value: "#919191",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      random: true,
      value: 0.2,
      anim: {
        enable: true,
        speed: 0.2,
      },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "top",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
};

const triangleParams: IParticlesParams["params"] = {
  fpsLimit: 30,
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    size: {
      value: 27.620603391810075,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    color: {
      value: "#919191",
    },
    shape: {
      type: "triangle",
    },
    opacity: {
      random: true,
      value: 0.2,
      anim: {
        enable: true,
        speed: 0.2,
      },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
};

interface IProps {
  id: string;
  preset: "Triangle" | "Circle";
}

export const TSParticles: FC<IProps> = memo(({ id, preset }) => (
  <Particles
    key={id}
    id={id}
    className={particleBg}
    options={preset === "Triangle" ? triangleParams : circleParams}
    init={particlesInit}
  />
));

export default TSParticles;
