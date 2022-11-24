import { fetchBody } from "../../utils";
import Observer from "../observer";
import LabelApi from './Api';
const initialForm = {
  name: "",
  description: "",
  color: "#BE185D",
};
class LabelModel extends Observer {
  constructor() {
    super();

    this.setState({
      labels: [],
      labelForm: initialForm,
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

  removeLabel(label) {
    this.setState({
      ...this.state,
      labels: this.state.labels.filter((l) => l !== label)
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
