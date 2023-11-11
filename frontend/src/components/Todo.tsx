import { useState } from "react";
import { BsCheck, BsTrash3Fill } from "react-icons/bs";
import { deleteTodo, updateCompleted } from "../utils/apiUtils";
import { useNavigate } from "react-router-dom";

interface TodoProps {
  id: string;
  title: string;
  body: string;
  completed: boolean;
  createdAt?: string;
}

const Todo = ({ id, title, body, completed, createdAt = "" }: TodoProps) => {

  const [todoCompleted, setTodoCompleted] = useState(completed);

  const navigate = useNavigate();

  const handleCheckedChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodoData = await updateCompleted(id, e);
    setTodoCompleted(newTodoData.todo.completed);
  };

  return (
    <a
      href={`/todos/${id}`}
      className="flex items-center gap-4 px-4 bg-gray-100 rounded group"
    >
      <div className="relative flex">
        <input
          type="checkbox"
          name="todo-check"
          id="todo-check"
          checked={todoCompleted}
          onChange={(e) => {
            handleCheckedChange(e);
          }}
          className="p-3 transition-all bg-white border border-gray-300 rounded-md outline-none appearance-none cursor-pointer peer h-fit checked:border-transparent checked:bg-teal-600"
        />
        <BsCheck className="absolute z-20 hidden w-full h-full text-center text-white pointer-events-none peer-checked:block" />
      </div>
      <div className="flex items-center justify-between w-full py-5">
        <div className="flex flex-col text-gray-800">
          <span
            className={`${todoCompleted ? "line-through text-[#525252]" : ""}`}
          >
            {title}
          </span>
          <span
            className={`text-sm font-light ${
              todoCompleted ? "line-through text-[#525252]" : ""
            }`}
          >
            {body.length >= 50 ? `${body.slice(0, 50)} ...` : body}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-extralight">{createdAt}</div>
          <button
            className="hidden p-2 bg-gray-300 rounded-md group-hover:block hover:bg-gray-400"
            onClick={(e) => {
              e.preventDefault();
              deleteTodo(id);
              navigate(0);
            }}
          >
            <BsTrash3Fill className="text-gray-900" />
          </button>
        </div>
      </div>
    </a>
  );
};

export default Todo;
