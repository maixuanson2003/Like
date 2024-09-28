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
    Essentials,
    Bold,
    ClassicEditor,
    Italic,
    Underline,
    Strikethrough,
    List,
    Paragraph,
    Heading,
    Alignment
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
const DetailGroup = () => {
    const [visible, setVisible] = useState(false);
    const handleClose = () => {
        setVisible(false)
    }
    return (
        <div>
            <div>
                <div className="border-b shadow flex justify-between px-10 py-2 items-center">
                    <div>Chi tiet nhom 1</div>
                </div>
                <div className="p-8">
                    <div className="w-full mt-1.5 shadow flex justify-between px-10 py-2  ">
                        <div>
                            <div className="flex justify-between  gap-x-2 ">
                                <h1>dot 1</h1>
                                <h1>4/8/2020-4/8/2021</h1>

                            </div>
                            <div>nhom 1</div>
                            <div>de tai xay dung web site A</div>
                        </div>
                        <div className="border p-2 w-32">
                            <h1>Chung nhan</h1>
                        </div>

                    </div>
                    <div className="w-full mt-1.5 ">
                        <table className="w-full">
                            <thead>
                                <tr className="border border-[#eee] bg-[#F0F0F0]">
                                    <th className="border p-2 w-12">STT</th>
                                    <th className="border p-2  text-center">
                                        Mã sinh viên
                                    </th>
                                    <th className="border p-2">Họ và Tên</th>
                                    <th className="border p-2">Vai trò</th>
                                    <th className="border p-2">Báo Cáo</th>
                                    <th className="border p-2">Điểm cá nhân</th>
                                    <th className="border p-2">Điểm nhóm</th>
                                </tr>
                            </thead>
                            <tbody>


                            </tbody>
                        </table>

                    </div>
                    <div className="w-full mt-2 border">
                        <div className="w-full flex justify-between">
                            <button onClick={() => setVisible(true)} className="border p-2 mt-2  bg-blue-500">
                                Them cong viec

                            </button >

                        </div>
                        <div className="w-full h-[300px] flex justify-center items-center border mt-2">
                            <h1>chua co phan cong cong vec</h1>

                        </div>

                    </div>
                    <Modal
                        show={visible}
                        title={"Thêm ngành nghề"}
                        handleClose={() => handleClose()}
                    >
                        <div className="py-6 px-12">
                            <div>
                                <span className="text-red-500">*</span>
                                <span className="font-bold">ghi chú</span>
                            </div>
                            <div className="w-full mt-2">
                                <input
                                    // value={dataSet.note}
                                    // onChange={(e) => {
                                    //     setDataSet({
                                    //         ...dataSet,
                                    //         note: e.target.value,
                                    //     });
                                    // }}
                                    placeholder="ghi chú"
                                    className="p-2 rounded border w-full"
                                />
                            </div>
                            <div className="w-full mt-2 flex gap-x-2">
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Thoi gian bat dau</span>
                                    </div>
                                    <div className="w-full mt-2">
                                        <input
                                            // value={dataSet.note}
                                            // onChange={(e) => {
                                            //     setDataSet({
                                            //         ...dataSet,
                                            //         note: e.target.value,
                                            //     });
                                            // }}
                                            placeholder="ghi chú"
                                            className="p-2 rounded border w-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Thoi gian bat dau</span>
                                    </div>
                                    <div className="w-full mt-2">
                                        <input
                                            // value={dataSet.note}
                                            // onChange={(e) => {
                                            //     setDataSet({
                                            //         ...dataSet,
                                            //         note: e.target.value,
                                            //     });
                                            // }}
                                            placeholder="ghi chú"
                                            className="p-2 rounded border w-full"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="w-full h-[350px] mt-2">
                                <CKEditor
                                    className="h-[200px]"
                                    id="noiDung"
                                    editor={ClassicEditor}
                                    // data={createDeTai.content}
                                    // onChange={(event, editor) => {
                                    //     const data = editor.getData();
                                    //     setCreateDeTai({
                                    //         ...createDeTai,
                                    //         content: data,
                                    //     });
                                    // }}
                                    config={{
                                        toolbar: {
                                            items: [ 'heading', '|',
                                                'bold', 'italic', 'underline', 'strikethrough', '|',
                                                'numberedList', 'bulletedList', '|',
                                                'alignment', '|', // Optional: for text alignment
                                                'undo', 'redo']

                                        },
                                        plugins: [Essentials,
                                            Bold,
                                            Italic,
                                            Underline,
                                            Strikethrough,
                                            List,
                                            Paragraph,
                                            Heading,
                                            Alignment],
                                        licenseKey: "<YOUR_LICENSE_KEY>",
                                        mention: {
                                            // Mention configuration
                                        },
                                        initialData: "",
                                    }}
                                />
                            </div>
                            <div className="w-full mt-2 flex gap-x-2">
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Chon Thanh Vien</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Trang thai</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full mt-2">
                                <div>Cong viec</div>
                                <input type="text" className="border p-2 h-[47px] mt-2 w-full" />
                            </div>
                            <div className="w-full mt-2 flex gap-x-2">
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Chon Thanh Vien</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Trang thai</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full mt-2">
                                <div>Cong viec</div>
                                <input type="text" className="border p-2 h-[47px] mt-2 w-full" />
                            </div>
                            <div className="w-full mt-2 flex gap-x-2">
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Chon Thanh Vien</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Trang thai</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full mt-2">
                                <div>Cong viec</div>
                                <input type="text" className="border p-2 h-[47px] mt-2 w-full" />
                            </div>
                            <div className="w-full mt-2 flex gap-x-2">
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Chon Thanh Vien</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div>
                                        <span className="text-red-500">*</span>
                                        <span className="font-bold">Trang thai</span>
                                    </div>
                                    <div className="w-full mt-2">

                                        <select className="p-2 rounded border w-full" name="" id="">
                                            <option value=""></option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                            <option value="">ss</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full mt-2">
                                <div>Cong viec</div>
                                <input type="text" className="border p-2 h-[47px] mt-2 w-full" />
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
                            // onClick={() => {
                            //     handleCreateField();
                            // }}
                            >
                                Thêm
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>

    );
}
export default DetailGroup;