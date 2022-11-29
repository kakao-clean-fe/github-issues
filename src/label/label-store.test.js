import { beforeEach, describe, expect, it, vi } from "vitest";
import { LabelStore } from "./label-store";

describe("LabelStore 테스트", () => {
  let testLabelStore;
  beforeEach(() => {
    testLabelStore = new LabelStore();
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
