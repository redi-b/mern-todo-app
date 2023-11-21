import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authStateActions, useAuthUserContext } from "../contexts/AuthUser";
import ErrorMsg from "../components/ErrorMsg";

const AuthForm = () => {
  const { pathname } = useLocation();
  let formType = pathname.split("/").pop();
  const [form, setForm] = useState(formType);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/auth/${form}`);
  }, [form]);

  useEffect(() => {
    formType = pathname.split("/").pop();
    setForm(formType);
  }, [pathname]);

  // login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<null | string>(null);

  // signup form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<null | string>(null);

  const inputStyles =
    "px-4 py-2.5 text-sm transition-all bg-gray-100 border border-gray-300 rounded-[4px] outline-none focus:border-teal-600 font-light";
  const buttonStyles =
    "py-2 text-white font-light bg-teal-600 rounded-[4px] hover:bg-teal-500";

  const { authDispatch } = useAuthUserContext();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoginError(null);
    setLoginLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setLoginLoading(false);
        setLoginError(data.message);
        return;
      }

      authDispatch({
        type: authStateActions.LOG_IN,
        payload: { ...data.user },
      });

      setLoginLoading(false);
    } catch (error) {
      setLoginLoading(false);
      setLoginError("Error occured! Please try again.");
    }
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSignupError(null);
    setSignupLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setSignupLoading(false);
        setSignupError(data.message);
        return;
      }

      authDispatch({
        type: authStateActions.LOG_IN,
        payload: { ...data.user },
      });

      setSignupLoading(false);
    } catch (error) {
      setSignupLoading(false);
      setSignupError("Error occured! Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto my-16 shadow-xl">
      <div className="flex items-center justify-between w-full bg-white border-b-2 border-teal-500">
        <button
          className={`w-full transition-all outline-none p-4 ${
            form === "login" ? "bg-teal-600 text-white shadow-md" : "bg-gray-50"
          }`}
          onClick={() => setForm("login")}
        >
          Log in
        </button>
        <button
          className={`w-full transition-all outline-none p-4 ${
            form === "signup"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-gray-50"
          }`}
          onClick={() => setForm("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="flex flex-col items-center px-4 py-12 shadow-lg">
        {form === "login" && (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              className={`${inputStyles}`}
              placeholder="Email"
              value={loginEmail}
              required
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              className={`${inputStyles}`}
              value={loginPassword}
              placeholder="Password"
              required
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className={`${buttonStyles}`} disabled={loginLoading}>
              Log in
            </button>
            {loginError && <ErrorMsg>{loginError}</ErrorMsg>}
          </form>
        )}
        {form === "signup" && (
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="text"
              className={`${inputStyles}`}
              placeholder="First Name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className={`${inputStyles}`}
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              className={`${inputStyles}`}
              placeholder="Email"
              value={signupEmail}
              required
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              className={`${inputStyles}`}
              value={signupPassword}
              placeholder="Password"
              required
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button className={`${buttonStyles}`} disabled={signupLoading}>
              Sign Up
            </button>
            {signupError && <ErrorMsg>{signupError}</ErrorMsg>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
