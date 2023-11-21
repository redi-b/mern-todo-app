import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import AddTodo from "./components/AddTodo";
import HomeLayout from "./layouts/HomeLayout";
import TodosPage from "./pages/TodosPage";
import TodoPage from "./pages/TodoPage";
import NotFound from "./pages/NotFound";
import AuthForm from "./pages/AuthForm";

import { useAuthUserContext } from "./contexts/AuthUser";

const App = () => {
  const { authUser } = useAuthUserContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout />} errorElement={<NotFound />}>
        <Route
          index
          element={authUser ? <TodosPage /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="auth/login"
          element={!authUser ? <AuthForm /> : <Navigate to="/" />}
        />
        <Route
          path="auth/signup"
          element={!authUser ? <AuthForm /> : <Navigate to="/" />}
        />
        <Route
          path="create"
          element={authUser ? <AddTodo /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="todos/:id"
          element={authUser ? <TodoPage /> : <Navigate to="/auth/login" />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
