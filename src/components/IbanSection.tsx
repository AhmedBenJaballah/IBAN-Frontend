import axios from "axios";
import React, { useState } from "react";


function IbanSection() {
  const [iban, setIban] = useState(""); 
  const [responseMessage, setResponseMessage] = useState(""); 

  const handleVerifyClick = () => {
    axios.post("/iban", { iban })
      .then((response) => {
        setResponseMessage(response.data.message); 
      })
      .catch((error) => {
        console.error("Error verifying IBAN:", error);
        setResponseMessage("An error occurred while verifying the IBAN."); 
      });
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="iban" className="form-label">Enter IBAN</label>
        <input
          type="text"
          className="form-control"
          id="iban"
          placeholder="Type IBAN"
          value={iban} 
          onChange={(e) => setIban(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={handleVerifyClick}>
          Verify
        </button>
      </div>
      {responseMessage && <div className="alert alert-info mt-3">{responseMessage}</div>}
    </>
  );
}

export default IbanSection;
