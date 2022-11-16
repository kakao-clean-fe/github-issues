
import type { Ref } from '~/types/utils/reactive';

export type RefObject = Record<string, Ref<unknown>>;

export type State<Type extends RefObject> = {
  [Key in keyof Type]: Type[Key] extends Ref<infer Value> ? Value : never
};
