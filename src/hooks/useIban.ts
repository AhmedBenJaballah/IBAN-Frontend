import { useEffect, useState } from "react";
import ibanService, { IBAN } from "../services/iban-service";
import { CanceledError } from "../services/api-client";

const useIban=()=>{
    const [ibanData, setIbanData] = useState<IBAN>({ iban: "", bankName: "", country: "" ,valid:false});
    const [responseMessage, setResponseMessage] = useState("");
    const [triggerValidation, setTriggerValidation] = useState(true);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (ibanData.iban.trim()) {
      setLoading(true);
        const {request,cancel} = ibanService.verifyIban(ibanData.iban);
        request
        .then((response) => {
            const { bankName, country, valid } = response.data;
            setIbanData({
              iban: ibanData.iban,
              bankName,
              country,
              valid,
            });
            valid ? setResponseMessage("IBAN verified successfully.") : setResponseMessage("The entered IBAN is not valid.")
            })
        .catch((err) => {
          //To do add server err
          if (err instanceof CanceledError) return;
          setResponseMessage("an erro ocuured while verifing the iban");
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