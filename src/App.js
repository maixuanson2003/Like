import Login from "components/Auth/Login/Login";
import PrivateRoute from "components/Auth/PrivateRoute";
import Class from "components/Categories/Class/Class";
import Class2 from "components/Categories/Class/Class2";
import Course from "components/Categories/Course/Course";
import Fields from "components/Categories/Fields/Fields";
import Course2 from "components/Categories/Course/Course2";
import Header from "components/Layout/Header";
import Sidebar from "components/Layout/Sidebar";
import Topic from "components/topic/Topic";
import Lession1 from "components/Lession/Lession1";
import Lession2 from "components/Lession/Lession2";
import { UserContext, UserProvider } from "contexts/UserContext";
import DetailGroup from "components/Student/DetailGroup";
import UserPage from "pages/User";
import Student from "components/Student/Student";
import { useContext } from "react";
import Fields2 from "components/Categories/Fields/Fields2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topic2 from "components/topic/Topic2";
import "./App.css";
import UserPage2 from "pages/User/index2";

function App() {
  const RenderPage = () => {
    const token = localStorage.getItem("token");
    return (
      <div>
        {token && (
          <UserProvider>
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar />
              {/* Content */}
              <div className="md:w-5/6 h-full overflow-y-auto">
                {/* header */}
                <Header />
                {/* component */}

                <WebRoute />
              </div>
            </div>
          </UserProvider>
        )}
        {!token && <WebRoute />}
      </div>
    );
  };

  const WebRoute = () => {
    return (
      <Routes>
        <Route path="/" element={<PrivateRoute>Hello</PrivateRoute>} />
        <Route
          path="/lession1"
          element={
            <PrivateRoute>
              <Lession1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/lession2"
          element={
            <PrivateRoute>
              <Lession2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/fields"
          element={
            <PrivateRoute>
              <Fields />
            </PrivateRoute>
          }
        />
        <Route
          path="/fields2"
          element={
            <PrivateRoute>
              <Fields2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/course"
          element={
            <PrivateRoute>
              <Course />
            </PrivateRoute>
          }
        />
        <Route
          path="/course2"
          element={
            <PrivateRoute>
              <Course2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/Topic"
          element={
            <PrivateRoute>
              <Topic />
            </PrivateRoute>
          }
        />
        <Route
          path="/Topic2"
          element={
            <PrivateRoute>
              <Topic2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/Student"
          element={
            <PrivateRoute>
              <Student />
            </PrivateRoute>
          }
        />
         <Route
          path="/DetailGroup"
          element={
            <PrivateRoute>
              <DetailGroup />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <PrivateRoute>
              <Class />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes2"
          element={
            <PrivateRoute>
              <Class2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users2"
          element={
            <PrivateRoute>
              <UserPage2 />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  };
  return (
    <BrowserRouter>
      <RenderPage />
    </BrowserRouter>
  );
}

export default App;
