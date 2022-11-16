import type { RefObject, State } from '~/types/utils/store';

export const unwrapRefValues = <BaseState extends RefObject>(baseState: BaseState): State<BaseState> => {
  const unwrapRefValue = ({ obj, key }: { obj: object, key: string }) => {
    return Object.defineProperty(obj, key, {
      get () {
        return baseState[key].value;
      },
      set (value) {
        baseState[key].value = value;
      }
    });
  };

  return Object.keys(baseState)
    .reduce(
      (obj, refKey) => unwrapRefValue({ obj, key: refKey }),
      {}
    ) as State<BaseState>;
};
