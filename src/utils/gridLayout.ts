import { defaultTag } from "../components/organisms/Projects";
import { Project, Tags } from "../types";
import data from "../data/projects.json";

interface GridLayoutProps {
  list: HTMLUListElement;
  maxColumns: number;
  itemSelector: string;
  gap: number;
}

export class GridLayout {
  list: HTMLUListElement;
  items: HTMLElement[];
  maxColumns: number;
  colHeight: number;
  colWidth: number;
  resizeTimeout: any;
  cols: number;
  gap: number;

  constructor({ list, maxColumns, gap, itemSelector }: GridLayoutProps) {
    const { clientWidth, clientHeight } = list.children[0];
    this.list = list;
    this.items = Array.from(document.querySelectorAll<HTMLElement>(itemSelector));
    this.maxColumns = maxColumns;
    this.gap = gap;
    this.cols = maxColumns;
    this.colWidth = clientWidth;
    this.colHeight = clientHeight;
    this.renderLayout();

    const resizeEvent = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.renderLayout();
      }, 50);
    };
    window.addEventListener("resize", () => resizeEvent());
  }

  renderLayout() {
    this.calcColumns();

    const { colHeight, colWidth, cols, gap } = this;
    const filteredItems = this.getFilteredItems();
    let rowMultiplier = 0;
    let gapMultiplier = 0;

    for (let i = 0; i < filteredItems.length; i++) {
      const el = filteredItems[i];
      const y = colHeight * rowMultiplier + gap * rowMultiplier;
      let x = colWidth * (i % cols) + gap * gapMultiplier;

      gapMultiplier += 1;

      if (i % cols === cols - 1) {
        rowMultiplier += 1;
        gapMultiplier = 0;
      }

      el.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  getFilteredItems(): HTMLElement[] {
    return this.items.filter((el) => el.getAttribute("aria-hidden") === "false");
  }

  filter(projects: Project[], tags: Tags): Project[] {
    if (tags.includes(defaultTag)) {
      for (const el of this.items) {
        el.setAttribute("aria-hidden", "false");
        el.style.opacity = "1";
      }

      this.renderLayout();
      return projects;
    }

    projects = data.filter((project) => {
      const el = this.items.find((e) => e.querySelector("h2")?.textContent === project.title)!;
      const elTags = el.getAttribute("data-tags")?.split(",");

      for (const tag of tags) {
        if (!elTags?.includes(tag)) {
          el.setAttribute("aria-hidden", "true");
          el.style.transform = el.style.transform + " scale(0)";
          el.style.opacity = "0";
          return false;
        }
      }

      el.setAttribute("aria-hidden", "false");
      el.style.opacity = "1";
      return true;
    });

    this.renderLayout();
    return projects;
  }

  resizeContainer() {
    this.list.style.width = this.calcWidth() + "px";
    this.list.style.height = this.calcHeight() + "px";
  }

  calcWidth() {
    const gutter = (this.cols - 1) * this.gap;
    return this.colWidth * this.cols + gutter;
  }

  calcHeight() {
    const { colHeight, cols, gap } = this;
    const items = this.getFilteredItems();
    let rowMultiplier = 0;
    let gapSize = Math.floor(items.length / cols) * gap;

    for (let i = 0; i < items.length; i++) {
      if (i % cols === cols - 1) rowMultiplier += 1;
    }

    if (cols > 1) rowMultiplier += 1;
    return colHeight * rowMultiplier + gapSize;
  }

  calcColumns() {
    for (let i = this.maxColumns; i > 0; i--) {
      this.cols = i;
      if (this.calcWidth() <= window.innerWidth) break;
    }

    this.resizeContainer();
  }
}
