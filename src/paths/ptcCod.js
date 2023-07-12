import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const PTCCodstate = atom({
    key: 'PTCCodstate',
    default:  "",
    effects_UNSTABLE: [persistAtom]
  });
  export { PTCCodstate };