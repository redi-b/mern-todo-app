import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { createTodo } from "../utils/apiUtils";
import { useAuthUserContext } from "../contexts/AuthUser";

const AddTodo = () => {
  const { authUser } = useAuthUserContext();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newTodo = await createTodo(title, body, authUser.token);

      if (!newTodo?.response.ok) {
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-[55vw] max-md:w-[65vw] max-sm:w-[85vw] p-6 my-4 mx-auto ">
      <Link to="/">
        <BsArrowLeft className="p-2 text-4xl font-black bg-gray-200 rounded-full" />
      </Link>
      <span className="text-xl font-bold text-teal-700">New Todo</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Todo Title"
          required
          className="p-3 text-sm transition-all border rounded-md outline-none bg-gray-50 focus:border-teal-600"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="body"
          id=""
          rows={9}
          placeholder="Enter Todo Body"
          required
          className="p-3 text-sm transition-all border rounded-md outline-none resize-none bg-gray-50 focus:border-teal-600"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-1">
          <button className="px-4 py-2.5 text-white text-sm bg-teal-700 rounded-[4px] hover:bg-teal-600">
            Create
          </button>
          <Link
            to="/"
            className="px-4 py-2.5 text-white text-sm bg-red-700 rounded-[4px] hover:bg-red-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
