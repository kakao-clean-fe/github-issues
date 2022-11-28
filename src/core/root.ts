import { convertTemplateToElement, getElement } from "../utils/element";
import Component from "./component";

interface Page {
  path: string;
  file: string;
}

export default class Root{
  $target: HTMLElement;
  $root: HTMLElement;
  path: string;
  page: Page;

  constructor ($target){
    this.$target = $target;
    this.$root;
    this.path;
    this.page;

    this.created();
    this.renderHeader();
    this.draw();
    this.renderFooter();
    this.mounted();
    this.updateURL(window.location.pathname);
    this.renderPage(this.path);
  }

  get Header (): Component | null {
    return null;
  }

  get Footer (): Component | null {
    return null;
  }

  get pages(): Page[] {
    return [];
  }

  get template () {
    return '<div id="page"></div>';
  }

  created () {}
  mounted () {}
  renderHeader () {
    if(this.Header) {
      this.Header.render()
    }
  }
  renderFooter () {
    if(this.Footer) {
      new this.Footer.render()
    }
  }

  renderPage (path) {
    const PAGE_PREFIX = '../page';

    this.updateURL(path);
    this.clearRoot();
    this.importPage(`${PAGE_PREFIX}/page-${this.page.file}.js`);
  }
  private importPage (url) {
    (async () => {
      const { default: Component} = await import(url);
      Component.getInstance(this.$root).render();
    })();
  }
  private clearRoot () {
    this.$root.innerHTML = '';
  }
  private updateURL (path) {
    this.path = path;
    this.page = this.pages.filter(page => page.path === this.path)[0];
  }
  private draw () {
    this.$root = convertTemplateToElement(this.template) as HTMLElement;
    this.$target.appendChild(this.$root);
  };
}