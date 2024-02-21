import axios from "axios";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpensesList } from "./ExpensesList";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { authState } = useOktaAuth();
  const [items, setItems] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const navigate = useNavigate();

  const shouldRefetchData = () => {
    setFetchData(!fetchData);
  };

  const handleDelete = async (id: number) => {
    try {
      if (authState && authState.isAuthenticated) {
        await axios.delete(
          `${process.env.REACT_APP_API}/expenses/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setFetchData(!fetchData);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  const handleUpdate = (id) => {
    return navigate(`/editexpense/${id}`);
  };

  const loadExpenses = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/expenses/all`,
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
        setItems(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };
  useEffect(() => {
    loadExpenses();
  }, [authState, fetchData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <>
      <AddExpenseForm
        id={null}
        typeOfRequest={"Add"}
        fetchData={fetchData}
        shouldRefetchData={shouldRefetchData}
      />
      <ExpensesList
        items={items}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
};
