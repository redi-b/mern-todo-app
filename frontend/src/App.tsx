import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import TodosPage from "./pages/TodosPage";
import HomeLayout from "./layouts/HomeLayout";
import TodoPage from "./pages/TodoPage";
import NotFound from "./pages/NotFound";
import AddTodo from "./components/AddTodo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />} errorElement={<NotFound />}>
      <Route index element={<TodosPage />} />
      <Route path="create" element={<AddTodo />} />
      <Route path="todos/:id" element={<TodoPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
    // <div>Test</div>
  );
};

export default App;
