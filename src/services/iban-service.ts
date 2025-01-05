import apiClient from "./api-client";

export interface IBAN {
  iban: string;
  bankName: string;
  country: string;
  valid:boolean;
}

class ibanService{

    verifyIban(iban:string){
        const controller = new AbortController();
        const request = apiClient.post<IBAN>("/iban", { iban }, {signal:controller.signal} );
        return { request,cancel: ()=>{controller.abort()}}
    }

}

export default new ibanService();