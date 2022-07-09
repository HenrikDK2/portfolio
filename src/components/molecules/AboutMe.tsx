import { FC } from "react";
import { css, styled } from "goober";
import { FaHeart, FaBriefcase, FaBirthdayCake } from "react-icons/fa";
import useObserver from "preact-intersection-observer";

type StrDate = `${number}-${number}-${number}`;

const TableBody = styled("tbody")`
  display: flex;
  margin: 30px 0 0 0px;
  width: 100%;
  align-items: center;
  font-size: 2.25rem;
  justify-content: center;

  @media (max-width: 630px) {
    font-size: 5vw;
  }

  @media (max-width: 515px) {
    transform: translateX(-50%);
    font-size: 2.25rem;
    flex-direction: column;
    width: 100px;
    align-items: flex-start;
  }
  & tr {
    display: flex;
    white-space: pre;
  }
`;

const MiddleTr = styled("tr")`
  margin: 0 50px;
  @media (max-width: 515px) {
    position: relative;
    margin: 0;
    &::after {
      content: "";
      width: 2px;
      position: absolute;
      height: 300%;
      left: 58px;
      top: 50%;
      display: block;
      transform: translateY(-50%);
      background-color: #000;
    }
  }
`;

const Info = styled("p")`
  max-width: 495px;
  font-size: 1.5rem;
  margin: 15px 0;
  @media (max-width: 411px) {
    font-size: 6vw;
  }
`;

const firstInfo = css`
  position: relative;
  &::before {
    content: "";
    width: 100%;
    position: absolute;
    transform: translateX(-50%);
    height: 3px;
    top: -35px;
    left: 50%;
    background-color: var(--primary);
  }
`;

const lastInfo = css`
  position: relative;
  &::after {
    content: "";
    width: 125%;
    position: absolute;
    transform: translateX(-50%);
    height: 3px;
    bottom: -30px;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Heading = styled("h2")`
  font-size: 4rem;
  text-align: center;
  margin: 0 0 2rem 0;
  position: relative;
  white-space: pre;
  @media (max-width: 411px) {
    font-size: 16vw;
  }
`;

const TableData = styled("td")`
  position: relative;
  margin-left: 24px;
  &::after {
    content: "";
    width: 2px;
    position: absolute;
    height: 100%;
    left: -12px;
    top: 50%;
    display: block;
    transform: translateY(-50%);
    background-color: #000;
  }
  @media (max-width: 515px) {
    &::after {
      display: none;
    }
    margin-left: 40px;
  }
`;

const articleStyle = css`
  opacity: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 2rem;
`;

const inViewStyle = css`
  animation: fadeUp 1s forwards;
`;

const getAge = (birthDate: StrDate) =>
  Math.floor(
    ((new Date() as any) - new Date(birthDate).getTime()) / 3.15576e10
  );

const intersectOptions = {
  triggerOnce: true,
  threshold: window.innerWidth < 500 ? 0.15 : 0.2,
  rootMargin:
    window.innerWidth < 500 ? "0px 0px 0px 0px" : "0px 0px -200px 0px",
};

export const AboutMe: FC = () => {
  const [ref, inView] = useObserver(intersectOptions);

  return (
    <article
      id="aboutMe"
      ref={ref}
      className={`${articleStyle} ${inView && inViewStyle}`}
    >
      <Heading>Omkring mig</Heading>
      <Info className={firstInfo}>
        Hej mit navn er Henrik, og jeg er en frisk Front-end Webudvikler fra
        København.
      </Info>
      <Info>
        Jeg har altid været fascineret af programmering, og det har været en af
        mine mange hobbyer.
      </Info>
      <Info>
        Jeg er fra min hobby blevet uddannet med et stort drive for at forbedrer
        mig selv og lære nye teknologier.
      </Info>
      <Info>
        Jeg er ambitiøs om mine projekter, og prøver altid at udvikle mine
        hjemmesider smartere og bedre end før.
      </Info>
      <Info>
        Min portfolio hjemmeside er lavede i Preact, og mit mål er at opnå flere
        kompetencer, og at udvikle fede produkter.
      </Info>
      <Info className={lastInfo}>
        Jeg udvikler altid med fokus på semantik, ydeevne, tilgængelighed og
        responsive hjemmesider.
      </Info>
      <table>
        <TableBody>
          <tr>
            <td>
              <FaBirthdayCake aria-label="Fødselsdag" />
            </td>
            <TableData>{getAge("1999-10-11")}</TableData>
          </tr>
          <MiddleTr>
            <td>
              <FaBriefcase aria-label="Job" />
            </td>
            <TableData>Front-end</TableData>
          </MiddleTr>
          <tr>
            <td>
              <FaHeart aria-label="Passion" />
            </td>
            <TableData>Tech</TableData>
          </tr>
        </TableBody>
      </table>
    </article>
  );
};
