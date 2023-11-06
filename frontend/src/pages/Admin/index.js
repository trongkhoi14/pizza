import React, { useEffect, useState } from "react";

import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SocketClient from "../../services/SocketClient";
import { io } from "socket.io-client";
import socketSlice from "../../redux/slice/socketSlice";
import { setInitStateCart } from "../../redux/slice/cartSlice";
import { SOCKET_SERVER_URL } from "../../utils/constant";

function Dashboard() {
  const { info } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  if (!Object.keys(info).length) return <Navigate to={"/admin/login"} />;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      if(socket.connected){
        dispatch(socketSlice.actions.setInitSocket(socket));
      }
    })

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SocketClient />
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={info.role}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
