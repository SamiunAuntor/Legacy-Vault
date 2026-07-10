import {
    Camera,
    Key,
    Lock,
    RefreshCw,
} from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import { requestPasswordReset } from "../../services/auth.service";
import { getApiErrorMessage } from "../../services/api";
import { uploadMyProfilePhoto } from "../../services/profile.service";

export default function Settings() {
    const photoInputId = useId();
    const { profile, user, refreshProfile } = useAuth();
    const [sendingReset, setSendingReset] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [savingPhoto, setSavingPhoto] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    useEffect(() => {
        return () => {
            if (photoPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const handleResetRequest = async () => {
        const email = profile?.email || user?.email;

        if (!email) {
            toast.error("No account email found.");
            return;
        }

        setSendingReset(true);

        try {
            await requestPasswordReset(email);
            toast.success("Password reset link sent.");
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Unable to send reset link."));
        } finally {
            setSendingReset(false);
        }
    };

    const handleRefreshProfile = async () => {
        setRefreshing(true);

        try {
            await refreshProfile();
            toast.success("Profile refreshed.");
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Unable to refresh profile."));
        } finally {
            setRefreshing(false);
        }
    };

    const handleSavePhoto = async () => {
        if (!photoFile) {
            toast.error("Please choose an image first.");
            return;
        }

        setSavingPhoto(true);

        try {
            await uploadMyProfilePhoto(photoFile);
            await refreshProfile();
            toast.success("Profile photo updated.");
            setPhotoFile(null);
            setPhotoPreview("");
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Unable to update profile photo."));
        } finally {
            setSavingPhoto(false);
        }
    };

    const displayedPhoto = useMemo(
        () =>
            photoPreview ||
            profile?.photoURL ||
            user?.photoURL ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
        [photoPreview, profile?.photoURL, user?.photoURL]
    );

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        if (photoPreview?.startsWith("blob:")) {
            URL.revokeObjectURL(photoPreview);
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    return (
        <div className="mx-auto max-w-3xl">
            <DashboardPageHeader
                title="Settings"
                description="Manage your account profile, security access, and dashboard configuration."
                action={
                    <button
                        onClick={handleRefreshProfile}
                        disabled={refreshing}
                        className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                    >
                        <RefreshCw size={15} />
                        {refreshing ? "Refreshing..." : "Refresh Profile"}
                    </button>
                }
            />

            <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-lg font-bold">Profile Information</h2>
                <div className="mt-6 space-y-5">
                    <Field label="Full Name" value={profile?.name || user?.displayName || ""} readOnly />
                    <Field label="Email Address" value={profile?.email || user?.email || ""} readOnly />
                    <Field label="Account Role" value={profile?.role || "USER"} readOnly />
                    <Field label="Joined" value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-US") : "Unavailable"} readOnly />
                </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Camera size={18} className="text-emerald-700" />
                    Profile Photo
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Upload an image to personalize your dashboard account.
                </p>

                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
                    <img
                        src={displayedPhoto}
                        alt={profile?.name || user?.displayName || "Vault User"}
                        className="size-20 rounded-full object-cover ring-1 ring-slate-200"
                    />

                    <div className="flex-1">
                        <label className="text-sm font-bold text-slate-700">
                            Upload Photo
                        </label>
                        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-center">
                            <input
                                id={photoInputId}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={photoInputId}
                                className="flex h-12 w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-slate-600 transition hover:border-slate-300"
                            >
                                <span className="inline-flex h-full shrink-0 items-center border-r border-slate-200 bg-slate-50 px-5 font-medium text-slate-800">
                                    Choose File
                                </span>
                                <span className="truncate px-4">
                                    {photoFile?.name || "No file selected"}
                                </span>
                            </label>
                            <button
                                onClick={handleSavePhoto}
                                disabled={savingPhoto || !photoFile}
                                className="inline-flex h-12 min-w-[148px] items-center justify-center rounded-[10px] bg-[#2f6b55] px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {savingPhoto ? "Uploading..." : "Save Photo"}
                            </button>
                        </div>
                        <p className="mt-3 text-xs leading-6 text-slate-500">
                            JPG, PNG, or WEBP images are supported.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8 rounded-2xl bg-emerald-50 p-8 ring-1 ring-emerald-100">
                <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                    <Lock size={18} />
                    Security Actions
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Use these actions to refresh your secure profile state or send a password reset email to your primary inbox.
                </p>
                <button
                    onClick={handleResetRequest}
                    disabled={sendingReset}
                    className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-bold text-emerald-800 ring-1 ring-emerald-200 disabled:opacity-60"
                >
                    <Key size={16} />
                    {sendingReset ? "Sending Reset Link..." : "Send Password Reset Link"}
                </button>
            </section>

        </div>
    );
}

function Field({ label, readOnly, value, onChange, placeholder }) {
    return (
        <div>
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <input
                value={value}
                readOnly={readOnly}
                onChange={onChange ? (event) => onChange(event.target.value) : undefined}
                placeholder={placeholder}
                className={`mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none ${readOnly ? "bg-slate-50" : "bg-white"}`}
            />
        </div>
    );
}
