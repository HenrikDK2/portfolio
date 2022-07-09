export interface ICarousel {
  show: boolean;
  index: number;
}

export type Project = {
  title: string;
  paragraphs: string[];
  alt: string;
  src: string;
  tags: string[];
  href: string;
  button?: string;
};

export interface IInit {
  playAnim: boolean;
  preload: boolean;
}

export type SkillArray = Array<{ src: string; alt: string }>;

export type ProjectArray = Array<Project>;

export type Tags = string[];
