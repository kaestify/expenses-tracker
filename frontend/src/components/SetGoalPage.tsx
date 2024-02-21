import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import "./SetGoalPage.css";
import { SingleGoalRow } from "./SingleGoalRow";
export const SetGoalPage = () => {
  const { authState } = useOktaAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const renderNoDataMessage = () => <p>No goals yet.</p>;

  const handleDelete = async (id: number) => {
    try {
      if (authState && authState.isAuthenticated) {
        await axios.delete(`${process.env.REACT_APP_API}/goals/${id}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setFetchData(!fetchData);
        setLoading(false);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setHttpError(err.message);
    }
  };

  const handleUpdate = (id: number) => {
    return navigate(`/editgoal/${id}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (authState && authState.isAuthenticated) {
        await axios.post(
          `${process.env.REACT_APP_API}/goals/add`,
          {
            amount: parseFloat(goal).toFixed(2),
            date: startDate.toISOString().slice(0, 8) + "01",
          },
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setFetchData(!fetchData);
        setGoal("");
        setStartDate(new Date());
        setLoading(false);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setHttpError(err.response.data.message);
      setGoal("");
      setStartDate(new Date());
    }
  };

  const fetchGoals = async () => {
    // fetch all goals
    try {
      if (authState && authState.isAuthenticated) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/goals/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`,
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

        setGoals(data._embedded.goals);
        setLoading(false);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setHttpError(err.message);
    }
  };
  useEffect(() => {
    fetchGoals();
  }, [fetchData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <p className="goals-description">
        Set your goal for the month of the year.
      </p>

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
            placeholder="Goal (Amount)"
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
          />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />
          <button onClick={handleSubmit} className="btn btn-light">
            Submit
          </button>
        </div>
      </form>

      <div>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Year/Month</th>
              <th scope="col">Amount ($)</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {goals.length > 0
              ? goals.map((i: GoalModel, index) => (
                  <SingleGoalRow
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    key={i.id}
                    id={index + 1}
                    goalId={i.id}
                    date={i.date}
                    amount={i.amount}
                  />
                ))
              : renderNoDataMessage()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
