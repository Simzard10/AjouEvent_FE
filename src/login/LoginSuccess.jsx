import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const id = params.get("id");
    const email = params.get("email");
    const name = params.get("name");
    const major = params.get("major");

    if (accessToken && refreshToken && id && email && name && major) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("id", id);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("major", major);

      navigate("/");
    } else {
      console.error("Missing URL parameters");
      navigate("/signIn");
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Login Success</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default LoginSuccess;
