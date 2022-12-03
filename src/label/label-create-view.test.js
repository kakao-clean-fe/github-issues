import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { $$ } from "../helpers/render-helpers";
import { LabelCreateView } from "./label-create-view";
import { LabelListView } from "./label-list-view";

describe("LabelCreateView 테스트", () => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = `
    <div id="app" class="container">
      <ul class="label-list"></ul>
      <button class="refresh-labels"></button>
    </div>';
  `;
  const $ = $$(document);
  let testLabelListView = new LabelListView(document);
  let testLabelCreateView;
  const newLabel = {
    name: "newlabel",
    color: "blue",
    description: "this is blue label",
  };
  beforeEach(() => {
    fetchMock.resetMocks();
    testLabelCreateView = new LabelCreateView(document);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("renderColor 테스트", () => {
    testLabelCreateView.renderColor("222222");
    const labelColor = $("new-label-color").style.backgroundColor;
    expect(labelColor).eq("#222222");
  });
  it("renderLabelPreview 테스트", () => {
    testLabelCreateView.renderLabelPreview({ color: "222222", name: "라벨" });
    const labelPreviewElement = $("label-preview");
    const labelPreviewColor = labelPreviewElement.style.backgroundColor;
    const labelPreviewName = labelPreviewElement.innerText;
    expect(labelPreviewColor).eq("#222222");
    expect(labelPreviewName).eq("라벨");
  });
  it("checkCreateButtonActive 테스트", () => {
    testLabelCreateView.checkCreateButtonActive({
      name: "",
      color: "222222",
      description: "라벨",
    });
    let labelCreateButtonOpacity = $("label-create-button").classList.contains(
      "opacity-50"
    );
    expect(labelCreateButtonOpacity).eq(true);

    testLabelCreateView.checkCreateButtonActive({
      name: "이름",
      color: "222222",
      description: "라벨",
    });
    labelCreateButtonOpacity = $("label-create-button").classList.contains(
      "opacity-50"
    );
    expect(labelCreateButtonOpacity).eq(false);
  });
  it("updateForm 테스트", () => {
    testLabelCreateView.updateForm({ name: "라벨", description: "설명" });
    const labelNameInputValue = $("label-name-input").value;
    const labelDescriptionInputValue = $("label-description-input").value;
    expect(labelNameInputValue).eq("라벨");
    expect(labelDescriptionInputValue).eq("설명");
  });
});
