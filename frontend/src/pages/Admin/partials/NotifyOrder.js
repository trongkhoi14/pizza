import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosAdmin from "../../../api/axiosAdmin";
import notifySlice, { getNotify } from "../../../redux/slice/notifySlice";

export default function NotifyOrder() {
  const { notify, visible } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleUpdateStatus = async (e,item, index) => {
    e.stopPropagation()
    try {
      if (item.status) return;
      const res = await axiosAdmin.put(`api/v1/notify/${item._id}`, {
        status: true,
      });
      dispatch(notifySlice.actions.updateNotify(index));
    } catch (error) {}
  };

  const handleDeleteNotify = async (e, item, index) => {
    try {
      e.stopPropagation();
      const res = await axiosAdmin.delete(`api/v1/notify/${item._id}`);
      dispatch(notifySlice.actions.deleteNotify(index));
    } catch (error) {}
  };

  const handleClose = (e) => {
    e.stopPropagation();

    dispatch(notifySlice.actions.updateVisible());
  };

  useEffect(() => {
    dispatch(getNotify());
  
  }, []);

  return (
    <div
      className="relative"
      onClick={() => dispatch(notifySlice.actions.updateVisible())}
    >
      <button
        className="inline-flex items-center text-sm font-medium text-center text-gray-500  focus:outline-none hover:opacity-80"
        type="button"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
        {notify.find((n) => n.status === false) && (
          <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
          </div>
        )}
      </button>
      <div
        id="dropdown"
        className={`
      z-10 absolute right-0
      drop-shadow-lg  bg-white divide-y 
      divide-gray-100 rounded-lg shadow transition
      max-w-lg w-72 ${visible ? "visible" : "invisible"}`}
      >
        <ul className="py-2 text-sm divide-y text-gray-700 max-h-96 overflow-auto">
          {notify.map((n, i) => {
            return (
              <li
                onClick={(e) => handleUpdateStatus(e,n, i)}
                key={i}
                className="px-4 py-2 hover:bg-gray-100 flex flex-col cursor-pointer"
              >
                <div className="flex justify-between items-center space-x-2">
                  <p className="text-base">{n.content} </p>
                  {!n.status && (
                    <div className="h-2 w-2 rounded-full bg-sky-600 shrink-0"></div>
                  )}
                </div>
                <div className="flex justify-between">
                  <p
                    className={`text-xs ${
                      !n.status ? "text-sky-600" : "text-gray-400"
                    }`}
                  >
                    Vào lúc: {n.time}
                  </p>
                  <button
                    onClick={(e) => handleDeleteNotify(e, n, i)}
                    className="text-xs text-red-500 hover:opacity-80"
                  >
                    Xoá
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          onClick={(e) => handleClose(e)}
          className=" p-2 cursor-pointer text-sm text-center font-medium text-sky-500"
        >
          Ẩn
        </div>
      </div>
    </div>
  );
}
