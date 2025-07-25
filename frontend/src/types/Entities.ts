export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  userId: Number;
}