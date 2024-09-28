import Modal from "components/Common/Modal";
import axios from "axios";
import Pagination from "components/Common/Pagination";
import React, { useEffect, useRef, useState } from "react";

import {
  createField,
  getFieldById,
  updateField,
  creatUser,
  deleteUser,
  updateUser,
} from "services/danhmuc.service";
import request from "utils/request";
const Users2 = () => {
  const token = localStorage.getItem("token");
  const [rerender, setReRender] = useState();
  const fileRef = useRef();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [number,setNumber]=useState(0);
  const [dataEdit, setDataEdit] = useState();
  const [modalType, setModalType] = useState();
  const [size, setSize] = useState(10);
  const [searchRender,setSearchRender]=useState()
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idUser, setIdUser] = useState();
  const [dataSet, setDataSet] = useState("");
  const[dataSearch,setDataSearch]=useState({
    address: "",
    birthday_start:"",
    birthday_end:"",
    email: "",
    full_name: "",
    gender: "",
    phone: "",


  })
  const [dataCreate, setDataCreate] = useState({
    address: "string",
    avatar: "string",
    birthday: "String",
    classId: 0,
    courseId: 0,
    email: "string",
    enabled: true,
    fieldId: 0,
    fullName: "string",
    gender: 0,
    note: "string",
    password: "string",
    phone: "string",
    studentCode: "string",
    teacherType: true,
    type: "string",
    username: "string",
  });
  const handleSearch=()=>{
    console.log(dataSearch);
  
    setSearchRender(Date.now());
    setNumber(0);

  }
  useEffect(()=>{
    debugger
    request("/api/admin/user", {
      params: {
        address:dataSearch.address,
        birthday_end:dataSearch.birthday_end,
        birthday_start:dataSearch.birthday_start,
        full_name:dataSearch.full_name,
        gender:dataSearch.gender,
        phone:dataSearch.phone,
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responsedata = res.data;
      setData(responsedata);
     
    });

  },[searchRender])
  const hanldeUser = async () => {
    const userData = {
      address: dataSet.address,
      avatar: "String",
      birthday: dataSet.birthday,
      email: dataSet.email,
      enabled: dataSet.enabled,
      full_name: dataSet.fullName,
      gender: dataSet.gender,
      phone: dataSet.phone,
      type: "String",
    };
    if (modalType == 1) {
      userData.type = "ADMIN";
    }
    if (modalType == 2) {
      userData.type = "STUDENT";
    }
    if (modalType == 3) {
      userData.type = "TEACHER";
    }
    return userData;
  };
  const handleUpdate = async () => {
    const userData = await hanldeUser();
    console.log(userData);

    debugger;
    var str = new URLSearchParams(userData).toString();
    updateUser(idUser, userData).then((res) => {
      handleClose();
      setReRender(Date.now());
    });

    // axios
    //   .put(
    //     `https://training.bks.center/api/admin/user/${idUser}`,
    //     { params: userData },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         Accept: "application/json",
    //         "Access-Control-Allow-Methods": "DELETE,GET,PATCH,POST,PUT",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res, req) => {
    //     console.log("User updated successfully:", res.data);
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Error updating user:",
    //       error.response ? error.response.data : error.message
    //     );
    //   });
  };
  const handleAddUser = () => {
    const userData = {
      address: dataCreate.address,
      avatar: dataCreate.avatar,
      birthday: dataCreate.birthday,
      classId: dataCreate.classId,
      courseId: dataCreate.courseId,
      email: dataCreate.email,
      enabled: dataCreate.enabled,
      fieldId: dataCreate.fieldId,
      fullName: dataCreate.fullName,
      gender: dataCreate.gender,
      note: dataCreate.note,
      password: dataCreate.password,
      phone: dataCreate.phone,
      studentCode: dataCreate.studentCode,
      teacherType: dataCreate.teacherType,
      type: dataCreate.type,
      username: dataCreate.username,
    };
    if (modalType == 1) {
      userData.type = "ADMIN";
    }
    if (modalType == 2) {
      userData.type = "STUDENT";
    }
    if (modalType == 3) {
      userData.type = "TEACHER";
    }
    const jsonData = JSON.stringify(userData);
    axios
      .post("https://training.bks.center/api/admin/user", userData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReRender(Date.now());
        handleClose();
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
    // console.log(jsonData);
    // creatUser(userData).then((res) => {
    //   handleClose();
    // });
  };
  const getUserById = (id) => {
    axios
      .get(`https://training.bks.center/api/admin/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dataResponse = res.data;
        const User = {
          address: dataResponse.address,
          avatar: dataResponse.avatar,
          birthday: dataResponse.birthday,
          classId: dataResponse.classId,
          courseId: dataResponse.courseId,
          email: dataResponse.email,
          enabled: dataResponse.enabled,
          fieldId: dataResponse.fieldId,
          fullName: dataResponse.fullName,
          gender: dataResponse.gender,
          note: dataResponse.note,
          password: dataResponse.password,
          phone: dataResponse.phone,
          studentCode: dataResponse.studentCode,
          teacherType: dataResponse.teacherType,
          type: dataResponse.type,
          username: dataResponse.username,
        };
        setIdUser(id);
        setDataSet(User);
      });
  };
  const handleClose = () => {
    setVisible(false);
    setVisibleEdit(false);
    setDataCreate({
      address: "string",
      avatar: "string",
      birthday: "string",
      classId: 0,
      courseId: 0,
      email: "string",
      enabled: true,
      fieldId: 0,
      fullName: "string",
      gender: 0,
      note: "string",
      password: "string",
      phone: "string",
      studentCode: "string",
      teacherType: true,
      type: "string",
      username: "string",
    });
    setDataEdit();
    setModalType(false);
  };

  useEffect(() => {
    request("/api/admin/user", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responsedata = res.data;
      setData(responsedata);
    });
  }, []);
  useEffect(() => {
    request("/api/admin/user", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responsedata = res.data;
      setData(responsedata);
    });
  }, [rerender]);

  return (
    <div>
      <div className="border-b shadow flex justify-between px-10 py-2 items-center">
        <div>thanhvien({data?.length})</div>
        <div>
          <button
            onClick={() => setVisible(true)}
            className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center"
          >
            Them thanh vien
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="w-full overflow-x-auto">
          <table className="w-[1920px]">
            <thead>
              <tr className="border border-[#eee] bg-[#F0F0F0]">
                <th className="border p-2 w-12">STT</th>
                <th className="border p-2 w-16 text-center">
                  <svg
                    className="m-auto"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2.5C18.3125 2.5 21.5 3.8125 23.8375 6.1625C24.9998 7.3219 25.9216 8.69941 26.5501 10.216C27.1786 11.7326 27.5014 13.3583 27.5 15C27.5 18.3125 26.1875 21.5 23.8375 23.8375C22.6781 24.9998 21.3006 25.9216 19.784 26.5501C18.2674 27.1786 16.6417 27.5014 15 27.5C11.6875 27.5 8.5 26.1875 6.1625 23.8375C5.00025 22.6781 4.07841 21.3006 3.4499 19.784C2.82139 18.2674 2.49858 16.6417 2.5 15C2.5 8.125 8.125 2.5 15 2.5ZM15 5C9.475 5 5 9.475 5 15C5 20.525 9.475 25 15 25C20.525 25 25 20.525 25 15C25 12.35 23.95 9.8 22.075 7.925C20.1974 6.05105 17.6528 4.99901 15 5ZM16.875 17.5L19.4375 21.05C18.1875 21.9625 16.6625 22.5 15 22.5C13.3375 22.5 11.8125 21.9625 10.5625 21.05L13.125 17.5C13.675 17.9 14.3125 18.125 15 18.125C15.6875 18.125 16.325 17.9 16.875 17.5ZM15 13.75C15.6875 13.75 16.25 14.3125 16.25 15C16.25 15.6875 15.6875 16.25 15 16.25C14.3125 16.25 13.75 15.6875 13.75 15C13.75 14.3125 14.3125 13.75 15 13.75ZM11.65 8.2875L13.6 12.2C12.575 12.7125 11.875 13.75 11.875 15H7.5C7.5 12.0625 9.1875 9.525 11.65 8.2875ZM18.35 8.2875C20.8125 9.525 22.5 12.0625 22.5 15H18.125C18.125 13.75 17.425 12.7125 16.4 12.2L18.35 8.2875Z"
                      fill="#172B4D"
                    />
                  </svg>
                </th>
                <th className="border p-2">Họ và tên</th>
                <th className="border p-2">Số điện thoại</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Địa chỉ</th>
                <th className="border p-2">Giới tính</th>
                <th className="border p-2">Ngày sinh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                <button onClick={()=>setReRender(Date.now())}>reset</button>
                </th>
                
                <th >
                  <button onClick={()=> handleSearch()} className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center">tim kiem</button>
                </th>
                <th>
                  <input onChange={(e) => {
                              setDataSearch({
                                ...dataSearch,
                                full_name: e.target.value,
                              });
                            }} className="border p-2" type="text" />
                </th>
                <th>
                <input onChange={(e) => {
                               setDataSearch({
                                ...dataSearch,
                                phone: e.target.value,
                              });
                            }} className="border p-2" type="text" />
                </th>
                <th>
                <input onChange={(e) => {
                               setDataSearch({
                                ...dataSearch,
                                email: e.target.value,
                              });
                            }} className="border p-2" type="text" />
                </th>
                <th>
                <input onChange={(e) => {
                               setDataSearch({
                                ...dataSearch,
                                address: e.target.value,
                              });
                            }} className="border p-2" type="text" />
                </th>
                <th>
                <select onChange={(e) => {
                               setDataSearch({
                                ...dataSearch,
                               gender: e.target.value,
                              });
                            }} value={dataSearch.gender} className="w-full h-full" name="" id="">
                  <option className="text-center" value={1}>Nam</option>
                  <option className="text-center" value={0}>Nữ</option>
                </select>
                </th>
                
                <th>
                <input onChange={(e) => {
                  if(number==0){
                    setDataSearch({
                      ...dataSearch,
                      birthday_start: e.target.value,
                    })

                  }else{
                    setDataSearch({
                      ...dataSearch,
                      birthday_end: e.target.value,
                    })


                  }
                  setNumber(number+1);
                              
                            }} className="border p-2" type="date" id="date" name="date" required />
                </th>
              </tr>
              {data &&
                data.map((item, index) => (
                  <tr>
                    <td className="border border-[#eee] text-center p-3">
                      {index + 1}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      <div className="mx-auto dropdown">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.75"
                            y="0.75"
                            width="30.5"
                            height="30.5"
                            rx="2.25"
                            stroke="#98BEE1"
                            strokeWidth="1.5"
                          />
                          <g clip-path="url(#clip0_4_4716)">
                            <path
                              d="M16 18.25C17.2426 18.25 18.25 17.2426 18.25 16C18.25 14.7574 17.2426 13.75 16 13.75C14.7574 13.75 13.75 14.7574 13.75 16C13.75 17.2426 14.7574 18.25 16 18.25Z"
                              stroke="#98BEE1"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.55 18.25C21.4502 18.4762 21.4204 18.7271 21.4645 18.9704C21.5086 19.2137 21.6246 19.4382 21.7975 19.615L21.8425 19.66C21.982 19.7993 22.0926 19.9647 22.1681 20.1468C22.2436 20.3289 22.2824 20.5241 22.2824 20.7213C22.2824 20.9184 22.2436 21.1136 22.1681 21.2957C22.0926 21.4778 21.982 21.6432 21.8425 21.7825C21.7032 21.922 21.5378 22.0326 21.3557 22.1081C21.1736 22.1836 20.9784 22.2224 20.7812 22.2224C20.5841 22.2224 20.3889 22.1836 20.2068 22.1081C20.0247 22.0326 19.8593 21.922 19.72 21.7825L19.675 21.7375C19.4982 21.5646 19.2737 21.4486 19.0304 21.4045C18.7871 21.3604 18.5362 21.3902 18.31 21.49C18.0882 21.5851 17.899 21.7429 17.7657 21.9442C17.6325 22.1454 17.561 22.3812 17.56 22.6225V22.75C17.56 23.1478 17.402 23.5294 17.1207 23.8107C16.8394 24.092 16.4578 24.25 16.06 24.25C15.6622 24.25 15.2806 24.092 14.9993 23.8107C14.718 23.5294 14.56 23.1478 14.56 22.75V22.6825C14.5542 22.4343 14.4738 22.1935 14.3294 21.9915C14.1849 21.7896 13.9831 21.6357 13.75 21.55C13.5238 21.4502 13.2729 21.4204 13.0296 21.4645C12.7863 21.5086 12.5618 21.6246 12.385 21.7975L12.34 21.8425C12.2007 21.982 12.0353 22.0926 11.8532 22.1681C11.6711 22.2436 11.4759 22.2824 11.2787 22.2824C11.0816 22.2824 10.8864 22.2436 10.7043 22.1681C10.5222 22.0926 10.3568 21.982 10.2175 21.8425C10.078 21.7032 9.9674 21.5378 9.89191 21.3557C9.81642 21.1736 9.77757 20.9784 9.77757 20.7812C9.77757 20.5841 9.81642 20.3889 9.89191 20.2068C9.9674 20.0247 10.078 19.8593 10.2175 19.72L10.2625 19.675C10.4354 19.4982 10.5514 19.2737 10.5955 19.0304C10.6396 18.7871 10.6098 18.5362 10.51 18.31C10.4149 18.0882 10.2571 17.899 10.0558 17.7657C9.85463 17.6325 9.61884 17.561 9.3775 17.56H9.25C8.85218 17.56 8.47064 17.402 8.18934 17.1207C7.90804 16.8394 7.75 16.4578 7.75 16.06C7.75 15.6622 7.90804 15.2806 8.18934 14.9993C8.47064 14.718 8.85218 14.56 9.25 14.56H9.3175C9.56575 14.5542 9.8065 14.4738 10.0085 14.3294C10.2104 14.1849 10.3643 13.9831 10.45 13.75C10.5498 13.5238 10.5796 13.2729 10.5355 13.0296C10.4914 12.7863 10.3754 12.5618 10.2025 12.385L10.1575 12.34C10.018 12.2007 9.9074 12.0353 9.83191 11.8532C9.75642 11.6711 9.71757 11.4759 9.71757 11.2787C9.71757 11.0816 9.75642 10.8864 9.83191 10.7043C9.9074 10.5222 10.018 10.3568 10.1575 10.2175C10.2968 10.078 10.4622 9.9674 10.6443 9.89191C10.8264 9.81642 11.0216 9.77757 11.2188 9.77757C11.4159 9.77757 11.6111 9.81642 11.7932 9.89191C11.9753 9.9674 12.1407 10.078 12.28 10.2175L12.325 10.2625C12.5018 10.4354 12.7263 10.5514 12.9696 10.5955C13.2129 10.6396 13.4638 10.6098 13.69 10.51H13.75C13.9718 10.4149 14.161 10.2571 14.2943 10.0558C14.4275 9.85463 14.499 9.61884 14.5 9.3775V9.25C14.5 8.85218 14.658 8.47064 14.9393 8.18934C15.2206 7.90804 15.6022 7.75 16 7.75C16.3978 7.75 16.7794 7.90804 17.0607 8.18934C17.342 8.47064 17.5 8.85218 17.5 9.25V9.3175C17.501 9.55884 17.5725 9.79463 17.7057 9.99585C17.839 10.1971 18.0282 10.3549 18.25 10.45C18.4762 10.5498 18.7271 10.5796 18.9704 10.5355C19.2137 10.4914 19.4382 10.3754 19.615 10.2025L19.66 10.1575C19.7993 10.018 19.9647 9.9074 20.1468 9.83191C20.3289 9.75642 20.5241 9.71757 20.7213 9.71757C20.9184 9.71757 21.1136 9.75642 21.2957 9.83191C21.4778 9.9074 21.6432 10.018 21.7825 10.1575C21.922 10.2968 22.0326 10.4622 22.1081 10.6443C22.1836 10.8264 22.2224 11.0216 22.2224 11.2188C22.2224 11.4159 22.1836 11.6111 22.1081 11.7932C22.0326 11.9753 21.922 12.1407 21.7825 12.28L21.7375 12.325C21.5646 12.5018 21.4486 12.7263 21.4045 12.9696C21.3604 13.2129 21.3902 13.4638 21.49 13.69V13.75C21.5851 13.9718 21.7429 14.161 21.9442 14.2943C22.1454 14.4275 22.3812 14.499 22.6225 14.5H22.75C23.1478 14.5 23.5294 14.658 23.8107 14.9393C24.092 15.2206 24.25 15.6022 24.25 16C24.25 16.3978 24.092 16.7794 23.8107 17.0607C23.5294 17.342 23.1478 17.5 22.75 17.5H22.6825C22.4412 17.501 22.2054 17.5725 22.0042 17.7057C21.8029 17.839 21.6451 18.0282 21.55 18.25V18.25Z"
                              stroke="#98BEE1"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4_4716">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(7 7)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="child bg-white z-10">
                          <div
                            onClick={() => {
                              getUserById(item.id);
                              setVisibleEdit(true);
                            }}
                            className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                          >
                            Sửa
                          </div>
                          <div
                            onClick={() => deleteUser(item.id)}
                            className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                          >
                            Xóa
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.fullName}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.phone}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.email}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.address}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.gender === 1 ? "Nam" : "Nữ"}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.birthday}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal
            show={visible}
            title={
              !modalType
                ? "Thêm thành viên"
                : modalType === 1
                ? "Quản lý"
                : modalType === 2
                ? "Giảng viên"
                : "Sinh viên"
            }
            handleClose={() => handleClose()}
          >
            <div className="p-10">
              {!modalType && (
                <div>
                  <div className="flex gap-x-5 justify-between">
                    <div className="flex gap-x-2 items-center">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(1);
                        }}
                      />
                      <div className="flex items-center">
                        <svg
                          width="21"
                          height="17"
                          viewBox="0 0 21 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                          <path
                            d="M19.9938 4.5C19.9938 4.302 19.9658 4.122 19.9379 3.933L21 3.024L20.0683 1.467L18.7174 1.908C18.4193 1.665 18.0839 1.476 17.7112 1.341L17.4317 0H15.5683L15.2888 1.341C14.9161 1.476 14.5807 1.665 14.2826 1.908L12.9317 1.467L12 3.024L13.0621 3.933C13.0342 4.122 13.0062 4.302 13.0062 4.5C13.0062 4.698 13.0342 4.878 13.0621 5.067L12 5.976L12.9317 7.533L14.2826 7.092C14.5807 7.335 14.9161 7.524 15.2888 7.659L15.5683 9H17.4317L17.7112 7.659C18.0839 7.524 18.4193 7.335 18.7174 7.092L20.0683 7.533L21 5.976L19.9379 5.067C19.9658 4.878 19.9938 4.698 19.9938 4.5ZM16.5 6.3C15.4752 6.3 14.6366 5.49 14.6366 4.5C14.6366 3.51 15.4752 2.7 16.5 2.7C17.5248 2.7 18.3634 3.51 18.3634 4.5C18.3634 5.49 17.5248 6.3 16.5 6.3Z"
                            fill="#42526E"
                          />
                        </svg>
                        Quản lý
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(2);
                        }}
                      />{" "}
                      <div className="flex">
                        <svg
                          width="21"
                          height="17"
                          viewBox="0 0 21 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                          <path
                            d="M12.1687 5.88192C12.2854 5.88192 12.3979 5.90218 12.5062 5.93595L14.5271 3.25948C14.6562 3.0884 14.8958 3.05689 15.0521 3.20095C15.2042 3.33827 15.225 3.58363 15.0979 3.7502L13.1 6.39741C13.2354 6.6 13.3167 6.84989 13.3167 7.12001C13.3167 7.62199 13.0375 8.05643 12.6396 8.25H20.4792C20.7667 8.25 21 7.99791 21 7.68724V0.562756C21 0.252115 20.7667 0 20.4792 0H10.5208C10.2333 0 10 0.252115 10 0.562756V5.24038L10.4708 5.88418H12.1687V5.88192Z"
                            fill="#42526E"
                          />
                        </svg>
                        Giảng viên
                      </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(3);
                        }}
                      />
                      <div className="flex">
                        <svg
                          width="11"
                          height="17"
                          viewBox="0 0 11 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                        </svg>
                        Sinh viên
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {modalType && (
                <div>
                  <div className="w-full lg:flex">
                    <div className="lg:w-1/2">
                      <div className="relative w-[124px] h-[124px]">
                        <button className="cursor-pointer absolute bottom-0 right-0">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="16" cy="16" r="16" fill="white" />
                            <circle
                              cx="15.9993"
                              cy="15.9993"
                              r="13.2571"
                              fill="#1890FF"
                            />
                            <path
                              d="M22.5984 11.2719H20.0484L19.4409 9.56938C19.399 9.45288 19.3221 9.35218 19.2207 9.28103C19.1194 9.20989 18.9985 9.17177 18.8747 9.17188H13.1222C12.8691 9.17188 12.6422 9.33125 12.5578 9.56938L11.9484 11.2719H9.39844C8.56969 11.2719 7.89844 11.9431 7.89844 12.7719V21.3219C7.89844 22.1506 8.56969 22.8219 9.39844 22.8219H22.5984C23.4272 22.8219 24.0984 22.1506 24.0984 21.3219V12.7719C24.0984 11.9431 23.4272 11.2719 22.5984 11.2719ZM15.9984 19.8219C14.3409 19.8219 12.9984 18.4794 12.9984 16.8219C12.9984 15.1644 14.3409 13.8219 15.9984 13.8219C17.6559 13.8219 18.9984 15.1644 18.9984 16.8219C18.9984 18.4794 17.6559 19.8219 15.9984 19.8219ZM14.1984 16.8219C14.1984 17.2993 14.3881 17.7571 14.7256 18.0947C15.0632 18.4322 15.521 18.6219 15.9984 18.6219C16.4758 18.6219 16.9337 18.4322 17.2712 18.0947C17.6088 17.7571 17.7984 17.2993 17.7984 16.8219C17.7984 16.3445 17.6088 15.8866 17.2712 15.5491C16.9337 15.2115 16.4758 15.0219 15.9984 15.0219C15.521 15.0219 15.0632 15.2115 14.7256 15.5491C14.3881 15.8866 14.1984 16.3445 14.1984 16.8219Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        {!dataCreate.imageId && (
                          <svg
                            width="124"
                            height="124"
                            viewBox="0 0 124 124"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="124"
                              height="124"
                              rx="5"
                              fill="#F5F5F5"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M73.0293 52.1898C73.0293 58.3086 68.1233 63.2149 62.0002 63.2149C55.8791 63.2149 50.971 58.3086 50.971 52.1898C50.971 46.071 55.8791 41.1667 62.0002 41.1667C68.1233 41.1667 73.0293 46.071 73.0293 52.1898ZM62.0002 82.8334C52.9634 82.8334 45.3335 81.3647 45.3335 75.6979C45.3335 70.0291 53.0114 68.6124 62.0002 68.6124C71.039 68.6124 78.6668 70.0812 78.6668 75.7479C78.6668 81.4167 70.989 82.8334 62.0002 82.8334Z"
                              fill="#E9E6E6"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        ref={fileRef}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                        }}
                      />
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Họ tên</span>
                        </div>
                        <div className="lg:w-[70%] mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                fullName: e.target.value,
                              });
                            }}
                            placeholder="Nhập Họ tên"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Ngày sinh</span>
                        </div>
                        <div className="lg:w-[70%] mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                birthday: e.target.value,
                              });
                            }}
                            placeholder="Nhập Ngày sinh"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Email</span>
                        </div>
                        <div className="lg:w-[70%] mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                email: e.target.value,
                              });
                            }}
                            placeholder="Nhập Email"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Tài khoản</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                username: e.target.value,
                              });
                            }}
                            placeholder="Nhập tài khoản"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Mật khẩu</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                password: e.target.value,
                              });
                            }}
                            placeholder="Nhập mật khẩu"
                            type={"password"}
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div className="mt-6 flex gap-x-4 items-center">
                          <span className="font-bold">Giới tính</span>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={1}
                              checked={dataCreate.gender === 1}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setDataCreate({
                                  ...dataCreate,
                                  gender: parseInt(e.target.value),
                                });
                              }}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Nam</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={0}
                              checked={dataCreate.gender === 0}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setDataCreate({
                                  ...dataCreate,
                                  gender: parseInt(e.target.value),
                                });
                              }}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Nữ</span>
                          </label>
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Số điện thoại</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            onChange={(e) => {
                              setDataCreate({
                                ...dataCreate,
                                phone: e.target.value,
                              });
                            }}
                            placeholder="Nhập Số điện thoại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <span className="text-red-500">*</span>
                      <span className="font-bold">Địa chỉ</span>
                    </div>
                    <div className="w-full mt-2">
                      <input
                        onChange={(e) => {
                          setDataCreate({
                            ...dataCreate,
                            address: e.target.value,
                          });
                        }}
                        placeholder="Nhập tài khoản"
                        className="p-2 rounded border w-full"
                      />
                    </div>
                  </div>
                  {modalType == 1 && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Làm việc tại</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {modalType == 3 && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Ma sinh vien</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Khoa</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">chuyen nganh</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">lop</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {modalType == 2 && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">hinh thuc</span>
                        </div>
                        <div className="w-full mt-2">
                          <select
                            className="p-2 rounded border w-full"
                            value="chon hinh thuc"
                            name=""
                            id=""
                          >
                            <option value="true">true</option>
                            <option value="true">false</option>
                          </select>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">chuyen nganh</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-red-500">*</span>
                    <span className="font-bold">ghi chú</span>
                  </div>
                  <div className="w-full mt-2">
                    <input
                      onChange={(e) => {
                        setDataCreate({
                          ...dataCreate,
                          note: e.target.value,
                        });
                      }}
                      placeholder="ghi chú"
                      className="p-2 rounded border w-full"
                    />
                  </div>
                  <div className="flex justify-end border-t px-12 py-2 gap-x-2">
                    <button
                      onClick={() => {
                        handleClose();
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        handleAddUser();
                      }}
                      className="px-4 py-2 border rounded bg-[#1890FF] text-white"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
          <Modal
            show={visibleEdit}
            title={
              !modalType
                ? "sửa thành viên"
                : modalType === 1
                ? "Quản lý"
                : modalType === 2
                ? "Giảng viên"
                : "Sinh viên"
            }
            handleClose={() => handleClose()}
          >
            <div className="p-10">
              {!modalType && (
                <div>
                  <div className="flex gap-x-5 justify-between">
                    <div className="flex gap-x-2 items-center">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(1);
                        }}
                      />
                      <div className="flex items-center">
                        <svg
                          width="21"
                          height="17"
                          viewBox="0 0 21 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                          <path
                            d="M19.9938 4.5C19.9938 4.302 19.9658 4.122 19.9379 3.933L21 3.024L20.0683 1.467L18.7174 1.908C18.4193 1.665 18.0839 1.476 17.7112 1.341L17.4317 0H15.5683L15.2888 1.341C14.9161 1.476 14.5807 1.665 14.2826 1.908L12.9317 1.467L12 3.024L13.0621 3.933C13.0342 4.122 13.0062 4.302 13.0062 4.5C13.0062 4.698 13.0342 4.878 13.0621 5.067L12 5.976L12.9317 7.533L14.2826 7.092C14.5807 7.335 14.9161 7.524 15.2888 7.659L15.5683 9H17.4317L17.7112 7.659C18.0839 7.524 18.4193 7.335 18.7174 7.092L20.0683 7.533L21 5.976L19.9379 5.067C19.9658 4.878 19.9938 4.698 19.9938 4.5ZM16.5 6.3C15.4752 6.3 14.6366 5.49 14.6366 4.5C14.6366 3.51 15.4752 2.7 16.5 2.7C17.5248 2.7 18.3634 3.51 18.3634 4.5C18.3634 5.49 17.5248 6.3 16.5 6.3Z"
                            fill="#42526E"
                          />
                        </svg>
                        Quản lý
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(2);
                        }}
                      />{" "}
                      <div className="flex">
                        <svg
                          width="21"
                          height="17"
                          viewBox="0 0 21 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                          <path
                            d="M12.1687 5.88192C12.2854 5.88192 12.3979 5.90218 12.5062 5.93595L14.5271 3.25948C14.6562 3.0884 14.8958 3.05689 15.0521 3.20095C15.2042 3.33827 15.225 3.58363 15.0979 3.7502L13.1 6.39741C13.2354 6.6 13.3167 6.84989 13.3167 7.12001C13.3167 7.62199 13.0375 8.05643 12.6396 8.25H20.4792C20.7667 8.25 21 7.99791 21 7.68724V0.562756C21 0.252115 20.7667 0 20.4792 0H10.5208C10.2333 0 10 0.252115 10 0.562756V5.24038L10.4708 5.88418H12.1687V5.88192Z"
                            fill="#42526E"
                          />
                        </svg>
                        Giảng viên
                      </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <input
                        type="radio"
                        onClick={() => {
                          setModalType(3);
                        }}
                      />
                      <div className="flex">
                        <svg
                          width="11"
                          height="17"
                          viewBox="0 0 11 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5Z"
                            fill="#42526E"
                          />
                          <path
                            d="M7.33333 6.00162H3.66667C2.73505 5.9803 1.82653 6.17048 1.13952 6.53061C0.452507 6.89075 0.0428441 7.39158 0 7.92372V10.6733C0.0145673 10.9837 0.199365 11.2836 0.528311 11.5308C0.857258 11.7779 1.31374 11.9598 1.83333 12.0507V15.8007C1.80298 16.0979 1.97806 16.3901 2.32091 16.6144C2.66376 16.8387 3.14699 16.9772 3.66667 17H7.33333C7.85301 16.9772 8.33624 16.8387 8.67909 16.6144C9.02194 16.3901 9.19702 16.0979 9.16667 15.8007V12.0507C9.68626 11.9598 10.1427 11.7779 10.4717 11.5308C10.8006 11.2836 10.9854 10.9837 11 10.6733V7.92372C10.9572 7.39158 10.5475 6.89075 9.86048 6.53061C9.17348 6.17048 8.26495 5.9803 7.33333 6.00162Z"
                            fill="#42526E"
                          />
                        </svg>
                        Sinh viên
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {modalType && (
                <div>
                  <div className="w-full lg:flex">
                    <div className="lg:w-1/2">
                      <div className="relative w-[124px] h-[124px]">
                        <button className="cursor-pointer absolute bottom-0 right-0">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="16" cy="16" r="16" fill="white" />
                            <circle
                              cx="15.9993"
                              cy="15.9993"
                              r="13.2571"
                              fill="#1890FF"
                            />
                            <path
                              d="M22.5984 11.2719H20.0484L19.4409 9.56938C19.399 9.45288 19.3221 9.35218 19.2207 9.28103C19.1194 9.20989 18.9985 9.17177 18.8747 9.17188H13.1222C12.8691 9.17188 12.6422 9.33125 12.5578 9.56938L11.9484 11.2719H9.39844C8.56969 11.2719 7.89844 11.9431 7.89844 12.7719V21.3219C7.89844 22.1506 8.56969 22.8219 9.39844 22.8219H22.5984C23.4272 22.8219 24.0984 22.1506 24.0984 21.3219V12.7719C24.0984 11.9431 23.4272 11.2719 22.5984 11.2719ZM15.9984 19.8219C14.3409 19.8219 12.9984 18.4794 12.9984 16.8219C12.9984 15.1644 14.3409 13.8219 15.9984 13.8219C17.6559 13.8219 18.9984 15.1644 18.9984 16.8219C18.9984 18.4794 17.6559 19.8219 15.9984 19.8219ZM14.1984 16.8219C14.1984 17.2993 14.3881 17.7571 14.7256 18.0947C15.0632 18.4322 15.521 18.6219 15.9984 18.6219C16.4758 18.6219 16.9337 18.4322 17.2712 18.0947C17.6088 17.7571 17.7984 17.2993 17.7984 16.8219C17.7984 16.3445 17.6088 15.8866 17.2712 15.5491C16.9337 15.2115 16.4758 15.0219 15.9984 15.0219C15.521 15.0219 15.0632 15.2115 14.7256 15.5491C14.3881 15.8866 14.1984 16.3445 14.1984 16.8219Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        {!dataCreate.imageId && (
                          <svg
                            width="124"
                            height="124"
                            viewBox="0 0 124 124"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="124"
                              height="124"
                              rx="5"
                              fill="#F5F5F5"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M73.0293 52.1898C73.0293 58.3086 68.1233 63.2149 62.0002 63.2149C55.8791 63.2149 50.971 58.3086 50.971 52.1898C50.971 46.071 55.8791 41.1667 62.0002 41.1667C68.1233 41.1667 73.0293 46.071 73.0293 52.1898ZM62.0002 82.8334C52.9634 82.8334 45.3335 81.3647 45.3335 75.6979C45.3335 70.0291 53.0114 68.6124 62.0002 68.6124C71.039 68.6124 78.6668 70.0812 78.6668 75.7479C78.6668 81.4167 70.989 82.8334 62.0002 82.8334Z"
                              fill="#E9E6E6"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        ref={fileRef}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                        }}
                      />
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Họ tên</span>
                        </div>
                        <div className="lg:w-[70%] mt-2">
                          <input
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                fullName: e.target.value,
                              });
                            }}
                            placeholder="Nhập Họ tên"
                            className="p-2 rounded border w-full"
                            value={dataSet.fullName}
                          />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Ngày sinh</span>
                        </div>
                        <div className="lg:w-[70%] mt-2">
                          <input
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                birthday: e.target.value,
                              });
                            }}
                            placeholder="Nhập Ngày sinh"
                            className="p-2 rounded border w-full"
                            value={dataSet.birthday}
                          />
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Email</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                email: e.target.value,
                              });
                            }}
                            placeholder="Nhập Email"
                            className="w-1/2 p-2 rounded border w-full"
                            value={dataSet.email}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Tài khoản</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            value={dataSet.username}
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                username: e.target.value,
                              });
                            }}
                            placeholder="Nhập tài khoản"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Mật khẩu</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            value={dataSet.password}
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                password: e.target.value,
                              });
                            }}
                            placeholder="Nhập mật khẩu"
                            type={"password"}
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div className="mt-6 flex gap-x-4 items-center">
                          <span className="font-bold">Giới tính</span>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={1}
                              checked={dataSet.gender === 1}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setDataSet({
                                  ...dataSet,
                                  gender: parseInt(e.target.value),
                                });
                              }}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Nam</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={0}
                              checked={dataSet.gender === 0}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setDataSet({
                                  ...dataSet,
                                  gender: parseInt(e.target.value),
                                });
                              }}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Nữ</span>
                          </label>
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Số điện thoại</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            value={dataSet.phone}
                            onChange={(e) => {
                              setDataSet({
                                ...dataSet,
                                phone: e.target.value,
                              });
                            }}
                            placeholder="Nhập Số điện thoại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <span className="text-red-500">*</span>
                      <span className="font-bold">Địa chỉ</span>
                    </div>
                    <div className="w-full mt-2">
                      <input
                        value={dataSet.address}
                        onChange={(e) => {
                          setDataSet({
                            ...dataSet,
                            address: e.target.value,
                          });
                        }}
                        placeholder="Nhập tài khoản"
                        className="p-2 rounded border w-full"
                      />
                    </div>
                  </div>
                  {modalType == 1 && dataSet.type === "ADMIN" && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Làm việc tại</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {modalType == 3 && dataSet.type === "TEACHER" && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Ma sinh vien</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">Khoa</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">chuyen nganh</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">lop</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {modalType == 2 && dataSet.type === "STUDENT" && (
                    <div className="w-full lg:flex">
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">hinh thuc</span>
                        </div>
                        <div className="w-full mt-2">
                          <select
                            className="p-2 rounded border w-full"
                            value="chon hinh thuc"
                            name=""
                            id=""
                          >
                            <option value="true">true</option>
                            <option value="true">false</option>
                          </select>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div>
                          <span className="text-red-500">*</span>
                          <span className="font-bold">chuyen nganh</span>
                        </div>
                        <div className="w-full mt-2">
                          <input
                            placeholder="Làm việc tại"
                            className="p-2 rounded border w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-red-500">*</span>
                    <span className="font-bold">ghi chú</span>
                  </div>
                  <div className="w-full mt-2">
                    <input
                      value={dataSet.note}
                      onChange={(e) => {
                        setDataSet({
                          ...dataSet,
                          note: e.target.value,
                        });
                      }}
                      placeholder="ghi chú"
                      className="p-2 rounded border w-full"
                    />
                  </div>
                  <div className="flex justify-end border-t px-12 py-2 gap-x-2">
                    <button
                      onClick={() => {
                        handleClose();
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        handleUpdate();
                      }}
                      className="px-4 py-2 border rounded bg-[#1890FF] text-white"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Users2;
