import { styled } from "goober";
import { FC, memo } from "react";
import { AboutMe } from "../molecules/AboutMe";
import { Skills } from "../molecules/Skills";
import { Divider } from "../atoms/Divider";
import { Particles } from "../atoms/Particles";

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
      <Particles
        amount={30}
        direction="Up"
        fps={24}
        minSize={10}
        preset="Circle"
        size={35}
        amountBreakpoints={{ 500: 50, 1200: 70, 1920: 90 }}
      />
    )}
    <Skills />
    <Divider />
  </Section>
));
