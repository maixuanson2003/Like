import Modal from "components/Common/Modal";
import Pagination from "components/Common/Pagination";
import React, { useEffect, useRef, useState } from "react";
import { createTopicOfYear } from "services/danhmuc.service";
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
const Student = () => {
    return (
        <div>
            <div>
                <div className="border-b shadow flex justify-between px-10 py-2 items-center">
                    <div>Do an</div>
                </div>
                <div className="p-8">
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
                                    <th className="border p-2">Dot</th>
                                    <th className="border p-2">Ten nhom</th>
                                    <th className="border p-2">De tai</th>
                                    <th className="border p-2">so thanh vien</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
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

                                    <th className=" p-2 w-32">
                                        <button className="border p-2 rounded text-blue-500">
                                            Tìm Kiếm
                                        </button>
                                    </th>
                                    <th >
                                        <input className="border p-2 w-full" type="text" />
                                    </th>
                                    <th>
                                        <input className="border p-2 w-full" type="text" />
                                    </th>

                                    <th>
                                        <input className="border p-2" type="text" />
                                    </th>
                                    <th>
                                        <input className="border p-2" type="text" />
                                    </th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default Student;