export interface IUser {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  description: string;
  dueDate: string;
  status: string;
  userId: Number;
}