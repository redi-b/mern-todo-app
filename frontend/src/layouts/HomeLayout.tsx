import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      
      <Outlet />
    </div>
  );
};

export default HomeLayout;
