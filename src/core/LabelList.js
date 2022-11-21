import { EVENT_KEY, CLASS_NAME } from "../constants";
import { getLabelItemTpl, getLabelTpl } from "../tpl";
import { findByClass, renderLayout, updateUI } from "../utils/helper";

const { ITEM_CNT, ITEM_LIST, SHOW_CREATE } = CLASS_NAME["label"];

const renderLabelLayout = renderLayout(getLabelTpl);

function LabelList(store, target, done) {
  this._store = store;
  this._target = target;
  this._renderItems = null;
  this._done = done;
}

LabelList.prototype.render = function () {
  this._target.innerText = "";
  renderLabelLayout(this._target);
  const find = findByClass(this._target);
  const listEl = find(ITEM_LIST);
  const openEl = find(ITEM_CNT);

  this._renderItems = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);
  this._done();
};

LabelList.prototype.updateItems = function () {
  if (typeof this._renderItems !== "function") {
    this.render();
  }
  this._renderItems(this._store, this._store.items);
};

LabelList.prototype.addEvent = function (callback) {
  const find = findByClass(this._target);
  const newLabelBtn = find(SHOW_CREATE);

  newLabelBtn.addEventListener(EVENT_KEY.CLICK, (e) => {
    e.preventDefault();
    callback();
  });
};

export default LabelList;
