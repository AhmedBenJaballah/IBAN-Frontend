import apiClient from "./api-client";

export interface IBAN {
  iban: string;
  bankName: string;
  country: string;
}

class ibanService{

    verifyIban(ibanData:string){
        const controller = new AbortController();
        const request = apiClient.post("/iban", { iban: ibanData }, {signal:controller.signal} );
        return { request,cancel: ()=>{controller.abort()}}
    }

}

export default new ibanService();