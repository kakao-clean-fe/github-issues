import Router from "./core/router"
import { worker } from './mocks/browser';

class App extends Router {
  created () {
    worker.start();
  }

  get pages () {
    return [{
      path: '/',
      file: 'issues'
    },
    {
      path: '/labels',
      file: 'labels'
    }
  ]}
}

new App();