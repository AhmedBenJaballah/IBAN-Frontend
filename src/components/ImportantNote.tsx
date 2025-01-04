import { useState } from 'react';

function ImportantNote() {
  const [buttonVisible, setButtonVisible] = useState(true); 

  const sampleIban = "DE89 3704 0044 0532 0130 00";

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleIban)
      .then(() => {
        setButtonVisible(false); 
        setTimeout(() => setButtonVisible(true), 3000); 
      })
      .catch(() => setButtonVisible(true));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Important Note</h5>
          <p className="card-text">
            The entered IBAN is supported for any country, provided that the country is part of the IBAN system. <br />
            Spaces as separators are allowed, but other separators are not supported.
          </p>
          <div className="d-flex align-items-center mt-3" style={{ height: '50px' }}>
            <strong className="me-2">Sample IBAN:</strong>
            <span className="me-3">{sampleIban}</span>
            {buttonVisible ? (
              <button className="btn btn-outline-secondary btn-sm" onClick={handleCopy}>
                Copy
              </button>
            ) : (
              <span className="text-success" style={{ fontSize: '0.875rem', fontWeight: '500' }}>IBAN copied!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportantNote;
