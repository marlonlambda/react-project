import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { Navbar } from "./Navbar";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={`flex bg flex-col transition-all duration-300 ${sidebarOpen ? "w-[calc(100%-18rem)]" : "w-[calc(100%-5rem)]"}`}>
                <Navbar />
                <main className="p-5  h-full overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
