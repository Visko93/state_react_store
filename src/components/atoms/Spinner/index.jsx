import React from "react";

import "./style.css";

function Spinner() {
  return (
    <div className="lds-container">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Spinner;
