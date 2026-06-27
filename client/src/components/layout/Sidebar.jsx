import {
    NavLink,
} from "react-router-dom";
import {
    LogOut,
    Shield,
} from "lucide-react";

import {
    userSidebar,
} from "../../constants/sidebar";
import BrandLogo from "../common/BrandLogo";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const {
        profile,
        logout,
    } = useAuth();

    return (
        <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
            <div className="border-b border-slate-200 px-5 py-5">
                <BrandLogo
                    iconClassName="h-8 w-8"
                    textClassName="text-[1.55rem] font-semibold tracking-[-0.03em] text-slate-900"
                />
            </div>

            <nav className="space-y-1 overflow-y-auto px-3 py-4">
                {userSidebar.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-[10px] border px-3.5 py-3 text-sm font-medium transition ${isActive
                                    ? "border-slate-200 bg-slate-100 text-[#1f5b46] shadow-[inset_-3px_0_0_0_#1f5b46]"
                                    : "border-transparent text-slate-700 hover:bg-slate-50"
                                    }`
                            }
                        >
                            <Icon size={16} />
                            {item.title}
                        </NavLink>
                    );
                })}
                {profile?.role === "ADMIN" ? (
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-[10px] border px-3.5 py-3 text-sm font-medium transition ${isActive
                                ? "border-slate-200 bg-slate-100 text-[#1f5b46] shadow-[inset_-3px_0_0_0_#1f5b46]"
                                : "border-transparent text-slate-700 hover:bg-slate-50"
                            }`
                        }
                    >
                        <Shield size={16} />
                        Admin Console
                    </NavLink>
                ) : null}
            </nav>

            <div className="mt-auto space-y-3 border-t border-slate-200 p-4">
                <button
                    onClick={logout}
                    className="flex h-11 w-full items-center justify-between rounded-[10px] border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    <span>Logout</span>
                    <LogOut size={15} />
                </button>
            </div>
        </aside>
    );
}
