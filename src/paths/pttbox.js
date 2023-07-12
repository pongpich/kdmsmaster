import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const PTTstate = atom({
    key: 'PTTstate',
    default: [{ SetTyp: "", SetPrd: 0,DtlCod: ""}],
    effects_UNSTABLE: [persistAtom]
  });
  export { PTTstate };