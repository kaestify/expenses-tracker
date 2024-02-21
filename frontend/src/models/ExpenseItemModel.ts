class ExpenseItemModel {
  id: number;
  date: string;
  expenseId: number;
  category: string;
  item: string;
  amount: string;

  constructor(
    id: number,
    date: string,
    item: string,
    expenseId: number,
    amount: string,
    category: string
  ) {
    this.id = id;
    this.date = date;
    this.category = category;
    this.item = item;
    this.amount = amount;
    this.expenseId = expenseId;
  }
}
