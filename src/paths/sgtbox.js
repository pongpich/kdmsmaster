import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const SGTstate = atom({
    key: 'SGTstate',
    default: [{ SetTyp: "", SetPrd: 0,DtlCod: ""}],
    effects_UNSTABLE: [persistAtom]
  });
  export { SGTstate };