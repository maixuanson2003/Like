
import Modal from 'components/Common/Modal';
import Pagination from 'components/Common/Pagination';
import { useEffect, useState } from 'react';
import { createClass, deleteClassById, getClassById, updateClass } from 'services/danhmuc.service';
import request from 'utils/request';

const Class = () => {
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [courses, setCourses] = useState([])
  const [dataEdit, setDataEdit] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState(0);
  const [className, setClassName] = useState("");
  const [courseId, setCourseId] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  useEffect(() => {
    request("/api/class").then((res) => {
      const responseData = res.data;
      setData(responseData);
      handleData();
    });
  }, [render]);

  useEffect(() => {
    request("/api/course").then((res) => {
      const responseData = res.data;
      setCourses(responseData);
    });
  }, [render]);

  useEffect(() => {
    handleData();
  }, [data, page, size]);

  const handleData = () => {
    const calTotalPage = Math.ceil(data.length / size);
    setTotalPage(calTotalPage);
    const dataPagination = data.slice((page - 1) * size, page * size);
    setDataShow(dataPagination);
  };

  const handleClose = () => {
    setVisible(false);
    setVisibleEdit(false);
    setClassName("");
    setCourseId();
    setDataEdit();
  };

  const handleCreateClass = () => {
    const data = {
      name: className,
      course_id: courseId
    };
    createClass(data).then((res) => {
      handleClose();
      setRender(Date.now());
    });
  };

  const handleUpdate = () => {
    const params = {
      name: className,
      courseId,
    };
    updateClass(dataEdit.id, params).then((res) => {
      handleClose();
      setRender(Date.now());
    });
  };

  const getDataEditClass = (id) => {
    getClassById(id).then((res) => {
      const response = res.data;
      setClassName(response.name);
      setCourseId(response.courseId)
      setDataEdit(res.data);
    });
  };

  return (
    <div>
      <div className="border-b shadow flex justify-between px-10 py-2 items-center">
        <div>Lớp ({data.length})</div>
        <div>
          <button
            className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center"
            onClick={() => setVisible(true)}
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
            Thêm Lớp
          </button>
        </div>
      </div>
      <div className="p-8">
        <table className="w-full">
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
              <th className="border p-2">Tên lớp</th>
              <th className="border p-2">Khóa</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {dataShow.map((item, index) => (
              <tr className="border border-[#eee]">
                <td className="border border-[#eee] text-center p-3">
                {(page -1) * size + index +1}
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
                          getDataEditClass(item.id);
                          setVisibleEdit(true);
                        }}
                        className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                      >
                        Sửa
                      </div>
                      <div
                        className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                        onClick={() => {
                          deleteClassById(item.id);
                          setRender(Date.now());
                        }}
                      >
                        Xóa
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-[#eee] text-center p-3">
                  {item.name}
                </td>
                <td className="border border-[#eee] text-center p-3">
                  {item.courseId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        title={"Thêm Lớp"}
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex gap-x-10">
          <div className="w-full">
            <div className="font-bold">Tên lớp</div>
            <div className="mt-2 w-full">
              <input
                className="border px-4 py-2 rounded w-full"
                placeholder="Tên lớp"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold">Khóa</div>
            <div className="mt-2 w-full">
              <select
                onChange={(e) => {
                  setCourseId(e.target.value)
                }}
                className="border px4 py-2 w-full"
              >
                {courses.map((item, index) => (
                  <option value={item.id} key={index}>{item.name}</option>
                ))}
              </select>
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
              handleCreateClass();
            }}
          >
            Thêm
          </button>
        </div>
      </Modal>
      <Modal
        show={visibleEdit}
        title="Sửa lớp"
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex gap-x-10">
          <div className="w-full">
            <div className="font-bold">Tên lớp</div>
            <div className="mt-2 w-full">
              <input
                className="border px-4 py-2 rounded w-full"
                defaultValue={className}
                placeholder="Tên lớp"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold">Khóa</div>
            <div className="mt-2 w-full">
              <select
                defaultValue={courseId}
                onChange={(e) => {
                  console.log(e);
                }}
                className="border px4 py-2"
              >
                {courses.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
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
    </div>
  );
}

export default Class