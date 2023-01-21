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
    this.renderLayout(true);

    const resizeEvent = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.renderLayout();
      }, 50);
    };
    window.addEventListener("resize", () => resizeEvent());
  }

  renderLayout(disableTransition?: boolean) {
    this.calcColumns();
    const { colHeight, colWidth, cols, gap } = this;
    const filteredItems = this.getFilteredItems();
    const position = (index: number) => {
      const x = colWidth * (index % cols) + gap * (index % cols);
      const y = colHeight * Math.floor(index / cols) + gap * Math.floor(index / cols);
      return { x, y };
    };

    filteredItems.forEach((el, index) => {
      const { x, y } = position(index);
      if (disableTransition) {
        el.style.transition = "none";
      } else {
        el.style.transition = "all .4s ease";
      }
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  getFilteredItems(): HTMLElement[] {
    return this.items.filter((el) => el.getAttribute("aria-hidden") === "false");
  }

  hideItem(el: HTMLElement) {
    el.setAttribute("aria-hidden", "true");
    el.style.transition = "all .4s ease";
    el.style.transform = el.style.transform + " scale(0)";
    el.style.opacity = "0";
    el.tabIndex = -1;
  }

  showItem(el: HTMLElement) {
    el.setAttribute("aria-hidden", "false");
    el.style.opacity = "1";
    el.tabIndex = 0;
  }

  filter(projects: Project[], tags: Tags): Project[] {
    if (tags.includes(defaultTag)) {
      for (const el of this.items) this.showItem(el);
      this.renderLayout();
      return projects;
    }

    projects = data.filter((project) => {
      const el = this.items.find((e) => e.querySelector("h2")?.textContent === project.title)!;
      const elTags = el.getAttribute("data-tags")?.split(",");

      for (const tag of tags) {
        if (!elTags?.includes(tag)) {
          this.hideItem(el);
          return false;
        }
      }

      this.showItem(el);
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
    let rows = Math.ceil(items.length / cols);
    let gapSize = (rows - 1) * gap;
    return colHeight * rows + gapSize;
  }

  calcColumns() {
    for (let i = this.maxColumns; i > 0; i--) {
      this.cols = i;
      if (this.calcWidth() <= window.innerWidth) break;
    }

    this.resizeContainer();
  }
}
