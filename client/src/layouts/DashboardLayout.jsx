import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
    return (
        <div className="app-shell flex min-h-screen bg-[#f6f8fa] text-slate-950">
            <Sidebar />

            <main className="flex min-w-0 flex-1 flex-col">
                <Topbar />

                <section className="flex-1 px-7 py-7">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
