import Pagination from "components/Common/Pagination";
import React, { useEffect, useState } from "react";
import request from "utils/request";

const Lession1 = () => {
  /*
    LESSION 1: Làm quen với Axios gọi dữ liệu show lên màn hình

    API: https://fakestoreapi.com/quotes
  */

  const [data, setData] = useState();

 
  const getData = async () => {
    const res = await request("/quotes", {
      method: "GET",
    });
    setData(res.data.data);
  };
  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="App">
      <div className="w-10/12 mx-auto py-10">
        <div className="text-2xl">Quotes</div>
        <table className=" border-collapse ">
          <thead>
            <tr>
              <th className="border border-slate-300">Id</th>
              <th className="border border-slate-300">Quote</th>
              <th className="border border-slate-300">Author</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((_item, _index) => (
                <tr key={_index}>
                  <td className="border border-slate-300">{_item.id}</td>
                  <td className="border border-slate-300">{_item.quote}</td>
                  <td className="border border-slate-300">{_item.author}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lession1;
