import { FC, HTMLProps } from "react";
import { css, styled } from "goober";

interface IImageProps {
  containerClassName?: string;
  lazy?: boolean;
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
  lazy = true,
}) => (
  <div className={`${containerStyle} ${containerClassName}`}>
    <Img
      loading={lazy ? "lazy" : undefined}
      onDragStart={(e) => e.preventDefault()}
      alt={alt}
      src={src}
      className={className}
    />
  </div>
);
