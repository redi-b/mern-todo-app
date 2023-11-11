import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, updateCompleted } from "../utils/apiUtils";

const TodoPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [todoData, setTodoData] = useState({
    _id: id,
    title: "",
    body: "",
    completed: false,
    createdAt: "",
  });

  const navigate = useNavigate();

  const getTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "GET",
      });
      const data = await response.json();

      setTodoData({
        ...todoData,
        title: data.title,
        body: data.body,
        completed: data.completed,
        createdAt: new Date(data.createdAt).toLocaleString(),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleCheckedChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodoData = await updateCompleted(id, e);
    setTodoData({ ...todoData, completed: newTodoData.todo.completed });
  };

  return (
    <>
      {loading && <div className="py-20 text-center">Loading ...</div>}
      {loading || (
        <div className="flex flex-col max-w-4xl gap-6 px-12 py-20 mx-auto max-md:max-w-xl max-sm:max-w-lg">
          <div className="flex justify-between pb-4 text-2xl font-semibold border-b">
            <span className={`${todoData.completed ? "line-through" : ""}`}>
              {todoData.title}
            </span>
            <div className="relative flex items-center gap-2">
              <input
                type="checkbox"
                name="complete"
                id="complete"
                className="p-3 transition-all border border-gray-400 rounded-md outline-none appearance-none cursor-pointer peer checked:bg-teal-600 checked:border-transparent"
                checked={todoData.completed}
                onChange={handleCheckedChange}
              />
              <BsCheck className="absolute z-20 hidden w-full h-full text-center text-white pointer-events-none peer-checked:block" />
            </div>
          </div>
          <div className="text-lg font-light">{todoData.body}</div>
          <div className="self-end text-sm font-extralight">
            Created on {todoData.createdAt}
          </div>
          <div className="flex justify-end gap-1">
            <button
              onClick={() => {
                deleteTodo(id);
                navigate("/");
              }}
              className="px-4 py-2 text-white text-sm bg-red-700 rounded-[4px] hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoPage;
