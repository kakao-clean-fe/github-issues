import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {APP_DOCUMENT} from "../src/common/const";
import {LabelModel} from "../src/model/label-model.js"


describe('label component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
    
  afterEach(() => {
    vi.restoreAllMocks()
  });

  // given
  const window = new Window();
  const document = window.document;
  
  document.body.innerHTML = `
    <div id="app"></div>
  `;

//   const rootEl = document.querySelector(APP_DOCUMENT);
  const getAppDiv = () => document.getElementById('app');
  const label = new LabelModel();
  

  vi.mock('../util/abortControllerManager', () => {
    const AbortControllerManager = vi.fn();
    AbortControllerManager.prototype.getControllerKey = vi.fn();
    AbortControllerManager.prototype.getSignal = vi.fn();
    
    return {AbortControllerManager}
  });

});
