import { FC, HTMLProps } from "react";
import { css, styled } from "goober";

interface IImageProps {
  containerClassName?: string;
}

const containerStyle = css`
  * {
    user-select: none;
  }
  width: 50px;
`;

const Img = styled("img")`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const Image: FC<IImageProps & HTMLProps<HTMLImageElement>> = ({
  alt,
  src,
  className,
  containerClassName,
}) => (
  <div className={`${containerStyle} ${containerClassName}`}>
    <Img
      loading="lazy"
      onDragStart={(e) => e.preventDefault()}
      alt={alt}
      src={src}
      className={className}
    />
  </div>
);
