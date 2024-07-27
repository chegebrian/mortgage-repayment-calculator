import "./App.css";
import imageCalculator from "./images/icon-calculator.svg";
import imagePlaceholder from "./images/illustration-empty.svg";

function App() {
  return (
    <div className="app">
      <Form />
      <DisplayResults />
    </div>
  );
}

function Form() {
  return (
    <form>
      <div className="flex-row margin-bottom">
        <h2 style={{ color: "hsl(202, 55%, 16%)" }}>Mortgage Calculator</h2>
        <span style={{ color: "hsl(200, 24%, 40%)" }}>Clear All</span>
      </div>
      <Input id={"MortgageAmount"} classy={"flex-col"}>
        Mortgage Amount
      </Input>
      <div className="flex-row margin-top">
        <Input id={"MortgageTerm"} classy={"flex-col"}>
          Mortgage Term
        </Input>
        <Input id={"InterestRate"} classy={"flex-col"}>
          Interest Rate
        </Input>
      </div>
      <div className="flex-col margin-top">
        <label style={{ color: "hsl(200, 24%, 40%)" }}>Mortgage Type</label>
        <RadioInput id={"Repayment"}>Repayment</RadioInput>
        <RadioInput id={"Interest-Only"}>Interest Only</RadioInput>
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

function DisplayResults() {
  return (
    <>
      <Placeholder />
    </>
  );
}

function Placeholder() {
  return (
    <div className="background">
    <img src={imagePlaceholder} alt="calculator"/>
      <h2 style={{color:"hsl(202, 86%, 94%)"}}>Results shown here</h2>
      <p style={{color:" hsl(200, 26%, 54%)"}}>
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

function Button({ children }) {
  return <button className="btn flex margin-top">{children}</button>;
}

function RadioInput({ children, id }) {
  return (
    <div className="radio">
      <input type="radio" name="mortgage-type" id={id} />
      <label
        htmlFor={id}
        style={{ color: "hsl(202, 55%, 16%)", marginLeft: "0.5em" }}
      >
        {children}
      </label>
    </div>
  );
}

function Input({ children, id, classy }) {
  return (
    <div className={classy}>
      <label htmlFor={id} style={{ color: "hsl(200, 24%, 40%)" }}>
        {children}
      </label>
      <input type="text" id={id} />
    </div>
  );
}

export default App;
// Mortgage Calculator
// Clear All

// Mortgage Amount

// Mortgage Term

// Interest Rate

// Mortgage Type
// Repayment
// Interest Only

// Calculate Repayments

// <!-- Empty results start -->

// Results shown here

// Complete the form and click “calculate repayments” to see what
// your monthly repayments would be.

// <!-- Empty results end -->

// <!-- Completed results start -->

// Your results

// Your results are shown below based on the information you provided.
// To adjust the results, edit the form and click “calculate repayments” again.

// Your monthly repayments

// Total you'll repay over the term
