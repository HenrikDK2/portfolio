import { FC, Dispatch, useCallback } from "react";
import { css, styled } from "goober";
import data from "../../data/projects.json";
import { ProjectArray, Tags } from "../../types";
import Shuffle from "shufflejs";

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
  font-family: var(--mainFont);
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

const filterProjectsTags = (newTags: Tags): ProjectArray => {
  return projects.filter((e) => {
    for (const tag of newTags) {
      if (!e.tags.includes(tag)) return false;
    }
    return true;
  });
};

const projects: ProjectArray = data;

const allTags = [...new Set(projects.map((e) => e.tags).flat())];

interface IProjectTagsProps {
  tags: Tags;
  shuffleInstance: Shuffle | null;
  setTags: Dispatch<Tags>;
  setFilteredProjects: Dispatch<ProjectArray>;
  defaultTag: string;
}

interface IClickHandler {
  e: React.MouseEvent<HTMLButtonElement>;
  tag: string;
}

export const ProjectTags: FC<IProjectTagsProps> = ({
  tags,
  setTags,
  setFilteredProjects,
  shuffleInstance,
  defaultTag,
}) => {
  const clickHandler = useCallback(
    ({ e, tag }: IClickHandler) => {
      e.preventDefault();

      if (tag === defaultTag) {
        setTags([defaultTag]);
        setFilteredProjects(projects);
        shuffleInstance?.filter();
        return;
      }

      if (tags.includes(defaultTag)) {
        setTags([tag]);
        setFilteredProjects(projects.filter((e) => e.tags.includes(tag)));
        shuffleInstance?.filter(tag);
        return;
      }

      if (tags.includes(tag)) {
        const newTags = tags.filter((e) => e !== tag);
        setTags(newTags.length > 0 ? newTags : [defaultTag]);
        setFilteredProjects(filterProjectsTags(newTags));
        shuffleInstance?.filter(
          newTags.length > 0 ? newTags : Shuffle.ALL_ITEMS
        );
        return;
      } else {
        const newTags = [...tags, tag];
        const newProjects = filterProjectsTags(newTags);

        //@ts-ignore
        if (newProjects) setFilteredProjects(newProjects);
        setTags(newTags);
        shuffleInstance?.filter((e) => {
          for (const tag of newTags) {
            if (!e.getAttribute("data-groups")!.includes(tag)) {
              return false;
            }
          }
          return true;
        });
      }
    },
    [tags, shuffleInstance, defaultTag, setTags, setFilteredProjects]
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
