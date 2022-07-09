import { css, styled } from "goober";
import useObserver from "preact-intersection-observer";
import profilBilled from "../../images/profilBilled.jpg";
import { LineHeading } from "../atoms/LineHeading";
import { Image } from "./Image";
import { SkillArray } from "../../types";

// Images
import cssImage from "../../images/skills/css.png";
import reactImage from "../../images/skills/react.png";
import htmlImage from "../../images/skills/html.png";
import javascriptImage from "../../images/skills/javascript.png";
import gulpImage from "../../images/skills/gulp.png";
import webpackImage from "../../images/skills/webpack.png";
import rollupImage from "../../images/skills/rollup.png";
import sassImage from "../../images/skills/sass.png";
import gitImage from "../../images/skills/git.png";
import mysqlImage from "../../images/skills/mysql.png";
import graphqlImage from "../../images/skills/graphql.png";
import firebaseImage from "../../images/skills/firebase.png";
import photoshopImage from "../../images/skills/photoshop.jpg";
import gimpImage from "../../images/skills/gimp.png";
import nodejsImage from "../../images/skills/nodejs.png";
import vueImage from "../../images/skills/vue.png";
import gatsbyImage from "../../images/skills/gatsby.png";
import preactImage from "../../images/skills/preact.png";
import pwaImage from "../../images/skills/pwa.png";
import mongodb from "../../images/skills/mongodb.png";
import typescript from "../../images/skills/typescript.webp";
import nextjs from "../../images/skills/next.png";

const skillArray: SkillArray = [
  { src: htmlImage, alt: "HTML" },
  { src: cssImage, alt: "CSS" },
  { src: javascriptImage, alt: "Javascript" },
  { src: reactImage, alt: "React og React Native" },
  { src: gulpImage, alt: "Gulp" },
  { src: rollupImage, alt: "Rollup" },
  { src: sassImage, alt: "Sass" },
  { src: gitImage, alt: "Git" },
  { src: mysqlImage, alt: "MySql" },
  { src: graphqlImage, alt: "GraphQl" },
  { src: firebaseImage, alt: "Firebase" },
  { src: photoshopImage, alt: "Photoshop" },
  { src: gimpImage, alt: "Gimp" },
  { src: nodejsImage, alt: "NodeJs" },
  { src: typescript, alt: "Typescript" },
  { src: nextjs, alt: "Next.js" },
  { src: webpackImage, alt: "Webpack" },
  { src: vueImage, alt: "Vue" },
  { src: gatsbyImage, alt: "Gatsby" },
  { src: preactImage, alt: "Preact" },
  { src: pwaImage, alt: "Progressive Web App" },
  { src: mongodb, alt: "MongoDB" },
];

const imageContainerStyle = css`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 5px solid #fff;
  margin-left: 20px;

  & img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &::before {
    content: "";
    position: absolute;
    right: 0;
    width: 290px;
    height: 290px;
    border-radius: 50%;
    bottom: 0;
    z-index: -1;
    transform: translate(20%, 20%);
    background-color: var(--primary);
  }

  @media (max-width: 1050px) {
    margin-top: 200px;
  }

  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
    margin-left: 5%;

    &::before {
      width: 250px;
      height: 250px;
    }
  }

  @media (max-width: 430px) {
    margin-left: 3%;
  }

  @media (max-width: 400px) {
    margin-left: -5%;
  }
`;

const SkillsList = styled("ul")`
  display: grid;
  margin: 40px auto 0 auto;
  list-style: none;
  padding: 0;
  max-width: 380px;
  grid-template-columns: repeat(auto-fill, 60px);
  grid-auto-rows: 60px;
  grid-gap: 20px;

  @media (max-width: 500px) {
    box-sizing: border-box;
    padding: 0 5px;
    place-content: center;
    max-width: none;
  }
`;

const Heading = styled(LineHeading)`
  margin-top: 0;
  position: relative;
  white-space: pre;
  margin: 70px 0 0 0;

  @media (max-width: 500px) {
    font-size: 12vw;

    &::after {
      width: 80vw;
    }
  }
`;

const SkillItem = styled("li")`
  & div {
    width: auto;
    height: 100%;
  }

  & img {
    object-fit: contain;
  }
`;

const articleStyle = css`
  opacity: 0;
`;

const inViewStyle = css`
  animation: fadeUp 1s forwards;
`;

const intersectOptions = {
  triggerOnce: true,
  threshold: window.innerWidth < 500 ? 0.3 : 0.2,
  rootMargin:
    window.innerWidth < 500 ? "0px 0px 0px 0px" : "0px 0px -200px 0px",
};

export const Skills = () => {
  const [ref, inView] = useObserver(intersectOptions);

  return (
    <article className={`${articleStyle} ${inView && inViewStyle}`} ref={ref}>
      <Image
        containerClassName={imageContainerStyle}
        alt="Et billed af mig for mit Webudvikler Portfolio"
        src={profilBilled}
      />
      <Heading>Mine kompetencer</Heading>
      <SkillsList>
        {skillArray.map((e, i) => (
          <SkillItem title={e.alt} key={e + i.toString()}>
            <Image alt={e.alt} src={e.src} />
          </SkillItem>
        ))}
      </SkillsList>
    </article>
  );
};
