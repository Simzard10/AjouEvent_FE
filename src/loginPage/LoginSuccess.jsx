import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(location.search);
      const authorizationCode = params.get("code");

      if (authorizationCode) {
        const fcmToken = localStorage.getItem("fcmToken");

        const loginData = {
          authorizationCode: authorizationCode,
          fcmToken: fcmToken,
        };

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/api/users/oauth`,
            loginData
          );

          if (response.status === 200) {
            const { id, accessToken, refreshToken, email, name, major } =
              response.data;

            localStorage.setItem("id", id);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            localStorage.setItem("major", major);

            alert("로그인이 완료되었습니다!");
            navigate("/");
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              alert("회원가입되지 않은 사용자입니다.");
              navigate("/signUp");
            } else {
              console.error("응답 에러:", error.response.data);
              navigate("/signIn");
            }
          } else if (error.request) {
            console.error("응답 없음:", error.request);
            navigate("/signIn");
          } else {
            console.error("요청 설정 에러:", error.message);
            alert(error.message);
            navigate("/signIn");
          }
        }
      } else {
        console.error("Missing URL parameters");
        alert("Missing URL parameters");
        navigate("/signIn");
      }
    };

    handleLogin();
  }, [location, navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default LoginSuccess;
