import apiClient from "./api-client";

export interface IBAN {
  iban: string;
  bankName: string;
  country: string;
  valid:boolean;
}

class ibanService{

  /**
   * Verifies an IBAN by sending it to the API endpoint.
   * 
   * @param {string} iban - The IBAN to validate.
   * @returns {object} - An object containing the request promise and a cancel function.
   * @property {Promise<IBAN>} request - The Axios POST request promise for validating the IBAN.
   * @property {function} cancel - A function to cancel the ongoing request.
   */
    verifyIban(iban:string){
        const controller = new AbortController();
        const request = apiClient.post<IBAN>("/iban", { iban }, {signal:controller.signal} );
        return { request,cancel: ()=>{controller.abort()}}
    }

}

export default new ibanService();