import { memo, useState, useEffect, useRef } from "react";
import { css, styled } from "goober";
import { LineHeading } from "../atoms/LineHeading";
import { ProjectArray, ICarousel, Tags } from "../../types";
import { ProjectTags } from "../molecules/ProjectTags";
import { ProjectItem } from "../molecules/ProjectItem";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { useObserver } from "preact-intersection-observer";
import data from "../../data/projects.json";
import Shuffle from "shufflejs";

const ProjectsSection = styled("section")`
  padding: 300px 0;
  position: relative;
  z-index: 2;
  background-color: #fff;

  @media (max-width: 1070px) {
    padding: 200px 0;
  }

  @media (max-width: 515px) {
    padding: 100px 0 100px;
  }
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  max-width: 1200px;
`;

const Heading = styled(LineHeading)`
  margin-bottom: 100px;
`;

const gridArticle = css`
  max-width: 1070px;
  opacity: 0;
  padding: 0 1rem;
  flex-direction: column;
  margin: 0 auto;
  display: flex;
  transition: 0.25s all;
  min-height: 838px;

  & > h2 {
    margin: 46px 0;
    width: max-content;
    align-self: center;
  }

  @media (max-width: 650px) {
    & > h2 {
      font-size: 10.5vw;
    }
  }
`;

const defaultTag = "Alle";

const inViewStyle = css`
  animation: fadeUp 1s forwards;
`;

const intersectOptions = {
  triggerOnce: true,
  threshold: window.innerWidth < 500 ? 0.0 : 0.2,
  rootMargin: "0px 0px -250px 0px",
};

const projects: ProjectArray = data;

export const Projects: React.FC = memo(() => {
  const listRef = useRef<HTMLUListElement>(null);
  const shuffleInstance = useRef<Shuffle | null>(null);
  const [ref, inView] = useObserver<HTMLElement>(intersectOptions);
  const [tags, setTags] = useState<Tags>([defaultTag]);
  const [carousel, setCarousel] = useState<ICarousel>({
    show: false,
    index: 0,
  });

  useEffect(() => {
    if (listRef.current && shuffleInstance.current === null) {
      shuffleInstance.current = new Shuffle(listRef.current, {
        itemSelector: ".project-item",
        gutterWidth: 10,
        isCentered: true,
      });
    }
  }, [listRef, shuffleInstance]);

  return (
    <ProjectsSection>
      <article
        id="projects"
        className={`${gridArticle} ${inView && inViewStyle}`}
        ref={ref}
      >
        <Heading>Mine Projekter</Heading>
        <ProjectTags
          shuffleInstance={shuffleInstance.current}
          defaultTag={defaultTag}
          tags={tags}
          setTags={setTags}
        />
        <ul className={listStyle} ref={listRef}>
          {projects?.map((data, i) => (
            <ProjectItem
              {...data}
              i={i}
              setCarousel={setCarousel}
              carousel={carousel}
            />
          ))}
        </ul>
      </article>
      <ProjectsCarousel
        carousel={carousel}
        setCarousel={setCarousel}
        projects={projects}
      />
    </ProjectsSection>
  );
});
