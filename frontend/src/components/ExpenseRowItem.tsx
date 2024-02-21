import { Button } from "./Button";

export const ExpenseRowItem: React.FC<{
  id: number;
  expenseId: number;
  date: string;
  item: string;
  amount: string;
  category: string;
  handleDelete: Function;
  handleUpdate: Function;
}> = (props) => {
  const {
    id,
    expenseId,
    date,
    item,
    amount,
    category,
    handleDelete,
    handleUpdate,
  } = props;
  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return (
    <tr>
      <td>{id}</td>
      <td>{formattedDate}</td>
      <td>{item}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <Button
          id={expenseId}
          buttonText="UPDATE"
          handleAction={handleUpdate}
        />
      </td>
      <td>
        <Button
          id={expenseId}
          buttonText="DELETE"
          handleAction={handleDelete}
        />
      </td>
    </tr>
  );
};
