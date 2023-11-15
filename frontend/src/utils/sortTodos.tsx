interface TodoObject {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const sortFunction = {
  ascendingTitle: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.title > todo2.title ? 1 : -1,

  descendingTitle: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.title > todo2.title ? -1 : 1,

  ascendingCreatedDate: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.createdAt > todo2.createdAt ? 1 : -1,

  descendingCreatedDate: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.createdAt > todo2.createdAt ? -1 : 1,

  ascendingUpdatedDate: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.updatedAt > todo2.updatedAt ? 1 : -1,

  descendingUpdatedDate: (todo1: TodoObject, todo2: TodoObject) =>
    todo1.updatedAt > todo2.updatedAt ? -1 : 1,
};
