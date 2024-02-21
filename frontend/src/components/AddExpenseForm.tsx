import "./AddExpenseForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../models/ExpenseItemModel";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

export const AddExpenseForm: React.FC<{
  id: any;
  typeOfRequest: String;
  shouldRefetchData: Function;
  fetchData: Boolean;
}> = (props) => {
  const dropdownOptions = [
    "Entertainment",
    "Food",
    "Household Necessities",
    "Housing",
    "Transport",
    "Health",
    "Travel",
    "Shopping",
    "Insurance",
  ];
  // to modify grabbing options from BE in future
  const { authState } = useOktaAuth();
  const { shouldRefetchData, fetchData, typeOfRequest, id } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [buttonText, setButtonText] = useState("Submit");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<String | null>(null);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [dropdownOption, setDropdownOption] = useState(dropdownOptions[0]);
  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const dropDownForm = () => {
    return (
      <div>
        <select
          value={dropdownOption}
          onChange={(e) => setDropdownOption(e.target.value)}
        >
          {dropdownOptions.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleSubmitAdd = async (e: any) => {
    e.preventDefault();
    const validateNum = parseFloat(amount).toFixed(2);
    if (isNaN(validateNum as any)) {
      setHttpError("Amount needs to be a number!");
      setAmount("");
      setItem("");
      setStartDate(new Date());
      setDropdownOption(dropdownOptions[0]);
      shouldRefetchData(!fetchData);
      setIsLoading(false);
      return;
    }

    try {
      if (authState && authState.isAuthenticated) {
        await axios.post(
          `${process.env.REACT_APP_API}/expenses/add`,
          {
            item: item,
            amount: parseFloat(amount).toFixed(2),
            category: dropdownOption,
            date: startDate.toISOString().split("T")[0],
          },
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setAmount("");
        setItem("");
        setStartDate(new Date());
        setDropdownOption(dropdownOptions[0]);
        shouldRefetchData(!fetchData);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.response.data.message);
    }
  };

  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    const validateNum = parseFloat(amount).toFixed(2);
    if (isNaN(validateNum as any)) {
      setHttpError("Amount needs to be a number!");
      setAmount("");
      setItem("");
      setStartDate(new Date());
      setDropdownOption(dropdownOptions[0]);
      shouldRefetchData(!fetchData);
      setIsLoading(false);
      return;
    }

    try {
      if (authState && authState.isAuthenticated) {
        await axios.put(
          `${process.env.REACT_APP_API}/expenses/update`,
          {
            item: item,
            amount: parseFloat(amount).toFixed(2),
            category: dropdownOption,
            date: startDate.toISOString().split("T")[0],
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setAmount("");
        setItem("");
        setStartDate(new Date());
        setDropdownOption(dropdownOptions[0]);
        shouldRefetchData(!fetchData);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.response.data.message);
    }
  };

  const isAddExpense = typeOfRequest === "Add";
  console.log(isAddExpense);

  return (
    <div>
      {httpError && (
        <div className="container m-5 " style={{ color: "red" }}>
          <p>{httpError}</p>
        </div>
      )}
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Item"
            onChange={(e) => setItem(e.target.value)}
            value={item}
          />
          {dropDownForm()}
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />
          <button
            onClick={isAddExpense ? handleSubmitAdd : handleSubmitUpdate}
            className="btn btn-light"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};
