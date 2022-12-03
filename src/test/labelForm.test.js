import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { isNotDuplicate } from "../util/feature";

// test suites
describe('Label Form Test', () => {
  function createNewLabel() {
    return {
      color: "b1b2ff",
      description: "test"
    }
  }

  beforeEach(() => {
    fetchMock.resetMocks();
  });
    
  afterEach(() => {
    vi.restoreAllMocks()
  });

  // test case
  it('라벨 이름 중복 검사', () => {
    // given
    const labelName = 'test';
    const labelList = [{
      ...createNewLabel(),
      name: 'test'
    }];

    const isValid = isNotDuplicate('name')(labelList, labelName);
    
    expect(isValid).toBe(false);
  })
})