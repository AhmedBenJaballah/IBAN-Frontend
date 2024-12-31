import apiClient from "../services/api-client";
import React, { useState, useEffect } from "react";

export interface IBAN {
  iban: string;
  bankName: string;
  country:string;
}

function IbanSection() {
  const [ibanData, setIbanData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [triggerValidation,setTriggerValidation]=useState(true);
  const [ibanCountry,setIbanCountry]= useState("");
  const [ibanBankName,setIbanBankName]= useState("");


  useEffect(() => {
      
        apiClient
        .post("/iban", { iban: ibanData }) 
        .then((response) => {
          setIbanCountry(response.data.country);
          setIbanBankName(response.data.bankName);
          setResponseMessage(response.data.message);
        })
        .catch((error) => {
          console.error("Error verifying IBAN:", error);
          setResponseMessage("An error occurred while verifying the IBAN.");
        })
    
  }, [triggerValidation]); 


  function handleTypping(e: React.ChangeEvent<HTMLInputElement>){
    setIbanData(e.target.value);
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="iban" className="form-label">Enter IBAN</label>
        <input
          type="text"
          className="form-control"
          id="iban"
          name="iban"
          placeholder="Type IBAN"
          onChange={(e)=>handleTypping(e)}
        />
      </div>

      <button className="btn btn-primary" onClick={() => setTriggerValidation(!triggerValidation)}>
        Verify
      </button>

      {<p>country: {ibanCountry}</p>}
      {<p>bank name: {ibanBankName}</p>}
      {responseMessage && <div className="alert alert-info mt-3">{responseMessage}</div>}
    </>
  );
}

export default IbanSection;
