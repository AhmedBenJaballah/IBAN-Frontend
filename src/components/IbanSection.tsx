import apiClient from "../services/api-client";
import React, { useState, useEffect } from "react";

export interface IBAN {
  iban: string;
  bankName: string;
  country: string;
}

function IbanSection() {
  const [ibanData, setIbanData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(true);
  const [ibanCountry, setIbanCountry] = useState("");
  const [ibanBankName, setIbanBankName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ibanData.trim()) {
      setLoading(true);
      apiClient
        .post("/iban", { iban: ibanData })
        .then((response) => {
          setIbanCountry(response.data.country);
          setIbanBankName(response.data.bankName);
          setResponseMessage(response.data.message || "IBAN verified successfully.");
        })
        .catch(() => {
          setResponseMessage("The entered IBAN is not valid.");
        })
        .finally(() => setLoading(false));
    }
  }, [triggerValidation]);

  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    setIbanData(e.target.value);
  }

  function handleVerify() {
    if (ibanData.trim()) {
      setIbanCountry("");
      setIbanBankName("");
      setResponseMessage("");
      setTriggerValidation(!triggerValidation);
    } else {
      setResponseMessage("Please enter a valid IBAN.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">IBAN Verification</h5>
          <div className="mb-3">
            <label htmlFor="iban" className="form-label">
              Enter IBAN
            </label>
            <input
              type="text"
              className="form-control"
              id="iban"
              name="iban"
              placeholder="Type IBAN"
              onChange={(e) => handleTyping(e)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleVerify} disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>
          <div className="mt-4">
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {!loading && ibanCountry && (
              <p className="mb-1">
                <strong>Country:</strong> {ibanCountry}
              </p>
            )}
            {!loading && ibanBankName && (
              <p className="mb-1">
                <strong>Bank Name:</strong> {ibanBankName}
              </p>
            )}
            {responseMessage && !loading && (
              <div className="alert alert-info mt-3">{responseMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IbanSection;
