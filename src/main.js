import { initNavigationBar } from '~/components/navigation-bar';
import { worker } from './mocks/browser';
import { renderByPath } from './utils/app-router';

if (import.meta.env.DEV) {
  worker.start();
}

initNavigationBar();
renderByPath();
