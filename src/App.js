import { Route, Routes } from "react-router-dom";
import { lazy, useContext, useEffect, useState } from "react";
import "./App.css";
import { set } from "lodash";
import { useSelector } from "react-redux";
import AuthContext from "./context/authProvider";
const AuthenticationRoutes = lazy(() =>
  import("./routes/AuthenticationRoutes")
);
const Layout = lazy(() => import("./routes/Layout"));

function App() {
  const { setAccessToken, accessToken } = useContext(AuthContext);
  const { loginResponse, isLoading } = useSelector(({ authorization }) => ({
    loginResponse: authorization.loginResponse,
    isLoading: authorization.isLoading,
  }));
  useEffect(() => {
    setAccessToken(localStorage.getItem("access_token"));
  }, [accessToken, setAccessToken]);
  useEffect(() => {
    if (!localStorage.getItem("access_token") && loginResponse === null) {
      document.body.style.backgroundColor = "#445760";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [loginResponse]);
  console.log(accessToken);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            !accessToken && loginResponse === null ? (
              <AuthenticationRoutes />
            ) : (
              <Layout />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
