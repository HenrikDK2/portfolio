import { css, styled } from "goober";
import React, { FC } from "react";
import fullscreenImage from "../../images/fullscreenImage.jpg";
import fullscreenImageLaptop from "../../images/fullscreenImageLaptop.jpg";
import fullscreenImageMobile from "../../images/fullscreenImageMobile.jpg";
import { PrimaryButton } from "../atoms/Buttons";

interface IHeroProps {
  init: boolean;
  setInit: React.Dispatch<boolean>;
}

const Section = styled("section")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const ImageContainer = styled("div")`
  position: absolute;
  height: 100vh;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

const Heading = styled("h1")`
  font-size: 3rem;
  z-index: 1;
  white-space: pre;
  opacity: 0;
  text-align: center;
  color: #fff;
  padding: 0 1rem;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 3px;
    margin: 28px auto 0;
    background-color: var(--primary);
  }

  span {
    white-space: pre-line;
    display: block;
  }

  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }

  @media (max-width: 860px) {
    font-size: 4.5vw;
  }

  @media (max-width: 515px) {
    white-space: pre-line;
    font-size: 2rem;
  }

  @media (max-width: 400px) {
    span {
      white-space: pre-wrap;
    }
  }
`;

const contactBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export const Hero: FC<IHeroProps> = ({ init, setInit }) => {
  const headingAnimStyle = css`
    animation: ${init ? "slideDownFade" : ""} 1s forwards 0.3s;
    &::after {
      animation: ${init ? "middleLineOut" : ""} 0.3s forwards 1.4s;
    }
  `;

  const btnAnimStyle = css`
    opacity: 0;
    animation: ${init ? "fadeIn" : ""} 2s forwards 1.85s;
  `;

  return (
    <Section>
      <Heading className={headingAnimStyle}>
        Front-end Webudvikler fra København
        <span>med passion for nye teknologier</span>
      </Heading>
      <ImageContainer>
        <picture>
          <source srcSet={fullscreenImage} media="(min-width:1920px)" />
          <source srcSet={fullscreenImageLaptop} media="(min-width:600px)" />
          <img
            onDragStart={(e) => e.preventDefault()}
            loading="lazy"
            onLoad={() => setInit(true)}
            src={fullscreenImageMobile}
            alt="Hero billed for min Webudvikler Portfolio lavede i React"
          />
        </picture>
      </ImageContainer>
      <PrimaryButton className={btnAnimStyle} onClick={contactBtnHandler}>
        Kontakt mig
      </PrimaryButton>
    </Section>
  );
};
