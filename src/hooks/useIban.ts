import { useEffect, useState } from "react";
import ibanService, { IBAN } from "../services/iban-service";
import axios from "axios";
import { CanceledError } from "../services/api-client";

/**
 * Custom React hook for IBAN validation.
 *
 * This hook provides state and functions to validate IBANs using either
 * a custom IBAN validation service or the OpenIBAN API. It manages
 * the validation process, loading state, and response messages.
 *
 * @returns {object} - An object containing the IBAN data, response messages,
 *                     and various state setters for managing the validation.
 */
const useIban = () => {
  const [ibanData, setIbanData] = useState<IBAN>({
    iban: "",
    bankName: "",
    country: "",
    valid: false,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [useOpenApi, setUseOpenApi] = useState(false);

  function validateWithOpenAPi() {
    axios
      .get(
        `https://openiban.com/validate/${ibanData.iban}?getBIC=true&validateBankCode=true`
      )
      .then((response) => {
        const { valid, messages, iban, bankData } = response.data;
        setIbanData({
          iban,
          bankName: bankData.name,
          country: bankData.country,
          valid,
        });
        setResponseMessage(
          valid ? "IBAN verified successfully." : messages.join(", ")
        );
      })
      .catch(() => {
        setResponseMessage("An error occurred while verifying the IBAN");
      })
      .finally(() => setLoading(false));
  }

  function validateWithIbanService() {
    const { request, cancel } = ibanService.verifyIban(ibanData.iban);
    request
      .then((response) => {
        const { bankName, country, valid } = response.data;
        setIbanData({
          iban: ibanData.iban,
          bankName,
          country,
          valid,
        });
        setResponseMessage(
          valid
            ? "IBAN verified successfully."
            : "The entered IBAN is not valid."
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setResponseMessage("An error occurred while verifying the IBAN");
      })
      .finally(() => setLoading(false));
    return () => cancel();
  }

  useEffect(() => {
    if (ibanData.iban.trim()) {
      setLoading(true);
      if (useOpenApi) {
        validateWithOpenAPi();
      } else {
        validateWithIbanService();
      }
    }
  }, [triggerValidation, useOpenApi]);

  return {
    ibanData,
    responseMessage,
    triggerValidation,
    loading,
    setIbanData,
    setResponseMessage,
    setTriggerValidation,
    setLoading,
    setUseOpenApi,
    useOpenApi,
  };
};

export default useIban;
