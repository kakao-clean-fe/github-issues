import Router from "./core/router"

class App extends Router {
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