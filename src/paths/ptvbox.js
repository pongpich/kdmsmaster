// import { atom, selector } from "recoil";

// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

// // const PTVstate = atom({
// //     key: 'PTVstate',
// //     default: {PTV:false, tmlcod: "", tmltyp: "",namtha: "",nameng: "",dsctha:"" ,dsceng:""},
// //     effects_UNSTABLE: [persistAtom]
// //   });

// export const PTVstate = atom({
//   key: "PTVstate",
//   default: [],
// });

// export const appendArrayToItems = selector({
//   key: "appendArrayToItems",
//   set: ({ get, set }, newItems = []) => {
//     if (newItems.length > 0) {
//       const currentItems = get(PTVstate);
//       const appendedItems = [...currentItems, ...newItems];
//       set(PTVstate, appendedItems);
//     }
//   },
// });
// // export { PTVstate };





import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const PTVstate = atom({
    key: 'PTVstate',
    default: [{ SetTyp: "", SetPrd: 0,DtlCod: ""}],
    effects_UNSTABLE: [persistAtom]
  });
  export { PTVstate };