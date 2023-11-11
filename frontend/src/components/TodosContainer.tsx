import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

interface ContainerProps {
  sorter?: React.ReactNode;
  children: React.ReactNode;
}

const TodosContainer = ({ sorter, children }: ContainerProps) => {
  return (
    <div className="flex flex-col gap-6 w-[75vw] max-md:w-[85vw] max-sm:w-[95vw] p-6 my-16 mx-auto border border-gray-200 shadow-inner rounded-sm">
      <div className="flex items-center justify-end gap-2">
        <span>{sorter}</span>
        <Link to="/create" className="outline-none">
          <BsPlusLg className="p-1 text-3xl bg-gray-200 rounded-full" />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default TodosContainer;
