import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../paths/api-path";


//  axios.defaults.baseURL = "http://172.16.81.21:8080/InterfaceServer/DBService?"

const path = kdms_internet_protocol_DBService_JSON_path;

export function Getdata () {

    const responQuestion = {
        params: {
          dbServiceName: "MSSaveAssessmentMasterHeader",
          asscod: "", // code ลำดับคำถาม ถ้าเป็นคำถามใหม่ ''
          asscodnam: utf8.encode(asscodnam), // คำถาม ไทย
          asscodeng: asscodeng, // คำถาม ENG
          asscodval: "",
          typcod: typeCod,
          uidcod: uidCod,
        }}
    var config = {
        method: 'get',
        url: path+responQuestion,
        data: data
      };
    
      try {
        const response = await axios(config);
        return response.data;
      } catch (error) {
        return error;
      }


}