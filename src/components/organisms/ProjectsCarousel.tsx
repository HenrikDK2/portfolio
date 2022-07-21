/* eslint-disable react-hooks/exhaustive-deps */
import "swiper/css";
import React, { FC, useEffect, useRef, useState } from "react";
import { ICarousel, ProjectArray } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import ISwiper from "swiper/types/swiper-class";
import { Modal } from "./Modal";
import { PrimaryButton } from "../atoms/Buttons";
import { Image } from "../molecules/Image";
import { css, styled } from "goober";
import { SwiperReminder } from "../atoms/SwiperReminder";
import exitSvg from "../../assets/exit.svg";

interface IProjectsCarouselProps {
  carousel: ICarousel;
  setCarousel: React.Dispatch<ICarousel>;
  projects: ProjectArray;
}

const SlideLink = styled(PrimaryButton)`
  position: absolute;
  font-size: 1.5rem;
  right: 2rem;
  bottom: 50px;
  text-decoration: none;
  text-align: center;
  @media (max-width: 500px) {
    box-sizing: border-box;
    padding: 14px 0;
    margin: 0 !important;
    width: calc(100% - 64px);
    right: 50%;
    &,
    &:hover {
      transform: translateX(50%);
    }
  }
`;

const SlideContentContainer = styled("div")`
  position: absolute;
  height: 100%;
  color: #fff;
  top: 0;
  user-select: none;
  padding: 2rem;
  display: flex;
  cursor: pointer;
  justify-content: start;
  align-items: start;
  text-align: left;
  flex-direction: column;
  left: 0;
  box-sizing: border-box;

  p {
    font-size: 1.25rem;
    @media (max-height: 650px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 515px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    a {
      margin: auto auto 100px auto;
    }
  }
`;

const SlideHeading = styled("h3")`
  font-size: 3rem;
  margin: 30px 0 30px;
  @media (max-width: 515px) {
    margin-top: 74px;
    text-align: center;
    font-size: 11vw;
  }
`;

const modalExitStyle = css`
  animation: fadeOut 0.5s ease forwards;
  pointer-events: none;
`;

const projectImage = css`
  width: calc(100% + 3px);
  height: 100%;
  filter: brightness(30%) blur(1px);
`;

const exitModalStyle = css`
  width: 40px;
  cursor: pointer;
  position: absolute;
  top: 32px;
  display: none;
  z-index: 2;
  left: 20px;

  @media (max-width: 515px) {
    display: block;
  }
`;

const ModalWrapper = styled("div")`
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const modalStyle = css`
  width: 100vw;
  height: 100vh;
  outline: none;
  position: relative;
  font-size: 1.1rem;
  .swiper {
    height: 100%;
  }

  @media (min-width: 515px) {
    font-size: 1rem;
    max-width: 800px;
    max-height: 515px;
  }
`;

const a11y = {
  prevSlideMessage: "Forudgårende slide",
  nextSlideMessage: "Næste slide",
};

const handleSlideTransitionChange = (e: ISwiper) => {
  const slide = e.el.querySelectorAll(".swiper-slide")[
    e.activeIndex
  ] as HTMLDivElement;
  slide.focus();
};

const handleOnKeyDown = (
  e: React.KeyboardEvent<HTMLElement>,
  setExitModal: React.Dispatch<boolean>,
  swiper: ISwiper
) => {
  if (e.code === "Escape") setExitModal(true);
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    swiper.slideNext();
  }
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    swiper.slidePrev();
  }
};

export const ProjectsCarousel: FC<IProjectsCarouselProps> = ({
  carousel,
  setCarousel,
  projects,
}) => {
  const swiperRef = useRef<ISwiper | null>();
  const [showTip, setShowTip] = useState<boolean>(true);
  const [exitModal, setExitModal] = useState<boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      swiperRef?.current?.el &&
      !swiperRef.current.el.contains(e.target as Node)
    ) {
      document.documentElement.style.overflowY = "scroll";
      setExitModal(true);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (carousel.show) document.documentElement.style.overflowY = "hidden";
  }, [carousel]);

  return (
    <Modal
      HTMLProps={{
        className: exitModal ? `${modalStyle} ${modalExitStyle}` : modalStyle,
        onAnimationEnd: (e) => {
          if (e.animationName === "fadeOut") {
            setExitModal(false);
            swiperRef.current = null;
            setCarousel({ ...carousel, show: false });
          }
        },
      }}
      isOpen={carousel.show}
      returnFocus={
        window.innerWidth > 550
          ? document.getElementById("alle-button") || undefined
          : undefined
      }
      preventScrollToFocus={true}
    >
      <ModalWrapper>
        <Image
          containerClassName={exitModalStyle}
          src={exitSvg}
          onClick={() => setExitModal(true)}
          alt="Tryk her for at lukke projekt fremviseren"
        />
        <SwiperReminder showTip={showTip} projects={projects} />
        <Swiper
          a11y={a11y}
          initialSlide={carousel.index}
          loop
          onSlideChangeTransitionEnd={handleSlideTransitionChange}
          onSlideChangeTransitionStart={(e) => {
            if (e.realIndex !== carousel.index && showTip) setShowTip(false);
          }}
          onSwiper={(e) => (swiperRef.current = e)}
        >
          {projects.map(({ title, src, alt, paragraphs, href, button }) => (
            <SwiperSlide
              onKeyDown={(e) =>
                swiperRef.current &&
                handleOnKeyDown(e, setExitModal, swiperRef.current)
              }
              tabIndex={0}
              tag="article"
            >
              <Image containerClassName={projectImage} src={src} alt={alt} />
              <SlideContentContainer>
                <SlideHeading>{title}</SlideHeading>
                {paragraphs.map((e) => (
                  <p>{e}</p>
                ))}

                <SlideLink
                  as={"a"}
                  /*@ts-ignore*/
                  href={href}
                >
                  {button ?? "Tjek hjemmeside"}
                </SlideLink>
              </SlideContentContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </ModalWrapper>
    </Modal>
  );
};
