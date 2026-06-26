import {
    FileText,
    LayoutDashboard,
    Lock,
    Mail,
    Settings,
    Shield,
    Sparkles,
    Users,
} from "lucide-react";

export const userSidebar = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Documents",
        path: "/dashboard/documents",
        icon: FileText,
    },
    {
        title: "Successors",
        path: "/dashboard/successors",
        icon: Users,
    },
    {
        title: "Verification",
        path: "/dashboard/verification",
        icon: Shield,
    },
    {
        title: "Final Wishes",
        path: "/dashboard/final-wishes",
        icon: Sparkles,
    },
    {
        title: "Future Messages",
        path: "/dashboard/future-messages",
        icon: Mail,
    },
    {
        title: "Claims",
        path: "/dashboard/claims",
        icon: Lock,
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
    },
];
