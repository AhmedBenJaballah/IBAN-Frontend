import { useEffect, useState } from "react";
import ibanService, { IBAN } from "../services/iban-service";
import axios from "axios";  
import { CanceledError } from "../services/api-client";

const useIban = () => {
  const [ibanData, setIbanData] = useState<IBAN>({ iban: "", bankName: "", country: "", valid: false });
  const [responseMessage, setResponseMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [useOpenApi, setUseOpenApi] = useState(false);

  function validateWithOpenAPi(){
    axios
    .get(`https://openiban.com/validate/${ibanData.iban}?getBIC=true&validateBankCode=true`)
    .then((response) => {
      const { valid, messages, iban, bankData } = response.data;
      setIbanData({
        iban,
        bankName: bankData.name,
        country: bankData.country,
        valid,
      });
      setResponseMessage(valid ? "IBAN verified successfully." : messages.join(", "));
    })
    .catch(() => {
      setResponseMessage("An error occurred while verifying the IBAN");
    })
    .finally(() => setLoading(false));
  }

  function validateWithIbanService (){
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
        setResponseMessage(valid ? "IBAN verified successfully." : "The entered IBAN is not valid.");
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
