import { worker } from './mocks/browser';
import { fetchIssues, fetchLabels } from './service';
import { storeKey, pageType } from './constant';
import { Store, EventBus } from './store';
import { createHeader } from './components/Header';
import { createIssuePage } from './components/IssuePage';
import { createLabelPage } from './components/LabelPage';
import { loadCreateForm } from './util';
import { ToastMessage } from './components/ToastMessage';

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
        ...loadCreateForm()
      },
      [storeKey.toast]: {
        isOpen: false,
        message: '',
        duration: 3000,
      }
    },
  });

  function render() {
    createHeader({ store }).render();
    createIssuePage({ store }).render();
    createLabelPage({ store }).render();
    new ToastMessage({ store, $root: document.getElementById('toast') });
  }

  return { render };
}

window.addEventListener('DOMContentLoaded', async () => {
  worker.start();
  const app = await createApp();
  app.render();
});
