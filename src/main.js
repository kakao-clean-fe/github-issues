// Constants
import { mainSelector } from './constants/selector';

// Router
import Router from './router';

// Mock Server
import { worker } from './mocks/browser';

// Utils
import { findElement } from './utils/dom';
import { BASE_URL, navigate } from './utils/navigate';
class App {
  constructor(navbar) {
    navbar.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      const targetURL = e.target.href.replace(BASE_URL, '');
      navigate(targetURL);
    });
  }
}

window.onload = () => {
  // Running Mock Server
  worker.start({
    onUnhandledRequest: 'bypass',
  });

  // Running Front App
  const rootContainer = findElement(mainSelector.ROOT);
  const navbar = findElement(mainSelector.NAVBAR);
  new Router(rootContainer);
  new App(navbar);
};
