import Modal from "components/Common/Modal";
import Pagination from "components/Common/Pagination";
import React, { useEffect, useState } from "react";
import {
  createProject,
  getProjectById,
  updateBatchProject,
  deleteProjectById,
} from "services/danhmuc.service";
import request from "utils/request";
const Topic = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [rerender, setReRender] = useState();
  const [dataTake, setDataTake] = useState([]);
  const [Id, setId] = useState();
  const [visibleedit, setVisibleEdit] = useState(false);
  const [dataSet, setDataSet] = useState({
    name: "",
    time_end: "",
    time_start: "",
    year: "",
  });
  const handleDelete = (id) => {
    deleteProjectById(id).then((res) => {
      setReRender(Date.now());
    });
  };
  const handleClose = () => {
    setVisible(false);
    setVisibleEdit(false);
    setDataSet({
      name: "",
      time_end: "",
      time_start: "",
      year: "",
    });
  };
  const handleGetProjectById = (id) => {
    getProjectById(id).then((res) => {
      const dataDetails = res.data;
      setDataTake(dataDetails);
      setId(dataDetails.id);
    });
  };

  const handleCreate = () => {
    const projectData = {
      name: dataSet.name,
      time_end: dataSet.time_end,
      time_start: dataSet.time_start,
      year: dataSet.year,
    };
    createProject(projectData).then((res) => {
      handleClose();
      setReRender(Date.now());
    });
  };
  const handleUpdate = () => {
    const projectData = {
      name: dataTake.name,
      time_end: dataTake.time_end,
      time_start: dataTake.time_start,
      year: dataTake.year,
    };
    updateBatchProject(Id, projectData).then((res) => {
      handleClose();
      setReRender(Date.now());
    });
  };
  useEffect(() => {
    request("/api/batch-project").then((response) => {
      const getData = response.data;
      setData(getData);
    });
  }, []);
  useEffect(() => {
    request("/api/batch-project").then((response) => {
      const getData = response.data;
      setData(getData);
    });
  }, [rerender]);
  return (
    <div>
      <div className="border-b shadow flex justify-between px-10 py-2 items-center">
        <div>Kho de tai ()</div>
        <div>
          <button
            onClick={() => setVisible(true)}
            className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center"
          >
            Them de tai
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-x-2 ">
          <div className="border p-2 w-12 rounded-lg bg-blue-500">Kho</div>
          <div className="border p-2 w-48 rounded-lg bg-blue-500">
            de tai theo nam
          </div>
          <div className="border p-2 w-48 rounded-lg bg-blue-500">thong ke</div>
        </div>
        <div className="w-full mt-1.5 ">
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
                <th className="border p-2">Ap dung de tai nam</th>
                <th className="border p-2">Ten dot</th>
                <th className="border p-2">Thoi gian bat dau</th>
                <th className="border p-2">Thoi gian ket thuc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <button>reset</button>
                </th>

                <th>
                  <button className="px-4 py-2 border bg-blue-500 text-white flex gap-x-2 items-center">
                    tim kiem
                  </button>
                </th>
                <th colSpan={2}>
                  <input className="border p-2 w-2/3" type="text" />
                </th>

                <th>
                  <input
                    className="border p-2"
                    type="date"
                    id="date"
                    name="date"
                    required
                  />
                </th>
                <th>
                  <input
                    className="border p-2"
                    type="date"
                    id="date"
                    name="date"
                    required
                  />
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
                              handleGetProjectById(item.id);
                              setVisibleEdit(true);
                            }}
                            className="p-2 bg-white cursor-pointer hover:bg-gray-100 w-20"
                          >
                            Sửa
                          </div>
                          <div
                            onClick={() => handleDelete(item.id)}
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
                      {item.name}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.timeStart}
                    </td>
                    <td className="border border-[#eee] text-center p-3">
                      {item.timeEnd}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={visible}
        title={"Thêm ngành nghề"}
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex flex-col gap-x-10">
          <div className="w-full">
            <div className="font-bold">Mã ngành nghề</div>

            <select
              onChange={(e) => {
                setDataSet({
                  ...dataSet,
                  year: e.target.value,
                });
              }}
              className="border px-4 py-2 rounded w-full"
              placeholder="chon nam"
              name=""
              id="nam"
            >
              <option value="">chon nam</option>
              <option value="2018">2018</option>
              <option value="2020">2020</option>
              <option value="2312">2312</option>
              <option value="12313">12313</option>
              <option value="44444">44444</option>
              <option value="2222">2222</option>
            </select>
          </div>
          <div className="w-full">
            <div className="font-bold">Tên ngành nghề</div>
            <div className="mt-2 w-full">
              <input
                onChange={(e) => {
                  setDataSet({
                    ...dataSet,
                    name: e.target.value,
                  });
                }}
                className="border px-4 py-2 rounded w-full"
                placeholder="Tên ngành nghề"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-x-10">
            <div className="w-full">
              <div className="font-bold">ngay bat dau</div>
              <input
                onChange={(e) => {
                  setDataSet({
                    ...dataSet,
                    time_start: e.target.value,
                  });
                }}
                className="border p-2 w-full"
                type="date"
                id="date"
                name="date"
                required
              />
            </div>
            <div className="w-full">
              <div className="font-bold">ngay ket thuc</div>
              <input
                onChange={(e) => {
                  setDataSet({
                    ...dataSet,
                    time_end: e.target.value,
                  });
                }}
                className="border p-2 w-full"
                type="date"
                id="date"
                name="date"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t px-12 py-2 gap-x-2">
          <button className="px-4 py-2 border rounded">Hủy</button>
          <button
            onClick={() => {
              handleCreate();
            }}
            className="px-4 py-2 border rounded bg-[#1890FF] text-white"
          >
            Thêm
          </button>
        </div>
      </Modal>
      <Modal
        show={visibleedit}
        title={"Edit"}
        handleClose={() => handleClose()}
      >
        <div className="py-6 px-12 flex flex-col gap-x-10">
          <div className="w-full">
            <div className="font-bold">Mã ngành nghề</div>

            <select
              onChange={(e) => {
                setDataTake({
                  ...dataTake,
                  year: e.target.value,
                });
              }}
              className="border px-4 py-2 rounded w-full"
              placeholder="chon nam"
              name=""
              id="nam"
            >
              <option value={dataTake.year}>{dataTake.year}</option>
              <option value="2018">2018</option>
              <option value="2020">2020</option>
              <option value="2312">2312</option>
              <option value="12313">12313</option>
              <option value="44444">44444</option>
              <option value="2222">2222</option>
            </select>
          </div>
          <div className="w-full">
            <div className="font-bold">Tên dot</div>
            <div className="mt-2 w-full">
              <input
                onChange={(e) => {
                  setDataTake({
                    ...dataTake,
                    name: e.target.value,
                  });
                }}
                value={dataTake.name}
                className="border px-4 py-2 rounded w-full"
                placeholder="Tên ngành nghề"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-x-10">
            <div className="w-full">
              <div className="font-bold">ngay bat dau</div>
              <input
                onChange={(e) => {
                  setDataTake({
                    ...dataTake,
                    time_start: e.target.value,
                  });
                }}
                value={dataTake.timeStart}
                className="border p-2 w-full"
                type="date"
                id="date"
                name="date"
                required
              />
            </div>
            <div className="w-full">
              <div className="font-bold">ngay ket thuc</div>
              <input
                onChange={(e) => {
                  setDataTake({
                    ...dataTake,
                    time_end: e.target.value,
                  });
                }}
                value={dataTake.timeEnd}
                className="border p-2 w-full"
                type="date"
                id="date"
                name="date"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t px-12 py-2 gap-x-2">
          <button className="px-4 py-2 border rounded">Hủy</button>
          <button
            onClick={() => {
              handleUpdate();
            }}
            className="px-4 py-2 border rounded bg-[#1890FF] text-white"
          >
            Thêm
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Topic;
