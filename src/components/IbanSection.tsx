import React from "react";
import useIban from "../hooks/useIban";

function IbanSection() {
  const { ibanData, responseMessage, triggerValidation, loading, setIbanData, setResponseMessage, setTriggerValidation, setUseOpenApi, useOpenApi } = useIban();

  /**
 * Handles user input in the IBAN input field.
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
 */
  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    setIbanData((prev) => ({ ...prev, iban: e.target.value }));
  }

  /**
   * Triggers the IBAN verification process.
   * Resets certain fields and sets the `triggerValidation` state to trigger the validation process.
   */
  function handleVerify() {
    if (ibanData.iban.trim()) {
      setIbanData((prev) => ({ ...prev, bankName: "", country: "" }));
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
          <h5 className="card-title mb-4">IBAN Verification</h5>
          <div className="mb-3 input-wrapper">
            <label htmlFor="iban" className={`form-label ${ibanData.iban.trim() ? "focused" : ""}`}>
              Enter IBAN
            </label>
            <input
              type="text"
              className="form-control"
              id="iban"
              name="iban"
              placeholder="Type IBAN"
              value={ibanData.iban}
              onChange={handleTyping}
            />
          </div>

          <div className="mb-3">
            <label>Choose Validation Method:</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="currentMethod"
                name="validationMethod"
                checked={!useOpenApi}
                onChange={() => setUseOpenApi(false)}
              />
              <label className="form-check-label" htmlFor="currentMethod">
              Default Validation
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="openApiMethod"
                name="validationMethod"
                checked={useOpenApi}
                onChange={() => setUseOpenApi(true)}
              />
              <label className="form-check-label" htmlFor="openApiMethod">
                Openiban API Validation
              </label>
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={handleVerify} disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...
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
            {!loading && ibanData.country && (
              <p className="mb-1">
                <strong>Country:</strong> {ibanData.country}
              </p>
            )}
            {!loading && ibanData.bankName && (
              <p className="mb-1">
                <strong>Bank Name:</strong> {ibanData.bankName}
              </p>
            )}
            {responseMessage && !loading && (
              <div className={`alert mt-3 ${ibanData.valid ? "alert-success" : "alert-danger"}`}>{responseMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IbanSection;
