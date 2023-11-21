import React, { createContext, useContext, useReducer } from "react";

interface AuthState {
  authUser: any;
  authDispatch: React.Dispatch<any>;
}

export const authStateActions = {
  LOG_IN: "login",
  LOG_OUT: "logout",
};

export function authUserReducer(authState: any, action: any) {
  switch (action.type) {
    case authStateActions.LOG_IN:
      console.log("Log in");
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { authUser: action.payload };
    case authStateActions.LOG_OUT:
      console.log("Log out");
      localStorage.removeItem("user");
      return { authUser: null };
    default:
      return authState;
  }
}

export const AuthUserContext = createContext<AuthState>({
  authUser: null,
  authDispatch: () => {},
});

export const AuthUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, authDispatch] = useReducer(authUserReducer, {
    authUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : null,
  });

  return (
    <AuthUserContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};
