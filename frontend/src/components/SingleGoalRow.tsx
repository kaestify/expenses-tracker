import { Button } from "./Button";

export const SingleGoalRow: React.FC<{
  id: number;
  date: string;
  amount: string;
  goalId: number;
  handleDelete: Function;
  handleUpdate: Function;
}> = (props) => {
  const { id, date, amount, goalId, handleDelete, handleUpdate } = props;
  let dateObj = new Date(date);
  let year = dateObj.getUTCFullYear();
  let month = dateObj.toLocaleString("default", { month: "long" });

  return (
    <tr>
      <td>{id}</td>
      <td>
        {month} {year}
      </td>
      <td>{amount}</td>
      <td>
        <Button id={goalId} buttonText="DELETE" handleAction={handleDelete} />
      </td>
      <td>
        <Button id={goalId} buttonText="UPDATE" handleAction={handleUpdate} />
      </td>
    </tr>
  );
};
