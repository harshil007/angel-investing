import React from "react";

const renderField = (label: string): JSX.Element => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <div className="label-text">{label}</div>
      <input />
    </div>
  );
};

const Deposits = React.memo(function Deposits(): JSX.Element {
  return (
    <div className="content-card">
      <div className="heading2">Make a deposit to your account</div>
      <div style={{ marginTop: "15px" }}>
        {renderField("Amount to be deposited")}
        <div className="label-text">Mode of payment</div>
        <div style={{ display: "flex" }}>
          <input
            type="radio"
            id="debit_card"
            name="mode_of_payment"
            value="debit_card"
          />
            <label htmlFor="debit_card">Debit card</label>
          <br /> {" "}
          <input
            type="radio"
            id="credit_card"
            name="mode_of_payment"
            value="credit_card"
          />
            <label htmlFor="credit_card">Credit card</label>
          <br />
          <input type="radio" id="upi" name="mode_of_payment" value="upi" />
          <label htmlFor="upi">UPI</label>
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "500px",
            height: "200px",
            padding: "5px",
          }}
        >
          Form details based on mode of payment
        </div>
         <button style={{ marginTop: "10px" }}>Submit</button>
      </div>
    </div>
  );
});

export default Deposits;
