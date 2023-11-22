import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Todo from "../components/Todo";
import TodosContainer from "../components/TodosContainer";
import ErrorMsg from "../components/ErrorMsg";

import { TodoData } from "../types/Todo";
import { sortFunction } from "../utils/sortTodos";
import { useAuthUserContext } from "../contexts/AuthUser";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { formatDistanceToNow } from "date-fns";

type ObjectKey = keyof typeof sortFunction;

const TodosPage = () => {
  const { authUser } = useAuthUserContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Array<TodoData>>([]);

  const [sortBy, setSortBy] = useState("CreatedDate");
  const [sortOrder, setSortOrder] = useState("descending");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          setLoading(false);
          setError(data.message);
          return;
        }

        setTodos(Object.values(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Error loading todos! Please try again!");
      }
    };

    getTodos();
  }, []);

  const sorter = (
    <div className="flex items-center justify-between text-sm">
      <select
        onChange={(e) => setSortBy(e.target.value)}
        name="sortOptions"
        id="sortOption"
        className="px-2 py-1 pr-4 bg-gray-200 border-r rounded-l-sm outline-none appearance-none cursor-pointer border-r-gray-300"
      >
        <option value="CreatedDate">Date Created</option>
        <option value="UpdatedDate">Date Modified</option>
        <option value="Title">Title</option>
      </select>
      <button
        className="h-full p-1.5 text-base bg-gray-200 rounded-r-sm"
        onClick={() => {
          sortOrder === "descending"
            ? setSortOrder("ascending")
            : setSortOrder("descending");
        }}
      >
        {sortOrder === "descending" ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
    </div>
  );

  return (
    <div>
      <TodosContainer sorter={sorter}>
        {loading && <div className="text-center">Loading</div>}
        {!loading &&
          !error &&
          [...todos]
            .sort(sortFunction[`${sortOrder}${sortBy}` as ObjectKey])
            .map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                body={todo.body}
                completed={todo.completed}
                createdAt={formatDistanceToNow(
                  new Date(todo.createdAt),

                  { addSuffix: true }
                )}
                updatedAt={formatDistanceToNow(
                  new Date(todo.updatedAt),

                  { addSuffix: true }
                )}
              />
            ))}
        {!loading && error && (
          <ErrorMsg className="mx-auto w-fit">{error}</ErrorMsg>
        )}
        {!loading && !error && !todos.length && (
          <Link to={"/create"} className="mx-auto text-xl font-light w-fit">
            Create your first todo!
          </Link>
        )}
      </TodosContainer>
    </div>
  );
};

export default TodosPage;
