import { styled } from "goober";
import React from "react";

interface PreloaderProps {
  children?: React.ReactNode;
}

const PreloaderElm = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  height: 200vh;
  width: 200vw;
  z-index: 99999999999999;
  background-color: #fff;
`;

export const Preloader: React.FC<PreloaderProps> = () => <PreloaderElm />;
