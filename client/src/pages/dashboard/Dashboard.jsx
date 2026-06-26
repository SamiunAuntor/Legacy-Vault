import {
    FileText,
    KeyRound,
    Mail,
    MoreVertical,
    ShieldCheck,
    Upload,
    UserPlus,
} from "lucide-react";
import {
    Link,
} from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Good Morning, Alex
                    </h1>
                    <p className="mt-2 max-w-md text-base leading-6 text-slate-600">
                        Your digital legacy is currently 84% secured and ready.
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <Link to="/dashboard/documents" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-sm font-medium text-slate-800">
                        <Upload size={16} />
                        Upload Document
                    </Link>
                    <Link to="/dashboard/final-wishes" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-sm font-medium text-slate-800">
                        <Mail size={16} />
                        Create Final Wish
                    </Link>
                    <Link to="/dashboard/documents" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 text-base font-bold text-white sm:col-span-2 sm:mx-auto sm:w-56">
                        +
                        Quick Add
                    </Link>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1fr_1fr]">
                <section className="row-span-2 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold uppercase tracking-wide">
                            Vault Readiness
                        </p>
                        <ShieldCheck className="text-emerald-700" size={20} />
                    </div>
                    <div className="mx-auto mt-8 grid size-44 place-items-center rounded-full bg-[conic-gradient(#006f51_0_84%,#e8eef8_84%_100%)]">
                        <div className="grid size-32 place-items-center rounded-full bg-white text-center">
                            <div>
                                <p className="text-4xl font-extrabold text-emerald-700">84%</p>
                                <p className="font-bold">Secured</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-sm leading-6 text-slate-600">
                        Complete your <Link to="/dashboard/verification" className="font-bold text-emerald-700">Security Questions</Link> to reach 100% readiness.
                    </p>
                </section>

                <MetricCard icon={FileText} title="Documents Count" value="42" detail="+3 this month" />
                <MetricCard icon={Mail} title="Future Messages" value="12" detail="Scheduled" />

                <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between text-sm font-bold">
                        <span>Storage Capacity</span>
                        <span>1.2 GB / 5 GB</span>
                    </div>
                    <div className="h-2 rounded-full bg-blue-100">
                        <div className="h-full w-1/4 rounded-full bg-emerald-700" />
                    </div>
                    <div className="mt-3 flex justify-between text-xs font-bold">
                        <span>24% utilized</span>
                        <span className="text-emerald-700">Manage Storage</span>
                    </div>
                </section>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
                <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between p-8">
                        <h2 className="text-xl font-bold">Successor Status</h2>
                        <Link to="/dashboard/successors" className="text-sm font-medium text-emerald-700">Manage All</Link>
                    </div>
                    {[
                        ["ES", "Elena Sterling", "Primary Successor - Family", "Verified"],
                        ["MT", "Marcus Thorne", "Legal Trustee - Professional", "Pending"],
                    ].map(([initials, name, role, status]) => (
                        <div key={name} className="grid grid-cols-[44px_1fr_auto_20px] items-center gap-4 px-8 py-4">
                            <span className="grid size-11 place-items-center rounded-full bg-blue-100 font-bold text-blue-700">{initials}</span>
                            <div>
                                <p className="font-bold">{name}</p>
                                <p className="text-sm text-slate-600">{role}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${status === "Verified" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{status}</span>
                            <MoreVertical size={16} className="text-slate-400" />
                        </div>
                    ))}
                    <Link to="/dashboard/successors" className="mt-20 flex h-16 items-center justify-center gap-2 bg-blue-50 text-sm font-bold text-emerald-700">
                        <UserPlus size={16} />
                        Add Successor
                    </Link>
                </section>

                <div className="space-y-6">
                    <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-4">
                            <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-red-600"><KeyRound size={18} /></span>
                            <h2 className="text-sm font-extrabold uppercase tracking-wide">Verification Steps</h2>
                        </div>
                        <div className="mt-6 space-y-5 text-sm">
                            <p><span className="mr-3 inline-block size-3 rounded-full bg-emerald-700" />Biometric ID setup<br /><span className="ml-7 text-xs text-slate-500">Completed on Mar 15</span></p>
                            <p><span className="mr-3 inline-block size-3 rounded-full border border-slate-400" />Secondary authentication<br /><span className="ml-7 text-xs text-emerald-700">Configure now</span></p>
                        </div>
                    </section>
                    <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-sm font-extrabold uppercase tracking-wide">Recent Activity</h2>
                        <div className="mt-6 space-y-5 border-l border-slate-200 pl-5 text-sm">
                            <p><span className="-ml-[27px] mr-4 inline-block size-3 rounded-full bg-emerald-700" />Today, 9:42 AM<br /><b>Document "Family Trust_2024.pdf" encrypted and uploaded.</b></p>
                            <p><span className="-ml-[27px] mr-4 inline-block size-3 rounded-full bg-blue-100" />Yesterday, 4:15 PM<br />Future message scheduled for 2030 release.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function MetricCard({
    detail,
    icon: Icon,
    title,
    value,
}) {
    return (
        <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon size={18} />
                </span>
                <p className="text-sm font-extrabold uppercase tracking-wide">{title}</p>
            </div>
            <p className="mt-6 text-4xl font-extrabold">{value} <span className="text-sm font-bold text-emerald-700">{detail}</span></p>
            <div className="mt-5 h-1.5 rounded-full bg-blue-100">
                <div className="h-full w-3/4 rounded-full bg-emerald-700" />
            </div>
        </section>
    );
}
