import api from "./api";

export const updateMyProfile = async (payload) => {
    const response = await api.patch("/auth/me", payload);
    return response.data.data;
};

export const uploadMyProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await api.patch("/auth/me/photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.data;
};
