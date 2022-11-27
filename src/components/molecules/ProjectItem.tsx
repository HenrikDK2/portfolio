import { FC, Dispatch, useLayoutEffect, useState } from "react";
import { styled, css } from "goober";
import { Image } from "./Image";
import { ICarousel, Project } from "../../types";

interface IProjectItemProps {
  setCarousel: Dispatch<ICarousel>;
  carousel: ICarousel;
  i: number;
}

const Item = styled("li")`
  position: absolute;
  user-select: none;
  width: 350px;
  height: 200px;

  & > div {
    overflow: hidden;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
  }

  & > div img {
    transition: all 0.75s;
  }

  &:hover,
  &:focus {
    & > div::after {
      opacity: 0.75;
    }
    & > h2 {
      opacity: 1;
    }

    & > div img {
      transform: scale(1.2);
      filter: brightness(50%);
    }
  }
`;

const Heading = styled("h2")`
  font-size: 2.25rem;
  white-space: pre;
  font-weight: 700;
  pointer-events: none;
  color: #fff;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  transition: opacity 0.75s;
  opacity: 0;
  margin: 0;
  top: 50%;
  z-index: 2;
  &::after {
    width: 20%;
  }
`;

const gridItemPhone = css`
  & > div::after {
    opacity: 0.75;
  }
  & > h2 {
    opacity: 1;
  }

  & > div img {
    transform: scale(1.2);
    filter: brightness(50%);
  }
`;

export const ProjectItem: FC<IProjectItemProps & Project> = ({ setCarousel, carousel, title, src, alt, tags, i }) => {
  const [phoneMode, setPhoneMode] = useState<boolean>(window.innerWidth <= 500 || false);

  useLayoutEffect(() => {
    const updateFunction = () => {
      const innerWidth = window.innerWidth;
      if (phoneMode && innerWidth > 500) setPhoneMode(false);
      if (!phoneMode && innerWidth < 500) setPhoneMode(true);
    };

    window.addEventListener("resize", updateFunction, { passive: true });
    return () => window.removeEventListener("resize", updateFunction);
  }, [phoneMode]);

  return (
    <Item
      className={`project-item ${phoneMode && gridItemPhone}`}
      key={title}
      tabIndex={0}
      data-tags={tags}
      aria-hidden="false"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !carousel.show) {
          setCarousel({ index: i, show: true });
        }
      }}
      onClick={() => {
        if (!carousel.show) {
          setCarousel({ index: i, show: true });
        }
      }}
    >
      <Heading>{title}</Heading>
      <Image lazy={false} src={src} alt={alt} />
    </Item>
  );
};
