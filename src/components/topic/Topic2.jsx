import Modal from "components/Common/Modal";
import Pagination from "components/Common/Pagination";
import React, { useEffect, useRef, useState } from "react";
import { createTopicOfYear, deleteTopicOfYear } from "services/danhmuc.service";
import {
  createField,
  getFieldById,
  updateField,
} from "services/danhmuc.service";
import request from "utils/request";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const Topic2 = () => {
  const [createDeTai, setCreateDeTai] = useState({
    content: "",
    description: "",
    isApply: true,
    isDraft: true,
    name: "",
  });
  const [showListaddTopic, setShowListaddTopic] = useState(false);
  const [dataAdd, setDataAdd] = useState([]);
  const [addTopic, setAddTopic] = useState(false);
  const [ListTopicShow, setListTopicShow] = useState(false);
  const [year, setYear] = useState();
  const [yearDelete, setYearDelete] = useState();
  const [TopicOfYear, setTopicOfYear] = useState(false);
  const [ListTopicOfYear, setListTopicOfYear] = useState([]);
  const [dataOfYear, setDataOfYear] = useState([]);
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [dataEdit, setDataEdit] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState(0);
  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [modalType, setModalType] = useState();
  const [dataCreate, setDataCreate] = useState({
    imageId: null,
    username: "",
    password: "",
    fullName: "",
    gender: 0,
    birthday: "",
    phone: "",
    email: "",
    address: "",
    workPlace: "",
    note: "",
  });
  const hanldeCheckBox = (event) => {
    const value = event.target.value;
    console.log(value);
    if (event.target.checked) {
      setDataAdd([...dataAdd, value]);
    } else {
      setDataAdd(dataAdd.filter((item) => item != value));
    }
  };
  const hanldeDelete = (value) => {
    setDataAdd(dataAdd.filter((item) => item != value));
  };

  const handleDataToAdd = async () => {
    await Promise.all(
      dataAdd.map(async (element) => {
        const param = {
          year: year,
        };
        const dataHandle = dataShow.filter(
          (item) => item.id === Number(element)
        );
        console.log(dataHandle);

        if (dataHandle.length > 0) {
          console.log(dataHandle[0].content);

          const dataPost = {
            content: dataHandle[0].content,
            description: dataHandle[0].description,
            isApply: true,
            isDraft: true,
            name: dataHandle[0].name,
            timeStart: dataHandle[0].timeStart,
          };

          try {
            const res = await createTopicOfYear(dataPost, param);
            console.log(res);
          } catch (error) {
            console.error(
              "Error creating topic:",
              error.response ? error.response.data : error.message
            );
          }
        }
      })
    );
    return 1;
  };

  const handleAddTopicOfyear = async () => {
    const data = await handleDataToAdd();
    console.log(data);
    setRender(Date.now());

    handleClose();
  };

  useEffect(() => {
    request("/api/topic", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responseData = res.data;
      setDataShow(responseData);
    });
  }, [render]);
  useEffect(() => {
    request("/api/topic", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responseData = res.data;
      setDataShow(responseData);
    });
  }, []);
  useEffect(() => {
    request("/api/topics-of-year/topic-year", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responseData = res.data;
      responseData = responseData.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setDataOfYear(responseData);
    });
  }, [render]);
  useEffect(() => {
    request("/api/topics-of-year/topic-year", {
      params: {
        page_index: page - 1,
        page_size: size,
      },
    }).then((res) => {
      let responseData = res.data;
      responseData = responseData.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setDataOfYear(responseData);
    });
  }, []);

  const handleClose = () => {
    setVisible(false);
    setVisibleEdit(false);
    setListTopicShow(false);
    setAddTopic(false);
    setFieldCode("");
    setFieldName("");
    setDataEdit();
    setModalType(false);
  };
  const handleClose2 = () => {
    setShowListaddTopic(false);
    setAddTopic(true);
  };
  const handleDeleteTopicOfYear = async (year) => {
    console.log(ListTopicOfYear);
    const result = dataOfYear.find((element) => element.year === year);
    console.log(result);

    if (result) {
      await Promise.all(
        result.listTopic.map(async (element) => {
          const params = {
            year: year,
            id: element[0],
          };
          await deleteTopicOfYear(params);
        })
      );
      setRender(Date.now());
    }
  };

  const handleCreateField = () => {
    console.log("Selected Items:", dataAdd);
    handleClose2();
  };

  const handleUpdate = () => {
    const data = {
      name: fieldName,
      code: fieldCode,
    };
    updateField(dataEdit.id, data)
      .then((res) => {
        handleClose();
        setRender(Date.now());
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const getDataEditField = (id) => {
    getFieldById(id).then((res) => {
      const response = res.data;
      setFieldCode(response.code);
      setFieldName(response.name);
      setDataEdit(res.data);
    });
  };
  const getTopicOfYearById = (year) => {
    setYear(year);
    dataOfYear.forEach((element) => {
      if (element.year === year) {
        console.log(element.listTopic);
        setListTopicOfYear(element.listTopic);
      }
    });
  };
  return (
    <div>
      <div>
        <div className="border-b shadow flex justify-between px-10 py-2 items-center">
          <div>Kho Đề Tài </div>
          <div>
            <button
              className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center"
              onClick={() => {
                if (TopicOfYear) {
                  setAddTopic(true);
                }
                if (!TopicOfYear) {
                  setVisible(true);
                }
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10.7125H15"
                  stroke="#F7F7F8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15.6506V5.77443"
                  stroke="#F7F7F8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {TopicOfYear ? "them de tai theo nam" : "them de tai"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-x-2 ">
          <div
            onClick={() => setTopicOfYear(false)}
            className="border p-2 w-12 rounded-lg bg-blue-500"
          >
            Kho
          </div>
          <div
            onClick={() => setTopicOfYear(true)}
            className="border p-2 w-48 rounded-lg bg-blue-500"
          >
            de tai theo nam
          </div>
          <div className="border p-2 w-48 rounded-lg bg-blue-500">thong ke</div>
        </div>
        <div className="w-full ">
          <table className="w-full h-[47px]">
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
                <th className="border p-2 w-[350px]">
                  {TopicOfYear ? "Nam de tai" : "Tên Đề Tài"}
                </th>
                <th className="border p-2 w-[200px]">Mô Tả</th>
                <th className="border p-2">Trạng Thái</th>
                <th className="border p-2">Ngày Tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border p-2 w-12">
                  <button className="border p-2 ">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.875 6.42037L16.0796 5.625L13.5 8.20463L10.9204 5.625L10.125 6.42037L12.7046 9L10.125 11.5791L10.9209 12.375L13.5 9.79537L16.0802 12.375L16.875 11.5802L14.2954 9L16.875 6.42037Z"
                        fill="#1890FF"
                      />
                      <path
                        d="M2.25 2.25C1.95163 2.25 1.66548 2.36853 1.4545 2.5795C1.24353 2.79048 1.125 3.07663 1.125 3.375V5.15812C1.12496 5.30594 1.15405 5.45232 1.21061 5.5889C1.26717 5.72547 1.35008 5.84955 1.45463 5.95406L5.625 10.125V14.625C5.625 14.9234 5.74353 15.2095 5.9545 15.4205C6.16548 15.6315 6.45163 15.75 6.75 15.75H9C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625V13.5H9V14.625H6.75V9.65812L6.42037 9.32906L2.25 5.15869V3.375H13.5V4.5H14.625V3.375C14.625 3.07663 14.5065 2.79048 14.2955 2.5795C14.0845 2.36853 13.7984 2.25 13.5 2.25H2.25Z"
                        fill="#1890FF"
                      />
                    </svg>
                  </button>
                </th>
                <th className="border p-2 w-32">
                  <button className="border p-2 rounded text-blue-500">
                    Tìm Kiếm
                  </button>
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    className="p-2 border rounded text-gray-600 font-sans font-medium "
                  />
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    className=" w-full p-2 border rounded text-gray-600 font-sans font-medium"
                  />
                </th>
                <th className="border p-2">
                  <select
                    className="p-2 border rounded text-gray-600 font-sans font-medium"
                    name=""
                    id=""
                  >
                    <option value="">nhap</option>
                    <option value="">xet duyet</option>
                    <option value="">Ap dung</option>
                  </select>
                </th>
                <th className="border p-2">
                  <input
                    type="text"
                    className="p-2 border rounded text-gray-600 font-sans font-medium"
                  />
                </th>
              </tr>
              {dataShow &&
                !TopicOfYear &&
                dataShow.map((item, index) => (
                  <tr className="border border-[#eee]">
                    <td className="border border-[#eee] text-center p-3">
                      {(page - 1) * size + index + 1}
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
                          <div className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20">
                            Sửa
                          </div>
                          <div className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20">
                            Xóa
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.name}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.description}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.isApply && !item.isDraft
                        ? "apdung"
                        : !item.isApply && item.isDraft
                        ? "nhap"
                        : "xetduyet"}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.timeStart}
                    </td>
                  </tr>
                ))}
              {dataOfYear &&
                TopicOfYear &&
                dataOfYear.map((item, index) => (
                  <tr className="border border-[#eee]">
                    <td className="border border-[#eee] text-center p-3">
                      {(page - 1) * size + index + 1}
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
                          <div className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20">
                            Sửa
                          </div>
                          <div
                            onClick={() => handleDeleteTopicOfYear(item.year)}
                            className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                          >
                            Xóa
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.year}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.count}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      <h1
                        onClick={() => {
                          getTopicOfYearById(item.year);
                          setListTopicShow(true);
                        }}
                        className="text-blue-500 cursor-pointer"
                      >
                        danh sach de tai
                      </h1>
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.timeCreate}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-10">
          <Pagination
            currentPage={page}
            pageSize={size}
            totalRow={data.length}
            onPageChange={setPage}
            onSizeChange={setSize}
          />
        </div>
      </div>
      <Modal
        show={visible}
        title={!modalType ? "Thêm Đề Tài" : modalType === 2}
        handleClose={() => handleClose()}
      >
        <div className="p-10">
          <div className=" w-full h-[80px]">
            <span className="text-xl font-bold ">Tên Đề Tài</span>
            <input
              className="w-full h-[30px] border rounded text-gray-600 "
              type="text"
              placeholder="Nhập tên đề tài "
            ></input>
          </div>
          <div className="w-full h-[100px] pt-1">
            <span className="text-xl font-bold ">Mô Tả </span>
            <input
              className="w-[750px] h-[30px] mt-3 p-2 border rounded text-gray-600 "
              type="text"
              placeholder="Nhập mô tả "
            />
          </div>
          <div className="w-full h-[300px] pt-1">
            <div>
              <span className="text-xl font-bold ">Nội Dung</span>
            </div>
            <div className="w-full h-[250px]">
              <CKEditor
                className="h-[200px]"
                id="noiDung"
                editor={ClassicEditor}
                data={createDeTai.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCreateDeTai({
                    ...createDeTai,
                    content: data,
                  });
                }}
                config={{
                  toolbar: {
                    items: ["undo", "redo", "|", "bold", "italic"],
                  },
                  plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                  licenseKey: "<YOUR_LICENSE_KEY>",
                  mention: {
                    // Mention configuration
                  },
                  initialData: "",
                }}
              />
            </div>
          </div>
          <div className="w-full h-[100px] pt-1"></div>
        </div>
      </Modal>
      <Modal
        show={visibleEdit}
        title="Sửa ngành nghề"
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex gap-x-10">
          <div className="w-full">
            <div className="font-bold">Mã ngành nghề</div>
            <div className="mt-2 w-full">
              <input
                className="border px-4 py-2 rounded w-full"
                value={fieldCode}
                placeholder="Nhập mã"
                onChange={(e) => {
                  setFieldCode(e.target.value);
                }}
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold">Tên ngành nghề</div>
            <div className="mt-2 w-full">
              <input
                className="border px-4 py-2 rounded w-full"
                placeholder="Nhập mã"
                onChange={(e) => {
                  setFieldName(e.target.value);
                }}
                value={fieldName}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t px-12 py-2 gap-x-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              handleClose();
            }}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 border rounded bg-[#1890FF] text-white"
            onClick={() => {
              handleUpdate();
            }}
          >
            Sửa
          </button>
        </div>
      </Modal>
      <Modal
        show={ListTopicShow}
        title={`danh sach de tai nam ${year}`}
        handleClose={() => handleClose()}
      >
        <div>
          <div className="p-8">
            <div className="w-full">
              <table className="w-full h-[47px]">
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

                    <th className="border p-2 w-[200px]">ten de tai</th>
                  </tr>
                </thead>
                <tbody>
                  {ListTopicOfYear &&
                    ListTopicOfYear.map((item, index) => (
                      <tr className="border border-[#eee]">
                        <td className="border border-[#eee] text-center p-3">
                          {(page - 1) * size + index + 1}
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
                              <div className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20">
                                Sửa
                              </div>
                              <div className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20">
                                Xóa
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-[#eee] text-center p-3">
                          {item[0]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={addTopic}
        title={"Thêm ngành nghề"}
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex gap-x-10">
          <div className="w-full">
            <div className="font-bold">Mã ngành nghề</div>

            <select
              onChange={(e) => setYear(e.target.value)}
              className="border px-4 py-2 rounded w-full"
              placeholder="chon nam"
              name=""
              id="nam"
            >
              <option></option>
              <option value="2018">2018</option>
              <option value="2020">2020</option>
              <option value="2312">2312</option>
              <option value="2040">2040</option>
              <option value="2017">2017</option>
              <option value="2200">2200</option>
              <option value="2300">2300</option>
              <option value="2310">2310</option>
              <option value="2331">2331</option>
              <option value="2431">2431</option>
              <option value="2451">2451</option>
            </select>
          </div>
        </div>
        <div>
          <div className="p-8">
            <div>
              <div className="border-b shadow flex justify-between px-3 py-2 items-center">
                <div> Đề Tài </div>
                <div>
                  <button
                    className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center"
                    onClick={() => {
                      setShowListaddTopic(true);
                      setAddTopic(false);
                    }}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10.7125H15"
                        stroke="#F7F7F8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 15.6506V5.77443"
                        stroke="#F7F7F8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    CHON De Tai
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              <table className="w-full h-[47px]">
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

                    <th className="border p-2 w-[200px]">ten de tai</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAdd &&
                    dataAdd.map((item, index) => (
                      <tr className="border border-[#eee]">
                        <td className="border border-[#eee] text-center p-3">
                          {(page - 1) * size + index + 1}
                        </td>
                        <td className="border border-[#eee] text-center p-3">
                          <div
                            onClick={() => hanldeDelete(item)}
                            className="flex items-center justify-center"
                          >
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.75 4.375H12.25C12.25 3.91087 12.0656 3.46575 11.7374 3.13756C11.4092 2.80937 10.9641 2.625 10.5 2.625C10.0359 2.625 9.59075 2.80937 9.26256 3.13756C8.93437 3.46575 8.75 3.91087 8.75 4.375ZM7.4375 4.375C7.4375 3.97283 7.51671 3.57459 7.67062 3.20303C7.82452 2.83147 8.05011 2.49387 8.33449 2.20949C8.61887 1.92511 8.95647 1.69952 9.32803 1.54562C9.69959 1.39171 10.0978 1.3125 10.5 1.3125C10.9022 1.3125 11.3004 1.39171 11.672 1.54562C12.0435 1.69952 12.3811 1.92511 12.6655 2.20949C12.9499 2.49387 13.1755 2.83147 13.3294 3.20303C13.4833 3.57459 13.5625 3.97283 13.5625 4.375H18.5938C18.7678 4.375 18.9347 4.44414 19.0578 4.56721C19.1809 4.69028 19.25 4.8572 19.25 5.03125C19.25 5.2053 19.1809 5.37222 19.0578 5.49529C18.9347 5.61836 18.7678 5.6875 18.5938 5.6875H17.4388L16.415 16.2846C16.3365 17.0966 15.9583 17.8502 15.3542 18.3985C14.7502 18.9467 13.9635 19.2503 13.1477 19.25H7.85225C7.03663 19.2501 6.25021 18.9464 5.64633 18.3982C5.04245 17.8499 4.66439 17.0965 4.58588 16.2846L3.56125 5.6875H2.40625C2.2322 5.6875 2.06528 5.61836 1.94221 5.49529C1.81914 5.37222 1.75 5.2053 1.75 5.03125C1.75 4.8572 1.81914 4.69028 1.94221 4.56721C2.06528 4.44414 2.2322 4.375 2.40625 4.375H7.4375ZM9.1875 8.53125C9.1875 8.3572 9.11836 8.19028 8.99529 8.06721C8.87222 7.94414 8.7053 7.875 8.53125 7.875C8.3572 7.875 8.19028 7.94414 8.06721 8.06721C7.94414 8.19028 7.875 8.3572 7.875 8.53125V15.0938C7.875 15.2678 7.94414 15.4347 8.06721 15.5578C8.19028 15.6809 8.3572 15.75 8.53125 15.75C8.7053 15.75 8.87222 15.6809 8.99529 15.5578C9.11836 15.4347 9.1875 15.2678 9.1875 15.0938V8.53125ZM12.4688 7.875C12.6428 7.875 12.8097 7.94414 12.9328 8.06721C13.0559 8.19028 13.125 8.3572 13.125 8.53125V15.0938C13.125 15.2678 13.0559 15.4347 12.9328 15.5578C12.8097 15.6809 12.6428 15.75 12.4688 15.75C12.2947 15.75 12.1278 15.6809 12.0047 15.5578C11.8816 15.4347 11.8125 15.2678 11.8125 15.0938V8.53125C11.8125 8.3572 11.8816 8.19028 12.0047 8.06721C12.1278 7.94414 12.2947 7.875 12.4688 7.875ZM5.89225 16.1586C5.93945 16.6457 6.16634 17.0977 6.5287 17.4266C6.89106 17.7555 7.3629 17.9376 7.85225 17.9375H13.1477C13.6371 17.9376 14.1089 17.7555 14.4713 17.4266C14.8337 17.0977 15.0606 16.6457 15.1078 16.1586L16.121 5.6875H4.879L5.89225 16.1586Z"
                                fill="#42526E"
                              />
                            </svg>
                          </div>
                        </td>
                        <td className="border border-[#eee] text-center p-3">
                          {item}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t px-12 py-2 gap-x-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              handleClose();
            }}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 border rounded bg-[#1890FF] text-white"
            onClick={() => {
              handleAddTopicOfyear();
            }}
          >
            Thêm
          </button>
        </div>
      </Modal>
      <Modal
        show={showListaddTopic}
        title={"Thêm ngành nghề"}
        handleClose={() => handleClose2()}
      >
        <div className="py-6 px-12 flex gap-x-10">
          <div className="w-full ">
            <table className="w-full h-[47px]">
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
                  <th className="border p-2 w-[350px]">"Tên Đề Tài"</th>

                  <th className="border p-2">Ngày Tạo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="border p-2 w-12">
                    <button className="border p-2 ">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.875 6.42037L16.0796 5.625L13.5 8.20463L10.9204 5.625L10.125 6.42037L12.7046 9L10.125 11.5791L10.9209 12.375L13.5 9.79537L16.0802 12.375L16.875 11.5802L14.2954 9L16.875 6.42037Z"
                          fill="#1890FF"
                        />
                        <path
                          d="M2.25 2.25C1.95163 2.25 1.66548 2.36853 1.4545 2.5795C1.24353 2.79048 1.125 3.07663 1.125 3.375V5.15812C1.12496 5.30594 1.15405 5.45232 1.21061 5.5889C1.26717 5.72547 1.35008 5.84955 1.45463 5.95406L5.625 10.125V14.625C5.625 14.9234 5.74353 15.2095 5.9545 15.4205C6.16548 15.6315 6.45163 15.75 6.75 15.75H9C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625V13.5H9V14.625H6.75V9.65812L6.42037 9.32906L2.25 5.15869V3.375H13.5V4.5H14.625V3.375C14.625 3.07663 14.5065 2.79048 14.2955 2.5795C14.0845 2.36853 13.7984 2.25 13.5 2.25H2.25Z"
                          fill="#1890FF"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="border p-2 w-32">
                    <button className="border p-2 rounded text-blue-500">
                      Tìm Kiếm
                    </button>
                  </th>
                  <th className="border p-2">
                    <input
                      type="text"
                      className="p-2 border rounded text-gray-600 font-sans font-medium "
                    />
                  </th>
                  <th className="border p-2">
                    <input
                      type="text"
                      className=" w-full p-2 border rounded text-gray-600 font-sans font-medium"
                    />
                  </th>
                </tr>
                {dataShow &&
                  dataShow.map((item, index) => (
                    <tr className="border border-[#eee]">
                      <td className="border border-[#eee] text-center p-3">
                        {(page - 1) * size + index + 1}
                      </td>
                      <td className="border border-[#eee] text-center p-3">
                        <input
                          onChange={hanldeCheckBox}
                          type="checkbox"
                          name=""
                          id=""
                          value={item.id}
                        />
                      </td>
                      <td className="border border-[#eee] text-center p-3">
                        {item.name}
                      </td>

                      <td className="border border-[#eee] text-center p-3">
                        {item.timeStart}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end border-t px-12 py-2 gap-x-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              handleClose2();
            }}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 border rounded bg-[#1890FF] text-white"
            onClick={() => {
              handleCreateField();
            }}
          >
            Thêm
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Topic2;
