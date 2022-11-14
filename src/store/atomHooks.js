/* WeakMap은 일반 Map과 다르게 key를 object로 받으며 해당 참조가 없어지는 순간 GC에 의해 자동으로 제거된다고 합니다
   ref: https://ko.javascript.info/weakmap-weakset */
import {ATOM_PROP} from "../consts/const.js";

let atomMap = new WeakMap();

export const atom = (init) => {
    const atom = {init};
    const atomProxy = new Proxy({
        value: init,
        listeners: new Set()
    }, {
        set: (target, prop, newValue, ...args) => {
            if (prop !== ATOM_PROP.VALUE || target[prop] === newValue) return true;
            const result = Reflect.set(target, prop, newValue, ...args);
            target.listeners.forEach(fn => fn());
            return result;
        }
    });
    atomMap.set(atom, atomProxy);
    return atom;
}

/* Proxy를 사용하면서 useSet, useAtom 훅 방식으로 atom 값을 사용하기 위해 래핑되는 함수 */
export const useSetAtom = (prop) => (atom) => (newValue) => {
    let target = atomMap.get(atom);
    if (prop === ATOM_PROP.VALUE) {
        target[prop] = newValue;
    } else {
        target[prop].add(newValue);
    }
    atomMap.set(atom, target);
}

export const useSetAtomValue = useSetAtom(ATOM_PROP.VALUE);
export const useSetAtomListener = useSetAtom(ATOM_PROP.LISTENERS);
export const useAtomValue = (atom) => () => atomMap.get(atom).value;
export const useAtom = (atom) => [useAtomValue(atom), useSetAtomValue(atom)];
