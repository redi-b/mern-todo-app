interface TodoObject {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
  createdAt: string;
}

export const sortFunction = {
  "ascendingTitle": (todo1: TodoObject, todo2: TodoObject) =>
    todo1.title > todo2.title ? 1 : -1,

  "descendingTitle": (todo1: TodoObject, todo2: TodoObject) =>
    todo1.title > todo2.title ? -1 : 1,

  "ascendingDate": (todo1: TodoObject, todo2: TodoObject) =>
    todo1.createdAt > todo2.title ? -1 : 1,

  "descendingDate": (todo1: TodoObject, todo2: TodoObject) =>
    todo1.createdAt > todo2.createdAt ? -1 : 1,
};
