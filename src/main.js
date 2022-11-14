import { fetchIssues, fetchLabels } from './service';
import { storeKey, pageType } from './constant';
import { Store, EventBus } from './store';
import { renderHeader } from './components/Header';
import { renderIssuePage } from './components/IssuePage';
import { renderLabelPage } from './components/LabelPage';

async function createApp({ store }) {
  function render() {
    renderHeader({ store });
    renderIssuePage({ store });
    renderLabelPage({ store });
  }

  return { render };
}

window.addEventListener('DOMContentLoaded', async () => {
  const [issues, labels] = await Promise.all([fetchIssues(), fetchLabels()]);
  const store = new Store({
    eventBus: new EventBus(),
    initialState: {
      [storeKey.page]: pageType.issue,
      [storeKey.issues]: issues,
      [storeKey.labels]: labels,
    },
  });
  const app = await createApp({ store });
  app.render();
});
