import { fetchIssues, fetchLabels } from './service';
import { storeKey, pageType, selector as sel } from './constant';
import { Store, EventBus } from './store';
import { createHeader } from './components/Header';
import { createIssuePage } from './components/IssuePage';
import { createLabelPage } from './components/LabelPage';
import { $, loadCreateForm } from './util';

export async function createApp() {
  const [issues, labels] = await Promise.all([fetchIssues(), fetchLabels()]);
  const eventBus = new EventBus();
  const initialState = {
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
  }
  const store = new Store({ eventBus, initialState });

  function render() {
    createHeader({ store }).render();
    createIssuePage({ store }).render();
    createLabelPage({ store }).render();
    import('./components/ToastMessage').then(({ ToastMessage }) => {
      new ToastMessage({ store, $root: $(sel.toastContainer) });
    })
  }

  return { render };
}