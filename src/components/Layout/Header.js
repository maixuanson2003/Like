import { UserContext } from "contexts/UserContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarDefault from "./assest/avatar.svg";
import UserDefault from "./assest/userDefault.svg";
const Header = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const {currentUser} = useContext(UserContext);
  return (
    <div className="flex p-6 shadow-sm">
      <div className="w-9/12">
        <div className="font-semibold">Trường đại học A</div>
      </div>
      <div className="w-3/12 flex justify-end">
        <div className="avatar relative">
          <img
            src={AvatarDefault}
            alt="avatar default"
            onClick={() => setDropdown(!dropdown)}
          />
          {dropdown && (
            <div className="absolute top-full right-0 mt-6 shadow bg-white w-72">
              <div className="w-full flex items-center justify-center flex-col p-6 shadow-sm">
                <img src={UserDefault} className="mx-auto" alt="user" />
                <div className="font-semibold mt-4 mb-5">
                  {currentUser.fullName}
                </div>
                <button className="py-2 px-4 border rounded-[3px]">
                  Quản lý tài khoản
                </button>
              </div>
              <div className="py-3 px-4">
                <div className="flex gap-x-2 cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="#172B4D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17L21 12L16 7"
                      stroke="#172B4D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H9"
                      stroke="#172B4D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="" onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href =  "/login"
                  }}>
                    Đăng xuất
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
