import { EVENT_KEY, LABEL_CLASS_NAME } from "../constants";
import { getLabelItemTpl, getLabelTpl } from "../tpl";
import { findByClass, renderLayout, updateUI } from "../utils/helper";

const { ITEM_CNT, ITEM_LIST, SHOW_CREATE } = LABEL_CLASS_NAME;

const renderLabelLayout = renderLayout(getLabelTpl);

const labelList = {
  store: null,
  target: null,
  _renderItems: () => {},
  render: function () {
    this.target.innerText = "";
    renderLabelLayout(this.target);
    const find = findByClass(this.target);
    const listEl = find(ITEM_LIST);
    const openEl = find(ITEM_CNT);

    this._renderItems = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);
  },
  updateItems: function () {
    this._renderItems(this.store, this.store.items);
  },
  addEvent: function (callback) {
    const find = findByClass(this.target);
    const newLabelBtn = find(SHOW_CREATE);

    newLabelBtn.addEventListener(EVENT_KEY.CLICK, (e) => {
      e.preventDefault();
      callback();
    });
  },
};

export default labelList;
