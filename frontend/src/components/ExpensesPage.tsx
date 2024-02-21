import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ExpensesPage.css";

const dropdownOptions = [
  "All",
  "By Category",
  "By Year & Month",
  "By Year, Month & Category",
];
export const ExpensesPage = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [expensesBreakdownByCategory, setExpensesBreakdownByCategory] =
    useState([]);
  const [expensesBreakdownByMonth, setExpensesBreakdownByMonth] = useState([]);
  const [
    expensesBreakdownByMonthCategory,
    setExpensesBreakdownByMonthCategory,
  ] = useState([]);
  const [dropdownOption, setDropdownOption] = useState(dropdownOptions[0]);

  const renderNoDataMessage = () => <p>No expenses yet.</p>;
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

  const loadExpensesBreakdownByCategory = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/expenses/getbreakdown/bycategory`,
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!data) {
          throw new Error("Something went wrong");
        }
        setExpensesBreakdownByCategory(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  const loadExpensesBreakdownByMonthCategory = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/expenses/getbreakdown/bymonthandcategory`,
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!data) {
          throw new Error("Something went wrong");
        }
        setExpensesBreakdownByMonthCategory(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  const loadExpensesBreakdownByMonth = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/expenses/getbreakdown/bymonth`,
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!data) {
          throw new Error("Something went wrong");
        }
        setExpensesBreakdownByMonth(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  useEffect(() => {
    loadExpensesBreakdownByCategory();
    loadExpensesBreakdownByMonth();
    loadExpensesBreakdownByMonthCategory();
  }, []);

  return (
    <div className="expenses-summary-table">
      {dropDownForm()}
      {(dropdownOption === "By Category" || dropdownOption === "All") && (
        <>
          <h2>Expenses by Category</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {expensesBreakdownByCategory.length > 0
                ? expensesBreakdownByCategory.map((e, index) => {
                    const category = e[0];
                    const total = e[1];
                    return (
                      <tr key={index}>
                        <td>{category}</td>
                        <td>${total}</td>
                      </tr>
                    );
                  })
                : renderNoDataMessage()}
            </tbody>
          </table>
        </>
      )}
      {(dropdownOption === "By Year & Month" || dropdownOption === "All") && (
        <>
          <h2>Expenses by Year & Month</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Total Spent</th>
                <th scope="col">Goal</th>
                <th scope="col">Target Met?</th>
              </tr>
            </thead>
            <tbody>
              {expensesBreakdownByMonth.length > 0
                ? expensesBreakdownByMonth.map((e, index) => {
                    const month = e[0];
                    const totalSpent = e[2];
                    const goal = e[1] ? `$${e[1]}` : "No goal yet";
                    const targetMet =
                      e[2] < e[1] ? (
                        <p className="text-success">Yes</p>
                      ) : (
                        <p className="text-danger">No</p>
                      );
                    return (
                      <tr key={index}>
                        <td>{month}</td>
                        <td>${totalSpent}</td>
                        <td>{goal}</td>
                        <td>{targetMet}</td>
                      </tr>
                    );
                  })
                : renderNoDataMessage()}
            </tbody>
          </table>{" "}
        </>
      )}

      {(dropdownOption === "By Year, Month & Category" ||
        dropdownOption === "All") && (
        <>
          <h2>Expenses by Year Month & Category</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Category</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {expensesBreakdownByMonthCategory.length > 0
                ? expensesBreakdownByMonthCategory.map((e, index) => {
                    return (
                      <tr key={index}>
                        <td>{e[0]}</td>
                        <td>{e[1]}</td>
                        <td>${e[2]}</td>
                      </tr>
                    );
                  })
                : renderNoDataMessage()}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
