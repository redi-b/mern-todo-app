import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import TodosContainer from "../components/TodosContainer";

import { sortFunction } from "../utils/sortTodos";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// import Axios from "axios";

type ObjectKey = keyof typeof sortFunction;

const TodosPage = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([
    { _id: "", title: "", body: "", createdAt: "", completed: false },
  ]);

  const [sortBy, setSortBy] = useState("Date");
  const [sortOrder, setSortOrder] = useState("descending");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTodos(Object.values(data));
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const sorter = (
    <div className="flex items-center justify-between text-sm">
      <select
        onChange={(e) => setSortBy(e.target.value)}
        name="sortOptions"
        id="sortOption"
        className="px-2 py-1 pr-4 bg-gray-200 border-r rounded-l-sm outline-none appearance-none cursor-pointer border-r-gray-300"
      >
        <option value="Date">Date</option>
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
        {loading ||
          [...todos]
            .sort(sortFunction[`${sortOrder}${sortBy}` as ObjectKey])
            .map((todo) => (
              <Todo
                id={todo._id}
                title={todo.title}
                body={todo.body}
                createdAt={new Date(todo.createdAt).toLocaleString()}
                completed={todo.completed}
                key={todo._id}
              />
            ))}
      </TodosContainer>
    </div>
  );
};

export default TodosPage;
