import { FC } from "react";
import { css } from "goober";
import { Project } from "../../types";

const tip = css`
  font-size: 1rem;
  z-index: 2;
  left: 100px;
  bottom: 40px;
  white-space: pre;
  color: rgba(255, 215, 0, 1);
  position: absolute;
  animation: animateH5 1.5s infinite;
  pointer-events: none;
  @media (max-width: 515px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 200px;
  }
`;

const fadeOut = css`
  animation: fadeTextOut 1s forwards;
`;

interface ISwiperReminder {
  projects: Project[];
  showTip: boolean;
}

export const SwiperReminder: FC<ISwiperReminder> = ({ projects, showTip }) => {
  if (!sessionStorage.getItem("hideH5") && projects.length > 1) {
    return (
      <h5 onAnimationEnd={() => sessionStorage.setItem("hideH5", "true")} className={`${tip} ${!showTip && fadeOut}`}>
        Swipe/drag for at tjekke andre projekter
      </h5>
    );
  } else return null;
};
