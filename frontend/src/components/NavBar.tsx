import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex items-center justify-center w-full p-4 bg-teal-700">
      <Link to={""} className="text-4xl font-medium text-gray-50">Todo App</Link>
    </div>
  );
};

export default NavBar;
