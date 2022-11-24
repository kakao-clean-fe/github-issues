import { Button } from "..";

export default class UpdateLabelButton extends Button{
  constructor(templateStr, targetQuery, store) {
    super(templateStr, targetQuery);
    this.store = store;
    this.controller = null;
    const event = () => {
      this.getDelayData();
    };
    this.setOnClickListener(this.template, event);
  }
  getDelayData(){
    if (this.controller) this.controller.abort();
    this.controller = new AbortController();
    fetch("/labels-delay", { signal: this.controller.signal})
      .then(async (res) => this.store.labelList = await res.json())
      .catch((e) => console.error(e));
    }
};