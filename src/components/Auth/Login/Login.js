import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogin } from "services/user.service";

import Img1 from "./assets/img1.png";
import Img2 from "./assets/img2.png";
const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const checkEmail = (username) => {
    return emailRegex.test(username);
  };
  const checkPassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || username === "") {
      alert("email khong thoa man");
      return;
    }
    if (!password || password === "") {
      alert("Mật khẩu không thoa man");
      return;
    }
    doLogin({ username, password }).then((res) => {
      const responseData = res.data;
      localStorage.setItem("token", responseData.token);
      window.location.href = "/";
    });
  };

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen z-1">
      {/* ========================= Start image ==========================*/}
      <div className="absolute top-0 right-0 z-0">
        <img src={Img1} alt="img1" />
      </div>
      <div className="absolute right-[67px] bottom-0 z-0">
        <img src={Img2} alt="img2" />
      </div>
      {/* ========================== End Image ============================ */}
      {/* ========================== Login form =========================== */}
      <div className="py-6 px-10 z-10 relative">
        {/* Title */}
        <div>
          <h3 className="font-medium text-xl">Quản lý đồ án</h3>
        </div>
        {/* Login Region */}
        <div className="lg:w-1/2 mt-20">
          <div className="lg:w-1/2 mx-auto">
            <h1 className="text-[32px] text-[#1890FF] font-bold mb-12 text-center">
              Đăng nhập
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="username">Tài khoản</label>
                <input
                  id="username"
                  className="mt-[10px] border border-[#D9D9D9] rounded-lg px-6 py-3"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-6">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type={"password"}
                  id="password"
                  className="border border-[#D9D9D9] rounded-lg px-6 py-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`${
                  checkEmail(username) && checkPassword(password)
                    ? "bg-sky-600 mt-10 px-6 py-3 text-white w-full rounded-lg"
                    : "bg-gray-600 mt-10 px-6 py-3 text-white w-full rounded-lg"
                }`}
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* ========================== End form ============================== */}
    </div>
  );
};

export default Login;
