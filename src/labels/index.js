import Labels from '../component/Label/Labels';
import store from '../store/labelStore'

const initLabels = () => {
  const app = document.querySelector('#app');
  const labels = store.selectLabels(store.getState());
  const LabelComponent = new Labels({
    target: app, 
    store,
  })


  // store.addChangeListener(store.selectLabels, (labels) => LabelComponent.setState({labels}));

}

export default initLabels;