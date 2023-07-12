import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const MEDstate = atom({
    key: 'MEDstate',
    default: [{ SetTyp: "", SetPrd: 0,DtlCod: ""}],
    effects_UNSTABLE: [persistAtom]
  });
  export { MEDstate };