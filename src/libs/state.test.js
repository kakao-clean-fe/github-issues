import {describe, expect, it} from 'vitest';
import State from "./state.js";
import {STATUS, TAB} from "../constants.js";
import {getRandomColorCode} from "./utils.js";

const initState = {
  activeTab: TAB.LABEL,
  activeStatus: STATUS.OPEN,
  showNewLabel: false,
  randomColor: getRandomColorCode()
}


describe('AppState 를 테스트한다', () => {

  it('초기값을 확인한다', () => {
    // given
    const AppState = new State(initState)

    // then
    const {activeTab} = AppState.get()
    expect(activeTab).eq("label")
  })

  it('update method를 테스트한다', () => {
    // given
    const AppState = new State(initState)

    // when
    AppState.update({activeTab: TAB.ISSUE})

    // then
    const {activeTab} = AppState.get()
    expect(activeTab).eq("issue")
  })

  it('subscribe method를 테스트한다', () => {
    // given
    const AppState = new State(initState)
    const sampleState = new State({test: 'sample2'})

    // when
    AppState.subscribe(sampleState)

    // then
    const [observer] = AppState._observers
    expect(observer).toEqual(sampleState)
  })

  it('unsubscribe method를 테스트한다', () => {
    // given
    const AppState = new State(initState)
    const sampleState = new State({test: 'sample3'})
    AppState.subscribe(sampleState)

    // when
    AppState.unsubscribe(sampleState)

    // then
    expect(AppState._observers.size).toEqual(0)
  })

  it('notify를 테스트한다 1', () => {
    // given
    const AppState = new State(initState)
    const sampleState = new State({test: 'sample4'})
    const sampleStateUpdateSpy = vi.spyOn(sampleState, 'update')
    AppState.subscribe(sampleState)

    // when
    sampleState.update({test: 'sample4'}, false)
    AppState.notify()

    // then
    expect(sampleStateUpdateSpy).toHaveBeenCalledTimes(2)
  })

  it('notify를 테스트한다 2', () => {
    // given
    const AppState = new State(initState)
    const sampleState = new State({test: 'sample5'})
    const sampleStateUpdateSpy = vi.spyOn(sampleState, 'update')
    AppState.subscribe(sampleState)

    // when
    sampleState.update({test: 'sample4'}, true)

    // then
    expect(sampleStateUpdateSpy).toHaveBeenCalledTimes(1)
  })
})