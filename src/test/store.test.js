import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { newLabelColorStore$ } from "../store/color";


describe('colorStore test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
    
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it('(property) next를 get하면 (property) cur값이 다음 값으로 변경됨', () => {
    const _cur = newLabelColorStore$.cur;
    const _next = newLabelColorStore$.next;

    expect(newLabelColorStore$.cur).not.toBe(_cur);
    expect(newLabelColorStore$.cur).toBe(_next);
  })
})