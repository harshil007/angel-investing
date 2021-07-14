import React from "react";

const renderField = (label: string): JSX.Element => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <div className="label-text">{label}</div>
      <input />
    </div>
  );
};

const Transfers = React.memo(function Transfers(): JSX.Element {
  return (
    <div className="content-card">
      <div className="heading2">Transfer funds to another account</div>
      <div style={{ marginTop: "15px" }}>
        {renderField("Amount to be transferred")}
        {renderField("Account number")}
        {renderField("Account details")}
        {renderField("Purpose")}
        <div className="label-text">Mode of transfer</div>
        <div style={{ display: "flex" }}>
          <input type="radio" id="imps" name="mode_of_payment" value="imps" /> {" "}
          <label htmlFor="imps">IMPS</label>
          <br /> {" "}
          <input
            type="radio"
            id="neft"
            name="mode_of_payment"
            value="neft"
          />  <label htmlFor="neft">NEFT</label>
          <br />
          <input type="radio" id="rtgs" name="mode_of_payment" value="rtgs" />
          <label htmlFor="rtgs">RTGS</label>
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "500px",
            height: "200px",
            padding: "5px",
          }}
        >
          Form details based on mode of transfer
        </div>
         <button style={{ marginTop: "10px" }}>Submit</button>
      </div>
    </div>
  );
});

export default Transfers;
