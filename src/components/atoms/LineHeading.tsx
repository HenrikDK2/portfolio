import { styled } from "goober";

export const LineHeading = styled("h2")`
  font-size: 4rem;
  font-weight: 500;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    width: 100%;
    position: absolute;
    transform: translateX(-50%);
    height: 3px;
    bottom: -12px;
    left: 50%;
    background-color: var(--primary);
  }
`;
