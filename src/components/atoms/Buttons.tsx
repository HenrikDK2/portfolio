import { styled } from "goober";

export const PrimaryButton = styled("button")`
  background-color: var(--primary);
  color: #fff;
  border: none;
  font-weight: 700;
  padding: 14px 36px;
  font-size: 2.25rem;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  white-space: pre;
  transition: all 0.1s;
  position: static;
  z-index: 1;
  cursor: pointer;
  transition: opacity 0.5s;

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
