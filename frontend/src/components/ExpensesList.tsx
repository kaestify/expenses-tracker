import { DownloadButton } from "./DownloadButton";
import { ExpenseRowItem } from "./ExpenseRowItem";
import "./ExpensesList.css";
export const ExpensesList: React.FC<{
  items: ExpenseItemModel[];
  handleDelete: Function;
  handleUpdate: Function;
}> = (props) => {
  const { items, handleDelete, handleUpdate } = props;
  const renderNoDataMessage = () => <p>No expenses yet.</p>;

  return (
    <div className="table-responsive-md">
      <DownloadButton items={items} buttonText={"Export to CSV"} />

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
          {items.length > 0
            ? items.map((i, index) => (
                <ExpenseRowItem
                  key={i.id}
                  id={index + 1} //just to  display in FE - always starts from 1
                  expenseId={i.id} //actual id
                  date={i.date}
                  category={i.category}
                  item={i.item}
                  amount={i.amount}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))
            : renderNoDataMessage()}
        </tbody>
      </table>
    </div>
  );
};
