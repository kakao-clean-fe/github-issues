import { fetchIssues, fetchLabels } from './service';
import { storeKey, pageType } from './constant';
import { Store, EventBus } from './store';
import { createHeader } from './components/Header';
import { createIssuePage } from './components/IssuePage';
import { createLabelPage } from './components/LabelPage';

async function createApp() {
  const [issues, labels] = await Promise.all([fetchIssues(), fetchLabels()]);
  const store = new Store({
    eventBus: new EventBus(),
    initialState: {
      [storeKey.page]: pageType.issue,
      [storeKey.issues]: issues,
      [storeKey.labels]: labels,
      [storeKey.isNewLabelFormOpen]: false,
      [storeKey.labelForm]: {
        name: '',
        description: '',
        color: '#ffffff',
      },
    },
  });

  function render() {
    createHeader({ store }).render();
    createIssuePage({ store }).render();
    createLabelPage({ store }).render();
  }

  return { render };
}

window.addEventListener('DOMContentLoaded', async () => {
  const app = await createApp();
  app.render();
});
