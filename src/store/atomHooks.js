/* WeakMap은 일반 Map과 다르게 key를 object로 받으며 해당 참조가 없어지는 순간 GC에 의해 자동으로 제거된다고 합니다
   ref: https://ko.javascript.info/weakmap-weakset */
let atomMap = new WeakMap();

export const atom = (init) => {
    const atom = {init};
    const setAtom = (newValue, listener) => {
        const atomState = atomMap.get(atom);
        if (atomState.value === newValue) return;
        atomMap.set(atom, {...atomState, value: newValue, listeners: listener ? atomState.listeners.add(listener): atomState.listeners});
        atomMap.get(atom).listeners.forEach((fn)=> fn())
    }
    const getAtom = () => atomMap.get(atom).value
    const atomState = {value: atom.init, getAtom, setAtom, listeners: new Set()};
    atomMap.set(atom, atomState);
    return atom;
}

export const useAtom = (atom) => {
    const atomState = atomMap.get(atom);
    return [atomState.getAtom, atomState.setAtom];
}

export const useAtomValue = (atom) => atomMap.get(atom).getAtom
export const useSetAtom = (atom) => atomMap.get(atom).setAtom
