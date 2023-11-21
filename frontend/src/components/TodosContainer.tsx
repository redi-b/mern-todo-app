import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthUserContext } from "../contexts/AuthUser";

interface ContainerProps {
  sorter?: React.ReactNode;
  children: React.ReactNode;
}

const TodosContainer = ({ sorter, children }: ContainerProps) => {
  const { authUser } = useAuthUserContext();

  return (
    <div className="flex flex-col gap-6 w-[75vw] max-md:w-[85vw] max-sm:w-[95vw] p-6 my-16 mx-auto border border-gray-200 shadow-inner rounded-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xl">
          <span className="font-bold">{authUser.firstName}'s</span> Todos
        </div>
        <div className="flex items-center gap-2">
          <span>{sorter}</span>
          <Link to="/create" className="outline-none">
            <BsPlusLg className="p-1 text-3xl bg-gray-200 rounded-full" />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default TodosContainer;
