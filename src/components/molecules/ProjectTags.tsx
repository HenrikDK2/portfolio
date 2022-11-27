import { FC, Dispatch, useCallback } from "react";
import { css, styled } from "goober";
import data from "../../data/projects.json";
import { Project, Tags } from "../../types";
import { GridLayout } from "../../utils/gridLayout";

const GridCategories = styled("ul")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
  list-style: none;
  padding: 0;
  & li > a {
    transition: all 0.5s;
    cursor: pointer;
    padding: 5px 10px;
  }
  & li:not(:last-of-type)::after {
    content: "/";
    margin: 0 5px;
  }
  @media (max-width: 515px) {
    margin: 0 0 2rem 0;
  }
`;

const TagButton = styled("button")`
  border: none;
  background: none;
  transition: all 0.5s ease 0s;
  cursor: pointer;
  font-family: "Roboto";
  padding: 5px 10px;
  user-select: none;
  font-size: 1rem;
  @media (min-width: 515px) {
    &:hover {
      box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.3);
    }
  }
`;

const activeTagStyle = css`
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.3);
`;

const projects: Project[] = data;

const allTags = [...new Set(projects.map((e) => e.tags).flat())];

interface IProjectTagsProps {
  tags: Tags;
  gridInstance: GridLayout | undefined;
  setProjects: React.Dispatch<Project[]>;
  setTags: Dispatch<Tags>;
  defaultTag: string;
}

interface IClickHandler {
  e: React.MouseEvent<HTMLButtonElement>;
  tag: string;
}

export const ProjectTags: FC<IProjectTagsProps> = ({ tags, setTags, defaultTag, gridInstance, setProjects }) => {
  const clickHandler = useCallback(
    ({ e, tag }: IClickHandler) => {
      e.preventDefault();
      if (tag === defaultTag) {
        setTags([defaultTag]);
        setProjects(gridInstance!.filter(projects, [defaultTag]));
        return;
      }

      if (tags.includes(defaultTag)) {
        setTags([tag]);
        setProjects(gridInstance!.filter(projects, [tag]));
        return;
      }

      if (tags.includes(tag)) {
        const filterTags = tags.filter((e) => e !== tag);
        const newTags = filterTags.length > 0 ? filterTags : [defaultTag];
        setTags(newTags);
        setProjects(gridInstance!.filter(projects, newTags));
        return;
      } else {
        const newTags = [...tags, tag];
        //@ts-ignore
        setTags(newTags);
        setProjects(gridInstance!.filter(projects, newTags));
      }
    },
    [tags, defaultTag, setTags, gridInstance, setProjects]
  );

  return (
    <GridCategories>
      {[defaultTag, ...allTags].map((tag) => (
        <li key={tag}>
          <TagButton
            id={tag.toLowerCase() + "-button"}
            className={tags.includes(tag) ? activeTagStyle : undefined}
            onClick={(e) => clickHandler({ e, tag })}
          >
            {tag}
          </TagButton>
        </li>
      ))}
    </GridCategories>
  );
};
