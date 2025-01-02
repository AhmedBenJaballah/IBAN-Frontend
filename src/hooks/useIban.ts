import { useEffect, useState } from "react";
import ibanService, { IBAN } from "../services/iban-service";
import { CanceledError } from "../services/api-client";

const useIban=()=>{
    const [ibanData, setIbanData] = useState<IBAN>({ iban: "", bankName: "", country: "" });
    const [responseMessage, setResponseMessage] = useState("");
    const [triggerValidation, setTriggerValidation] = useState(true);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (ibanData.iban.trim()) {
      setLoading(true);
        const {request,cancel} = ibanService.verifyIban(ibanData.iban);
        request.then((response) => {
            setIbanData({
                iban: ibanData.iban,
                bankName: response.data.bankName,
                country: response.data.country,
              });
          setResponseMessage("IBAN verified successfully.");
        })
        .catch((err) => {
          //To do add server err
          if (err instanceof CanceledError) return;
          setResponseMessage("The entered IBAN is not valid.");
        })
        .finally(() => setLoading(false));
        return ()=> cancel();
    }
  }, [triggerValidation]);

  return {
    ibanData,
    responseMessage,
    triggerValidation,
    loading,
    setIbanData,
    setResponseMessage,
    setTriggerValidation,
    setLoading,
  };
}

export default useIban;