require("../../config/firebase");
const cloudinary = require("../../config/cloudinary");

const User = require("../user/user.model");

const firebaseRest = require("./firebaseRest.service");

const { getAuth } = require("firebase-admin/auth");
const streamifier = require("streamifier");

const verifyFirebaseUser = async (token) => {
    const decodedToken = await getAuth().verifyIdToken(token);

    const firebaseUid = decodedToken.uid;

    const email = decodedToken.email;

    const name =
        decodedToken.name ||
        email.split("@")[0];

    let user = await User.findOne({
        firebaseUid,
    });

    if (!user) {
        user = await User.create({
            firebaseUid,
            email,
            name,
            role: "USER",
        });
    }

    return user;
};

const loginWithEmail = async (email, password) => {
    const authResult = await firebaseRest.signInWithPassword(
        email,
        password
    );

    const user = await verifyFirebaseUser(authResult.idToken);

    return {
        idToken: authResult.idToken,
        refreshToken: authResult.refreshToken,
        user,
    };
};

const registerWithEmail = async (name, email, password) => {
    const authResult = await firebaseRest.signUpWithPassword(
        email,
        password
    );

    await getAuth().updateUser(authResult.localId, {
        displayName: name,
    });

    const user = await verifyFirebaseUser(authResult.idToken);

    return {
        idToken: authResult.idToken,
        refreshToken: authResult.refreshToken,
        user,
    };
};

const updateProfile = async (userId, payload) => {
    const updates = {};

    if (typeof payload.name === "string") {
        updates.name = payload.name.trim();
    }

    if (typeof payload.photoURL === "string") {
        updates.photoURL = payload.photoURL.trim();
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updates,
        {
            new: true,
            runValidators: true,
        }
    );

    return user;
};

const uploadProfilePhoto = async (userId, file) => {
    if (!file) {
        throw new Error("Profile photo is required");
    }

    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "legacyvault/profile-photos",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
    });

    const existingUser = await User.findById(userId);

    if (existingUser?.photoPublicId) {
        await cloudinary.uploader.destroy(existingUser.photoPublicId, {
            resource_type: "image",
        }).catch(() => null);
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            photoURL: uploadResult.secure_url,
            photoPublicId: uploadResult.public_id,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return user;
};

module.exports = {
    verifyFirebaseUser,
    loginWithEmail,
    registerWithEmail,
    updateProfile,
    uploadProfilePhoto,
};
