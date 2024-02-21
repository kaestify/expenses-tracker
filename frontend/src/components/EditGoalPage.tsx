import axios from "axios";
import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useParams } from "react-router-dom";

export const EditGoalPage = () => {
  const [goal, setGoal] = useState<GoalModel>();
  const { authState } = useOktaAuth();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [amountUpdated, setAmountUpdated] = useState(false);

  const loadGoal = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/goals/get/${id}`,
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
        setGoal(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/goals/update`,
        {
          amount: parseFloat(newAmount).toFixed(20),
          date: goal?.date,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setIsLoading(false);
      setAmountUpdated(true);
      setNewAmount("");
    } catch (err: any) {
      setIsLoading(false);
      setHttpError(err.message);
    }
  };

  useEffect(() => {
    loadGoal();
  }, [amountUpdated]);

  const getFormattedDate = () => {
    if (goal) {
      let dateObj = new Date(goal.date);
      let year = dateObj.getUTCFullYear();
      let month = dateObj.toLocaleString("default", { month: "long" });
      return `${month} ${year}`;
    }
    return null;
  };

  return (
    <div>
      {httpError && (
        <div className="container m-5" style={{ color: "red" }}>
          <p>{httpError}</p>
        </div>
      )}
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="New Goal (Amount)"
            onChange={(e) => setNewAmount(e.target.value)}
            value={newAmount}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-light">
          Update Goal
        </button>
      </form>
      {goal && (
        <div className="table-responsive">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{goal.id}</td>
                <td>{getFormattedDate()}</td>
                <td>{goal.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
