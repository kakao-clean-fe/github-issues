interface Page {
  path: string;
  file: string;
}

export const routerMixin = (superClass) => class extends superClass {
  path: string;
  page: Page;

  constructor (...args){
    super(...args);
  }

  pushState (path) {
    const url = `${location.origin}${path}`;
    history.pushState('', '', url);

    this.renderPage(path);
  }
}
