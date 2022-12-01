/// <reference types="cypress" />
import { eventListener, isEquals } from '../../../src/common/util';

describe('util  test', () => {
  it('isEquals test', () => {
    // before
    let a;
    let b;
    let res;

    /**
     * 1. 숫자 동일 테스트
     */
    // given
    a = 1;
    b = 1;
    // when
    res = isEquals(a, b);
    // then
    expect(res).to.equals(true);
    res = null;

    /**
     * 문자 동일 테스트
     */
    // given
    a = 'abc';
    b = 'abcd';
    // when
    res = isEquals(a, b);
    // then
    expect(res).to.equals(false);
    res = null;
  });
});
