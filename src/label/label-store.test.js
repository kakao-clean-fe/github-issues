import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LabelStore } from "./label-store";

describe("LabelStore 테스트", () => {
  let testLabelStore;
  const newLabel = {
    name: "newlabel",
    color: "blue",
    description: "this is blue label",
  };
  beforeEach(() => {
    fetchMock.resetMocks();
    testLabelStore = new LabelStore();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("getLabels", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([newLabel]));
    await testLabelStore.getLabels();

    expect(testLabelStore.labelList).toMatchObject([newLabel]);
  });
  it("createLabel", async () => {
    testLabelStore.form = newLabel;

    fetchMock.mockResponseOnce(JSON.stringify([newLabel]));
    await testLabelStore.createLabel();

    expect(testLabelStore.labelList).toMatchObject([newLabel]);
    expect(testLabelStore.form).toMatchObject({
      name: "",
      color: "",
      description: "",
    });
  });

  it("generateRandomColor", () => {
    testLabelStore.generateRandomColor();
    expect(testLabelStore.form.color).toMatch(/([0-f]){6}/);
  });
  it("setLabelForm", () => {
    testLabelStore.setLabelForm({ name: "새 이름" });
    expect(testLabelStore.form).toMatchObject({ name: "새 이름" });
    testLabelStore.setLabelForm({ description: "설명" });
    expect(testLabelStore.form).toMatchObject({
      name: "새 이름",
      description: "설명",
    });
  });
});
