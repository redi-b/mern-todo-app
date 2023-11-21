export interface TodoData {
  _id: string;
  title: string;
  body: string;
  createdAt: number | string;
  updatedAt: number | string;
  completed: boolean;
}
