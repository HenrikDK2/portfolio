import { styled } from "goober";
import { FC, lazy, memo, Suspense } from "react";
import { AboutMe } from "../molecules/AboutMe";
import { Skills } from "../molecules/Skills";
import { Divider } from "../atoms/Divider";

const ParticlesComponent = lazy(() => import("../atoms/Particles"));

const Section = styled("section")`
  display: flex;
  padding: 300px 0 515px;
  position: relative;
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: flex-start;
  font-family: "Oswald", sans-serif;

  h1,
  h2 {
    font-weight: 400;
  }

  @media (max-width: 1050px) {
    align-items: center;
    flex-direction: column;
    padding: 100px 0 300px 0;
  }
  @media (max-width: 515px) {
    padding: 100px 0;
  }
`;

export const About: FC = memo(() => (
  <Section>
    <AboutMe />
    {window.innerWidth > 550 && (
      <Suspense>
        <ParticlesComponent preset="Circle" id="circle-tsparticles" />
      </Suspense>
    )}
    <Skills />
    <Divider />
  </Section>
));
