import axios from "axios";
import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useParams } from "react-router-dom";
import { AddExpenseForm } from "./AddExpenseForm";

const EditExpensePage = () => {
  const [expense, setExpense] = useState<ExpenseItemModel>();
  const { authState } = useOktaAuth();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [fetchData, setFetchData] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [amountUpdated, setAmountUpdated] = useState(false);

  useEffect(() => {
    loadExpense();
  }, [authState, fetchData]);

  const shouldRefetchData = () => {
    setFetchData(!fetchData);
  };

  const loadExpense = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/expenses/get/${id}`,
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
        setExpense(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  return (
    <div>
      {httpError && (
        <div className="container m-5" style={{ color: "red" }}>
          <p>{httpError}</p>
        </div>
      )}
      <AddExpenseForm
        id={id}
        typeOfRequest={"Update"}
        fetchData={fetchData}
        shouldRefetchData={shouldRefetchData}
      />
      {expense && (
        <div className="table-responsive">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Item</th>
                <th scope="col">Category</th>
                <th scope="col">Amount ($)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{expense.id}</td>
                <td>{expense.date}</td>
                <td>{expense.item}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditExpensePage;
