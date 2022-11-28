import { fetchBody, getLocalStorage, setLocalStorage } from "../../utils";
import Observable from "../Observable";
import LabelApi from './Api';

class LabelModel extends Observable {
  labelKey = 'label'
  initialLabelForm = {
    name: "",
    description: "",
    color: "#BE185D",
  }
  constructor() {
    super();

    this.setState({
      labels: [],
      labelForm: this.getLabelForm(),
    });
    this.initState();
  }

  async addLabel(label) {
    try {
      const labels = await LabelApi.addLabels(label);
      this.setState({...this.state, labels});
    }catch(e) {
      alert('라벨 추가에 실패하였습니다.');
      console.error(e);
    }
  }

  removeLabel(name) {
    this.setState({
      ...this.state,
      labels: this.state.labels.filter(({name: _name}) => _name !== name)
    })
  }

  initLabelForm() {
    this.setLabelForm(initialForm);
  }

  setLabelForm(labelForm) {
    this.setState({
      ...this.state,
      labelForm,
    });
    this.saveLabelForm(labelForm);
  }

  saveLabelForm(labelForm) {
    setLocalStorage(this.labelKey, JSON.stringify(labelForm));
  }

  getLabelForm() {
    return getLocalStorage(this.labelKey) || this.initialLabelForm    
  }

  async refreshLabel() {
    try {
      const labels = await LabelApi.getLabelsDelay();
      
      if(labels) {
        this.setState({...this.state, labels});
      }
      
    } catch(e) {
      alert('라벨을 갱신하던 중 문제가 발생하였습니다.');
      console.error(e);
    }
  }

  async initState() {
    try {
      const labels = await LabelApi.getLabels();
      this.setState({...this.state, labels});
    } catch(e) {
      alert('라벨을 가져오던중 문제가 발생하였습니다.');
      console.error(e);
    }
  }
}

export default LabelModel;
