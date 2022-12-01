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
  this._labelCreateUI = null;
  this._fetchController = null;
}

LabelList.prototype.render = function () {
  this._target.innerText = "";
  renderLabelLayout(this._target);
  const find = findByClass(this._target);
  const listEl = find(ITEM_LIST);
  const openEl = find(ITEM_CNT);

  this._renderItems = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);
  const removeEvent = this.addNewLabelBtnEvent(async () => {
    this._labelCreateUI = await this._done();
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

LabelList.prototype._handleClickEdit = (editBtn) => {
  const find = findByClass(this._target);
  const newLabelForm = find("hidden#new-label-form");
  if (newLabelForm) {
    const newLabelBtn = find(SHOW_CREATE);
    newLabelBtn.click();
  }
  const interval = setInterval(() => {
    if (!this._labelCreateUI) {
      return;
    }
    clearInterval(interval);
    this._labelCreateUI(
      editBtn.dataset.name,
      editBtn.dataset.color,
      editBtn.dataset.description
    );
  }, 100);
};

LabelList.prototype._handleClickEdit = (deleteBtn) => {
  console.log("delete > ", deleteBtn.dataset.name);
};

LabelList.prototype._clickItem = async function (e) {
  const editBtn = e.target.closest(".edit-button");
  const deleteBtn = e.target.closest(".delete-button");

  if (editBtn) {
    this._handleClickEdit(editBtn);
  }
  if (deleteBtn) {
    this._handleClickEdit(deleteBtn);
  }
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
  window.addEventListener("click", (e) => this._clickItem(e));
};

export default LabelList;
