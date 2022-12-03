export type EffectFunction = (...args: unknown[]) => unknown;

export interface Ref<T = unknown> {
  value: T
  _effects: EffectFunction[]
  _addEffect: (effectFunction: EffectFunction) => void
  _runEffect: (newValue: T, prevValue: T) => void
}
