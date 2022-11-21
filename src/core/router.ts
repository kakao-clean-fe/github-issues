interface Page {
  path: string;
  file: string;
}

export default class Router {
  path: string;
  page: Page;

  constructor (){
    this.path = window.location.pathname;
    this.page = this.pages.filter(page => page.path === this.path)[0];

    this.created();
    this.importPage(this.page.file);
  }

  created() {}

  // 메인 페이지에서만 정의해야한다.
  get pages(): Page[] {
    return [];
  }

  private importPage (fileName) {
    const PAGE_PREFIX = '../page';
    const url = `${PAGE_PREFIX}/page-${fileName}.js`;

    import(url).then((module) => {
      module.render();
    })
  }
}