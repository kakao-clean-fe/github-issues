import Labels from '../component/Label/Labels';
import LabelModel from '../model/LabelModel';
import store from '../store/labelStore'

const initLabels = () => {
  const app = document.querySelector('#app');
  const labelModel = new LabelModel();;


  const LabelComponent = new Labels({
    target: app, 
    model: labelModel,
  })

}

export default initLabels;