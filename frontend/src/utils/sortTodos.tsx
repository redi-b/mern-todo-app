import { TodoData } from "../types/Todo";

export const sortFunction = {
  ascendingTitle: (todo1: TodoData, todo2: TodoData) =>
    todo1.title > todo2.title ? 1 : -1,

  descendingTitle: (todo1: TodoData, todo2: TodoData) =>
    todo1.title > todo2.title ? -1 : 1,

  ascendingCreatedDate: (todo1: TodoData, todo2: TodoData) =>
    todo1.createdAt > todo2.createdAt ? 1 : -1,

  descendingCreatedDate: (todo1: TodoData, todo2: TodoData) =>
    todo1.createdAt > todo2.createdAt ? -1 : 1,

  ascendingUpdatedDate: (todo1: TodoData, todo2: TodoData) =>
    todo1.updatedAt > todo2.updatedAt ? 1 : -1,

  descendingUpdatedDate: (todo1: TodoData, todo2: TodoData) =>
    todo1.updatedAt > todo2.updatedAt ? -1 : 1,
};
