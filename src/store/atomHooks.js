let atomMap = new WeakMap();

export const atom = (init) => {
    const atom = {init};
    const setAtom = (newValue) => {
        atomMap.set(atom, {...atomMap.get(atom), value: newValue});
    }
    const getAtom = () => atomMap.get(atom).value
    const atomState = {value: atom.init, getAtom, setAtom};
    atomMap.set(atom, atomState);
    return atom;
}

export const useAtom = (atom) => {
    const atomState = atomMap.get(atom);
    return [atomState.getAtom, atomState.setAtom];
}

export const useAtomValue = (atom) => atomMap.get(atom).getAtom
export const useSetAtom = (atom) => atomMap.get(atom).setAtom
