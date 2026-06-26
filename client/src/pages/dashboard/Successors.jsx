import {
    CheckCircle2,
    ClipboardCheck,
    Edit3,
    Hourglass,
    Mail,
    Phone,
    Share2,
    Trash2,
    UserPlus,
} from "lucide-react";

export default function Successors() {
    return (
        <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_280px]">
            <div>
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Successor Management</h1>
                        <p className="mt-2 max-w-xl text-base text-slate-600">Manage the individuals who will receive access to your digital legacy.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="inline-flex h-14 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 font-medium"><Share2 size={16} />Share Protocol</button>
                        <button className="inline-flex h-14 items-center gap-2 rounded-xl bg-emerald-700 px-7 font-bold text-white"><UserPlus size={17} />Add Successor</button>
                    </div>
                </div>

                <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="bg-emerald-50/60 p-8">
                        <div className="flex items-start gap-6">
                            <img className="size-20 rounded-2xl object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="" />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold">Elena Rodriguez</h2>
                                <p className="font-bold text-emerald-700">Primary Successor - Spouse</p>
                                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Mail size={14} /> elena.r@example.com</p>
                                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Phone size={14} /> +1 (555) 0123-4567</p>
                            </div>
                            <Edit3 size={18} />
                            <Trash2 size={18} />
                        </div>
                    </div>
                    <div className="grid gap-6 p-8 md:grid-cols-2">
                        <StatusBox icon={CheckCircle2} title="Identity Verified" text="Completed on Oct 12, 2023" />
                        <StatusBox icon={Hourglass} title="Pending Transfer" text="Awaiting activation trigger" blue />
                    </div>
                    <div className="flex items-center justify-end gap-6 border-t border-slate-100 p-7">
                        <button className="text-sm text-slate-600">Reset Access Logic</button>
                        <button className="rounded-xl bg-blue-700 px-7 py-4 font-bold text-white">Send Test Notification</button>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-xl font-bold">Access Verification Timeline</h2>
                    <p className="mt-2 text-sm text-slate-600">The sequence required for Elena to gain full access to your digital vault.</p>
                    <div className="mt-10 grid gap-8 text-center md:grid-cols-3">
                        {["Identity Check", "Question Verification", "Admin Approval"].map((title, index) => (
                            <div key={title}>
                                <span className={`mx-auto grid size-16 place-items-center rounded-full ${index === 0 ? "bg-emerald-700 text-white" : "bg-blue-100 text-emerald-700"}`}>
                                    <ClipboardCheck size={24} />
                                </span>
                                <h3 className="mt-4 font-bold">{title}</h3>
                                <p className="mt-2 text-sm leading-5 text-slate-600">{index === 0 ? "Government ID and biometric scan required for initial entry." : index === 1 ? "Personalized security questions only your successor would know." : "Final legacy protocol review by LegacyVault trust officers."}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <aside className="space-y-8">
                <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-xl font-bold">Pending Invitations</h2>
                    <div className="mt-6 rounded-xl bg-slate-50 p-5">
                        <p className="font-bold">Marcus Chen</p>
                        <p className="text-sm text-slate-600">Backup Successor - Brother</p>
                        <div className="mt-4 flex gap-3 text-xs font-bold">
                            <button className="rounded bg-emerald-50 px-3 py-2 text-emerald-700">Resend</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </section>
                <section className="rounded-2xl bg-emerald-700 p-7 text-white shadow-lg">
                    <h2 className="text-2xl font-bold">Security Score</h2>
                    <p className="mt-7 text-5xl font-extrabold">84<span className="text-xl">/100</span></p>
                    <p className="mt-6 text-sm leading-6 text-emerald-50">Adding a backup successor will increase your redundancy score to 95%.</p>
                    <button className="mt-7 h-12 w-full rounded-xl bg-white font-bold text-emerald-800">Improve Protocol</button>
                </section>
            </aside>
        </div>
    );
}

function StatusBox({
    blue,
    icon: Icon,
    text,
    title,
}) {
    return (
        <div className={`flex items-center gap-4 rounded-xl p-6 ${blue ? "bg-blue-50" : "bg-emerald-50"}`}>
            <Icon className={blue ? "text-blue-600" : "text-emerald-700"} size={28} />
            <div>
                <h3 className={`font-bold ${blue ? "text-blue-700" : "text-emerald-700"}`}>{title}</h3>
                <p className="text-sm text-slate-600">{text}</p>
            </div>
        </div>
    );
}
