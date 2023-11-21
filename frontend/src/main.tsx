import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthUserContextProvider } from "./contexts/AuthUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthUserContextProvider>
    <App />
  </AuthUserContextProvider>
  // </React.StrictMode>
);
