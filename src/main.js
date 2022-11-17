import IssuePage from '/src/pages/IssuePage';
import LabelPage from '/src/pages/LabelPage';

class Main {
  constructor() {
    const $app = document.getElementById('app');
    const issuePage = new IssuePage($app);
    issuePage.init();

    const labelPage = new LabelPage($app);
    document.getElementById('label-menu').addEventListener('click', () => {
      labelPage.init();
    });
  }
}

new Main();