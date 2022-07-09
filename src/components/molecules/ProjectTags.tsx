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

const projects: ProjectArray = data;

const allTags = [...new Set(projects.map((e) => e.tags).flat())];

interface IProjectTagsProps {
  tags: Tags;
  shuffleInstance: Shuffle | null;
  setTags: Dispatch<Tags>;
  defaultTag: string;
}

interface IClickHandler {
  e: React.MouseEvent<HTMLButtonElement>;
  tag: string;
}

export const ProjectTags: FC<IProjectTagsProps> = ({
  tags,
  setTags,
  shuffleInstance,
  defaultTag,
}) => {
  const clickHandler = useCallback(
    ({ e, tag }: IClickHandler) => {
      e.preventDefault();

      if (tag === defaultTag) {
        setTags([defaultTag]);
        shuffleInstance?.filter();
        return;
      }

      if (tags.includes(defaultTag)) {
        setTags([tag]);
        shuffleInstance?.filter(tag);
        return;
      }

      if (tags.includes(tag)) {
        const newTags = tags.filter((e) => e !== tag);
        setTags(newTags.length > 0 ? newTags : [defaultTag]);
        shuffleInstance?.filter(
          newTags.length > 0 ? newTags : Shuffle.ALL_ITEMS
        );
        return;
      } else {
        const newTags = [...tags, tag];
        setTags([...tags, tag]);
        shuffleInstance?.filter(newTags);
      }
    },
    [tags, shuffleInstance, defaultTag, setTags]
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
