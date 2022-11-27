import { memo, useEffect, useRef, useState } from "react";
import { css, styled } from "goober";
import { LineHeading } from "../atoms/LineHeading";
import { Project, ICarousel, Tags } from "../../types";
import { ProjectTags } from "../molecules/ProjectTags";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { useInView } from "react-intersection-observer";
import unfilteredProjects from "../../data/projects.json";
import { GridLayout } from "../../utils/gridLayout";
import { ProjectItem } from "../molecules/ProjectItem";

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

const Heading = styled(LineHeading)`
  margin-bottom: 100px;
`;

const gridArticle = css`
  display: flex;
  flex-direction: column;
  min-height: 838px;
  max-width: 1070px;
  opacity: 0;
  padding: 0 1rem;
  margin: 0 auto;

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

const listStyle = css`
  list-style: none;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const inViewStyle = css`
  animation: fadeUp 1s forwards;
`;

const intersectOptions = {
  triggerOnce: true,
  threshold: window.innerWidth < 500 ? 0.0 : 0.2,
  rootMargin: "0px 0px -250px 0px",
};

export const defaultTag = "Alle";
export const Projects: React.FC = memo(() => {
  const listRef = useRef<HTMLUListElement>(null);
  const [gridInstance, setGridInstance] = useState<GridLayout>();
  const [projects, setProjects] = useState<Project[]>(unfilteredProjects);
  const [ref, inView] = useInView(intersectOptions);
  const [tags, setTags] = useState<Tags>([defaultTag]);
  const [carousel, setCarousel] = useState<ICarousel>({
    show: false,
    index: 0,
  });

  useEffect(() => {
    if (listRef.current && !gridInstance) {
      const instance = new GridLayout({ gap: 10, list: listRef.current, maxColumns: 3, itemSelector: ".project-item" });
      setGridInstance(instance);
    }
  }, [listRef, gridInstance]);

  return (
    <ProjectsSection>
      <article id="projects" className={`${gridArticle} ${inView && inViewStyle}`} ref={ref}>
        <Heading>Mine Projekter</Heading>
        <ProjectTags
          defaultTag={defaultTag}
          tags={tags}
          setTags={setTags}
          gridInstance={gridInstance}
          setProjects={setProjects}
        />
        <ul ref={listRef} className={listStyle}>
          {unfilteredProjects?.map((data) => (
            <ProjectItem
              {...data}
              i={projects.findIndex((e) => e.title === data.title)}
              setCarousel={setCarousel}
              carousel={carousel}
            />
          ))}
        </ul>
      </article>
      <ProjectsCarousel carousel={carousel} setCarousel={setCarousel} projects={projects} />
    </ProjectsSection>
  );
});
