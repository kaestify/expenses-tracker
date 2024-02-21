import { CSVLink } from "react-csv";
import "./DownloadButton.css";
import { PiFileCsv } from "react-icons/pi";
// Columns array created for table header
const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Date", accessor: "date" },
  { Header: "Item", accessor: "item" },
  { Header: "Category", accessor: "category" },
  { Header: "Amount ($)", accessor: "amount" },
];

export const DownloadButton: React.FC<{
  items: Array<any>;
  buttonText: string;
}> = (props) => {
  const { items, buttonText } = props;
  // Contains the column headers and table data in the required format for CSV
  const csvData = [
    ["ID", "Date", "Item", "Category", "Amount ($)"],
    ...items.map(({ id, date, item, category, amount }) => [
      id,
      date,
      item,
      category,
      amount,
    ]),
  ];

  return (
    <CSVLink className="downloadBtn" filename="my-file.csv" data={csvData}>
      <button type="button" className="btn btn-outline-secondary">
        {buttonText} <PiFileCsv />
      </button>
    </CSVLink>
  );
};
