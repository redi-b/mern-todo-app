import { Link } from "react-router-dom";
import { authStateActions, useAuthUserContext } from "../contexts/AuthUser";

const NavBar = () => {
  const { authUser, authDispatch } = useAuthUserContext();

  function handleLogout(): void {
    authDispatch({ type: authStateActions.LOG_OUT });
  }

  return (
    <div
      className={`flex items-center w-full px-8 py-4 text-white bg-teal-700 ${
        authUser ? "justify-between" : "justify-center"
      }`}
    >
      <Link to={""} className="text-4xl font-medium text-gray-50">
        Todo App
      </Link>

      {authUser && (
        <div className="flex items-center gap-4">
          <span>{authUser.email}</span>
          <button
            className="px-3 py-1.5 text-sm border-2 rounded-[4px] outline-none hover:bg-teal-600"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
