import { fetchIssues, fetchLabels } from './service';
import { pageType, selector as sel } from './constant';
import { Store } from './flux/store';
import { Header } from './components/Header';
import { IssuePage } from './components/IssuePage'
import { LabelPage } from './components/LabelPage';
import { $, loadCreateForm } from './util';
import { actionNames } from './flux/action';
import { reducer } from './flux/reducer';
import { PageContainer } from './components/PageContainer';

export async function createApp() {
  const [issues, labels] = await Promise.all([fetchIssues(), fetchLabels()]);
  const initialState = {
    page: pageType.issue,
    issues: issues,
    labels: labels,
    isLabelFormOpen: false,
    labelForm: {
      name: '',
      description: '',
      color: '#ffffff',
      ...loadCreateForm()
    },
    toast: {
      isOpen: false,
      message: '',
      duration: 3000,
    }
  }
  const store = new Store({ initialState, reducer, actionNames });

  function render() {
    const $root = $(sel.app);
    new Header({ store, $root });
    new PageContainer({ store, $root });
    new IssuePage({ store, $root: $(sel.pageContainer) });
    new LabelPage({ store, $root: $(sel.pageContainer) });
    import('./components/ToastMessage').then(({ ToastMessage }) => {
      new ToastMessage({ store, $root: $(sel.toastContainer) });
    })
  }

  return { render };
}