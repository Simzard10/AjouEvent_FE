import axios from "axios";

export default async function requestWithAccessToken(method, url, data = null) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    let response;
    if (method === "get") {
      response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else if (method === "post") {
      response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else if (method === "patch") {
      response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else if (method === "delete") {
      response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return response;
  } catch (error) {
    // accessToken이 만료되었을 때
    if (error.response && error.response.status === 401) {
      // 새로운 accessToken 얻기 시도
      const newAccessToken = await refreshAccessToken();
      // 새로운 accessToken으로 다시 요청
      let response;
      if (method === "get") {
        response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else if (method === "post") {
        response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else if (method === "patch") {
        response = await axios.patch(url, data, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else if (method === "delete") {
        response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
      console.error(
        `Response making ${method} request with access token:`,
        response
      );
      return response;
    } else {
      console.error(`Error making ${method} request with access token:`, error);
      throw error;
    }
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BE_URL}/api/users/reissue-token`,
      { refreshToken }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    // refreshToken이 만료되었을 경우
    if (error.response && error.response.status === 401) {
      // localStorage 초기화 및 리다이렉션 수행
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("major");
      window.location.href = "/"; // 리다이렉션
    } else {
      // 다른 오류 처리
      console.error("Error refreshing access token:", error);
      throw error;
    }
  }
}
