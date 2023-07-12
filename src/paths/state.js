import { atom,selector } from 'recoil';

const  PTVSetstate = atom({
    key: 'ptvset',
    default: [{ SetTyp: "", SetPrd: 0,DtlCod: ""}]
})

const PtcSetDetail = selector({
    key: 'PtcSetDetail',
    get: ({get}) => {
        const Detail = [...get(PTVSetstate)];
         
        return Detail;
    }
})

export {PTVSetstate, PtcSetDetail}