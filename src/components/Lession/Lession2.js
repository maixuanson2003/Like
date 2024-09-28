import Pagination from "components/Common/Pagination";
import React, { useEffect, useState } from "react";
import request from "utils/request";

const Lession2 = () => {
  /*
    LESSION 2:
    - CAll api trả về 1 bảng dữ liệu ( như bài 1)
    - Phân trang:
      pagination: {
        currentPage: Trang hiện tại,
        pageSize: Số phần tử 1 trang (limit)),
        totalRow: 100 ( tổng số bản ghi),
        onPageChange : () => {
          do something ....
        }
      }
  */

  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRow, setTotalRow] = useState(0);

  const onPageChange = (page) => {
    setPage(page);
  };
  const onSizeChange = (size) => {
    setSize(size);
  };
  const onIndexChange = (index) => {
    setIndex(index);
  };

  const getData = async () => {
    const res = await request("https://api.escuelajs.co/api/v1/products", {
      method: "GET",
      params: {
        offset: (page - 1) * size,
        limit: size,
      },
    });
    const products = res.data;

    products.forEach((product, i) => {
      product.images.forEach((imageUrl, index) => {
        let New_char = imageUrl.split("");
        for (let index = 0; index < New_char.length; index++) {
          switch (New_char[index]) {
            case "[":
              New_char[index] = "";
              break;
            case "]":
              New_char[index] = "";
              break;
            case '"':
              New_char[index] = "";
              break;
            case "\\":
              New_char[index] = "";
              break;

            default:
              break;
          }
        }
        let sanitizedUrl = New_char.join("");
        products[i].images[index] = sanitizedUrl;
        console.log(products[i].images[index]);
      });
    });

    setData(products);
    setTotalRow(200);
  };
  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="App">
      <div className="w-10/12 mx-auto py-10">
        <div className="text-2xl">Sản phẩm</div>
        <table className=" border-collapse ">
          <thead>
            <tr>
              <th className="border border-slate-300">Id</th>
              <th className="border border-slate-300">Title</th>
              <th className="border border-slate-300">Price</th>
              <th className="border border-slate-300">Category</th>
              <th className="border border-slate-300">Description</th>
              <th className="border border-slate-300">Image</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((_item, _index) => (
                <tr key={_index}>
                  <td className="border border-slate-300">{_item.id}</td>
                  <td className="border border-slate-300">{_item.title}</td>
                  <td className="border border-slate-300">{_item.price}</td>
                  <td className="border border-slate-300">
                    {_item.category.name}
                  </td>
                  <td className="border border-slate-300">
                    {_item.description}
                  </td>
                  <td className="border flex flex-row border-slate-300">
                    {_item.images &&
                      _item.images.map((images) => (
                        <img
                          className="w-[30%] h-[30%]"
                          src={images}
                          alt={_item.title}
                        />
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-10">
          <Pagination
            currentPage={page}
            onPageChange={onPageChange}
            onSizeChange={onSizeChange}
            onIndexChange={onIndexChange}
            pageSize={size}
            totalRow={totalRow}
          />
        </div>
      </div>
    </div>
  );
};

export default Lession2;
