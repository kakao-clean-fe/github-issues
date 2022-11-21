import { EVENT_KEY, CLASS_NAME } from "../constants";
import { getLabelItemTpl, getLabelTpl } from "../tpl";
import { findByClass, renderLayout, toFetch, updateUI } from "../utils/helper";

const { ITEM_CNT, ITEM_LIST, SHOW_CREATE, REFRESH_BUTTON } =
  CLASS_NAME["label"];

const DATA_SOURCE_LABEL = "/labels-delay";

const renderLabelLayout = renderLayout(getLabelTpl);

function LabelList(store, target, done) {
  this._store = store;
  this._target = target;
  this._renderItems = null;
  this._done = done;
  this._fetchController = null;
}

LabelList.prototype.render = function () {
  this._target.innerText = "";
  renderLabelLayout(this._target);
  const find = findByClass(this._target);
  const listEl = find(ITEM_LIST);
  const openEl = find(ITEM_CNT);

  this._renderItems = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);
  const removeEvent = this.addNewLabelBtnEvent(() => {
    this._done();
    removeEvent();
  });
  this.addReloadBtnEvent();
};

LabelList.prototype.updateItems = function () {
  if (typeof this._renderItems !== "function") {
    this.render();
  }
  this._renderItems(this._store.value, this._store.value);
};

LabelList.prototype.addNewLabelBtnEvent = function (callback) {
  const find = findByClass(this._target);
  const newLabelBtn = find(SHOW_CREATE);

  const handleClick = (e) => {
    e.preventDefault();
    callback();
  };

  newLabelBtn.addEventListener(EVENT_KEY.CLICK, handleClick);
  return () => newLabelBtn.removeEventListener(EVENT_KEY.CLICK, handleClick);
};

LabelList.prototype.addReloadBtnEvent = function () {
  const find = findByClass(this._target);
  const refreshBtn = find(REFRESH_BUTTON);

  const handleClick = async (e) => {
    e.preventDefault();
    if (this._fetchController) {
      this._fetchController.abort();
    }
    this._fetchController = new AbortController();
    const items = await toFetch(DATA_SOURCE_LABEL, {
      signal: this._fetchController.signal,
    });
    this._store.value = items;
  };

  refreshBtn.addEventListener(EVENT_KEY.CLICK, handleClick);
};

export default LabelList;
