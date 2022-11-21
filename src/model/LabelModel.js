import { fetchBody } from "../utils";
import Observer from "./observer";
const initialForm = {
  name: "",
  description: "",
  color: "#BE185D",
};
class LabelModel extends Observer {
  constructor() {
    super();
    this._labels = [];
    this.setState({
      labels: [],
      labelForm: initialForm,
    });
    this.initState();
  }

  addLabel(label) {
    this.setState({
      ...this.state,
      labels: this.state.labels.concat(label)
    })
  }

  removeLabel(label) {
    this.setState({
      ...this.state,
      labels: this.state.labels.filter((l) => l !== label)
    })
  }

  initLabelForm() {
    this.setLabelForm(labelForm);
  }

  setLabelForm(labelFrom) {
    this.setState({
      ...this.state,
      labelFrom,
    });
  }
  async initState() {
    const labels = await fetchBody("/labels");
    this.addLabel(labels);
  }
}

export default LabelModel;
