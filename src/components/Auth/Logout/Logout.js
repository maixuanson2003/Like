import { UserContext } from "contexts/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setLogin } = useContext(UserContext);
  useEffect(() => {}, []);
  return <div></div>;
};

export default Logout;
