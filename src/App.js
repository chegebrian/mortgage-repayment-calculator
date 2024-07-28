import { useState } from "react";
import "./App.css";
import imageCalculator from "./images/icon-calculator.svg";
import imagePlaceholder from "./images/illustration-empty.svg";

function App() {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState(null);
  const [repayments, setRepayments] = useState("");
  const [totalRepayments, setTotalRepayments] = useState("");

  function handleAmount(e) {
    setAmount(
      /^0/.test(Number(e.target.value))
        ? e.target.value.replace(/^0/, "")
        : Number(e.target.value)
    );
  }
  function handleYears(e) {
    setYears(
      /^0/.test(Number(e.target.value))
        ? e.target.value.replace(/^0/, "")
        : Number(e.target.value)
    );
  }
  function handleRate(e) {
    setRate(
      /^0/.test(Number(e.target.value))
        ? e.target.value.replace(/^0/, "")
        : Number(e.target.value)
    );
  }
  function handleMortgageType(e) {
    setMortgageType(e.target.value);
  }
  const numberOfMonths = 12;
  function handleRepayments(e) {
    e.preventDefault();
    if (!amount || !rate || !mortgageType || !years) return;

    const percentage = rate / 100;
    const numberOfInstallments = numberOfMonths * years;
    const monthlyRepayments =
      (amount * (percentage / numberOfMonths)) /
      (1 - Math.pow(1 + percentage / numberOfMonths, -numberOfInstallments));
    setRepayments(monthlyRepayments);
    setTotalRepayments(monthlyRepayments * numberOfInstallments);
  }

  window.addEventListener("input", handleRepayments);

  function handleClearForm() {
    setAmount("");
    setMortgageType(null);
    setRate("");
    setRepayments("");
    setYears("");
  }
  return (
    <div className="app">
      <Form
        amount={amount}
        years={years}
        rate={rate}
        mortgageType={mortgageType}
        handleAmount={handleAmount}
        handleYears={handleYears}
        handleRate={handleRate}
        handleMortgageType={handleMortgageType}
        handleRepayments={handleRepayments}
        handleClearForm={handleClearForm}
      />
      <DisplayResults
        repayments={repayments}
        totalRepayments={totalRepayments}
      />
    </div>
  );
}

function Form({
  amount,
  years,
  rate,
  mortgageType,
  handleAmount,
  handleYears,
  handleRate,
  handleMortgageType,
  handleRepayments,
  handleClearForm,
}) {
  return (
    <form onSubmit={handleRepayments}>
      <div className="flex-row margin-bottom">
        <h2 style={{ color: "hsl(202, 55%, 16%)" }}>Mortgage Calculator</h2>
        <span style={{ color: "hsl(200, 24%, 40%)" }} onClick={handleClearForm}>
          Clear All
        </span>
      </div>
      <Input
        id={"MortgageAmount"}
        classy={"flex-col"}
        value={amount}
        onChange={handleAmount}
      >
        Mortgage Amount (💶)
      </Input>
      <div className="flex-row margin-top">
        <Input
          id={"MortgageTerm"}
          classy={"flex-col"}
          value={years}
          onChange={handleYears}
        >
          Mortgage Term (years)
        </Input>
        <Input
          id={"InterestRate"}
          classy={"flex-col"}
          value={rate}
          onChange={handleRate}
        >
          Interest Rate (%)
        </Input>
      </div>
      <div className="flex-col margin-top">
        <label style={{ color: "hsl(200, 24%, 40%)" }}>Mortgage Type</label>
        <RadioInput
          id={"Repayment"}
          value="Repayment"
          checked={mortgageType === "Repayment"}
          onChange={handleMortgageType}
        >
          Repayment
        </RadioInput>
        <RadioInput
          id={"InterestOnly"}
          value="Interest Only"
          checked={mortgageType === "Interest Only"}
          onChange={handleMortgageType}
        >
          Interest Only
        </RadioInput>
      </div>
      <Button>
        <img src={imageCalculator} alt="calculator" />{" "}
        <span style={{ color: "hsl(202, 55%, 16%)" }}>
          Calculate Repayments
        </span>
      </Button>
    </form>
  );
}

function DisplayResults({ repayments, totalRepayments }) {
  return (
    <>
      {!repayments && <Placeholder />}
      {repayments && (
        <RenderResults
          repayments={repayments}
          totalRepayments={totalRepayments}
        />
      )}
    </>
  );
}

function Placeholder() {
  return (
    <div className="background">
      <img src={imagePlaceholder} alt="calculator" />
      <h2 style={{ color: "hsl(202, 86%, 94%)" }}>Results shown here</h2>
      <p style={{ color: " hsl(200, 26%, 54%)" }}>
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

function RenderResults({ repayments, totalRepayments }) {
  let nf = new Intl.NumberFormat("en-US");
  return (
    <div className="background">
      <h2 style={{ color: "hsl(202, 86%, 94%)" }}>Your results</h2>
      <p style={{ color: " hsl(200, 26%, 54%)" }}>
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div className="margin-top">
        <h3 style={{ color: " hsl(200, 26%, 54%)" }}>
          Your monthly repayments
        </h3>
        <span style={{ color: "hsl(202, 86%, 94%)" }}>
          {nf.format(repayments.toFixed(2))}
        </span>
        <h3 style={{ color: " hsl(200, 26%, 54%)" }}>
          Total you'll repay over the term
        </h3>
        <span style={{ color: "hsl(202, 86%, 94%)" }}>
          {nf.format(totalRepayments.toFixed(2))}
        </span>
      </div>
    </div>
  );
}

function Button({ children }) {
  return <button className="btn flex margin-top">{children}</button>;
}

function RadioInput({ children, id, value, checked, onChange }) {
  return (
    <div className="radio">
      <input
        type="radio"
        name="mortgage-type"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        style={{ color: "hsl(202, 55%, 16%)", marginLeft: "0.5em" }}
      >
        {children}
      </label>
    </div>
  );
}

function Input({ children, id, classy, value, onChange }) {
  return (
    <div className={classy}>
      <label htmlFor={id} style={{ color: "hsl(200, 24%, 40%)" }}>
        {children}
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onInput={onChange}
        min="1"
        step="0.01"
      />
    </div>
  );
}

export default App;
