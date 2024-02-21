class GoalModel {
  id: number;
  date: string;
  amount: string;
  goalId: number;

  constructor(id: number, date: string, amount: string, goalId: number) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.goalId = goalId;
  }
}
