import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen gap-4 bg-gray-900 text-gray-50">
      <Link
        to="/"
        className="absolute text-sm underline font-lighttext-blue-500 top-4 left-4"
      >
        Go to homepage
      </Link>
      <span className="text-2xl font-bold">404</span>
      <span className="text-xl font-light">Page Not Found</span>
    </div>
  );
};

export default NotFound;
