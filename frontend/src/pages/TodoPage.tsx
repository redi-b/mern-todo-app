import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTodo,
  updateBody,
  updateCompleted,
  updateTitle,
} from "../utils/apiUtils";

const TodoPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [todoData, setTodoData] = useState({
    _id: id,
    title: "",
    body: "",
    completed: false,
    createdAt: "",
    updatedAt: "",
  });

  const [todoTitle, setTodoTitle] = useState(todoData.title);
  const [todoBody, setTodoBody] = useState(todoData.body);
  const [editing, setEditing] = useState("none");

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
        updatedAt: new Date(data.updatedAt).toLocaleString(),
      });
      setTodoTitle(data.title);
      setTodoBody(data.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleCheckedChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodoData = await updateCompleted(id, event);
    setTodoData({
      ...todoData,
      completed: newTodoData.todo.completed,
      updatedAt: new Date(newTodoData.todo.updatedAt).toLocaleString(),
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleTitleBlur = async (submitted: boolean) => {
    if (submitted) {
      const response = await updateTitle(id, todoTitle);

      if (response) {
        await getTodo();
      }
    } else {
      setTodoTitle(todoData.title);
    }
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        handleTitleBlur(true);
        break;
      case "Escape":
        event.currentTarget.blur();
        break;
    }
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoBody(event.target.value);
  };

  const handleBodyBlur = async (submitted: boolean) => {
    if (submitted) {
      const response = await updateBody(id, todoBody);

      if (response) {
        await getTodo();
      }
    } else {
      setTodoBody(todoData.body);
    }
  };

  const handleBodyKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (event.ctrlKey || event.shiftKey || event.altKey) {
          setTodoBody((body) => body + "\n");
          break;
        }
        handleBodyBlur(true);
        break;
      case "Escape":
        event.currentTarget.blur();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {loading && <div className="py-20 text-center">Loading ...</div>}
      {loading || (
        <div className="flex flex-col max-w-4xl gap-4 px-12 py-20 mx-auto max-md:max-w-xl max-sm:max-w-lg">
          <div className="flex justify-between pb-4 text-2xl font-semibold border-b">
            {/* <span className={`${todoData.completed ? "line-through" : ""}`}>
              {todoData.title}
            </span> */}
            <div className="cursor-pointer">
              <input
                type="text"
                name="title"
                id="title"
                className={`border-b-2 border-transparent outline-none cursor-pointer transition-all focus:cursor-auto focus:border-teal-700 hover:border-teal-700 ${
                  todoData.completed ? "line-through" : ""
                }`}
                value={todoTitle}
                onChange={handleTitleChange}
                onKeyDown={handleTitleKeyDown}
                onFocus={() => setEditing("title")}
                onBlur={() => handleTitleBlur(false)}
              />
            </div>
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
          <textarea
            className="py-2 text-lg font-light transition-all border-2 border-transparent rounded-sm outline-none cursor-pointer resize-none hover:px-2 hover:border-teal-600 focus:cursor-auto focus:px-2 focus:border-teal-600"
            value={todoBody}
            onChange={handleBodyChange}
            onKeyDown={handleBodyKeyDown}
            onFocus={() => setEditing("body")}
            onBlur={() => handleBodyBlur(false)}
          ></textarea>
          <div className="flex flex-col self-end text-sm font-extralight">
            <span>Created on {todoData.createdAt}</span>
            {todoData.updatedAt !== todoData.createdAt && (
              <span>Updated on {todoData.updatedAt}</span>
            )}
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
