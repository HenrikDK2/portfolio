import { FC } from "react";
import { css } from "goober";
import divider from "../../assets/divider.svg";

interface IDividerProps {
  className?: string;
  top?: boolean;
}

const dividerStyle = css`
  position: absolute;
  left: 50%;
  width: 100vw;
  user-select: none;
`;

const topStyle = css`
  top: 0;
  transform: translateX(-50%) rotate(180deg);
`;

const bottomStyle = css`
  bottom: 0;
  transform: translateX(-50%);
`;

export const Divider: FC<IDividerProps> = ({ className, top }) => (
  <img
    src={divider}
    className={`${dividerStyle} ${top ? topStyle : bottomStyle} ${className}`}
    alt="Section divider"
  />
);
