import { FC, memo } from "react";
import { styled } from "goober";
import { Divider } from "../atoms/Divider";
import { ContactNotice } from "../molecules/ContactNotice";
import { Form } from "../molecules/Form";
import { Particles } from "../atoms/Particles";

const Section = styled("section")`
  position: relative;
  padding: 300px 0 400px;
  @media (max-width: 515px) {
    padding: 0px 0 200px;
  }
`;

const ContentSection = styled("section")`
  display: flex;
  justify-content: space-around;
  max-width: 1515px;
  margin: 0 auto;
  & article {
    margin: 200px 0 0;
  }
  @media (max-width: 1090px) {
    flex-direction: column-reverse;
    align-items: center;
  }
  @media (max-width: 515px) {
    & article {
      margin: 100px 0 100px 0;
    }
  }
`;

export const Contact: FC = memo(() => (
  <Section>
    <Particles
      amount={30}
      direction="Down"
      fps={24}
      minSize={20}
      preset="Triangle"
      size={50}
      amountBreakpoints={{ 500: 50, 1200: 70, 1920: 90 }}
    />
    <Divider top={true} />
    <ContentSection>
      <Form />
      <ContactNotice />
    </ContentSection>
  </Section>
));
