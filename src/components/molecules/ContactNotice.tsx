import { css, styled } from "goober";
import { PrimaryButton } from "../atoms/Buttons";
import { LineHeading } from "../atoms/LineHeading";
import { useInView } from "react-intersection-observer";

const articleStyle = css`
  max-width: 430px;
  padding: 0 1rem;
  opacity: 0;
  & h2 {
    white-space: pre;
    margin: 0 0 33px 0;
    font-size: 3rem;
    font-weight: 400;
  }
  & p {
    font-size: 1.125rem;
    color: #464646;
    font-weight: 500;
  }
  & button {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 40px auto 0;
  }
  @media (max-width: 515px) {
    & h2 {
      font-size: 10vw;
    }
  }
`;

const PrimaryLink = styled(PrimaryButton)`
  text-decoration: none;
  text-align: center;
  max-width: fit-content;
  font-size: 1.5rem;
`;

const inViewStyle = css`
  animation: fadeUp 1s forwards;
`;

const intersectOptions = {
  triggerOnce: true,
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

export const ContactNotice = () => {
  const [intersectRef, inView] = useInView(intersectOptions);

  return (
    <article
      id="contact"
      ref={intersectRef}
      className={`${articleStyle} ${inView && inViewStyle}`}
    >
      <LineHeading>Før du kontakter mig</LineHeading>
      <p>
        Hvis du vil kontakte mig angående en hjemmeside kræver jeg at du har en
        god ide af hvordan din hjemmeside skal se ud. Det kan være nogle
        billeder om designet. Det kan være elementer taget ude af en hjemmeside,
        eller en XD/Figma fil med designet vil være optimal.{" "}
      </p>
      {/*@ts-ignore */}
      <PrimaryLink as="a" href="/CV.pdf" download="cv">
        Download mit CV
      </PrimaryLink>
    </article>
  );
};
