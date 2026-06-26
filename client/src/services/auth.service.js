import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(
        auth,
        email,
        password
    );
};

export const registerUser = async (
    name,
    email,
    password
) => {
    const result =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    await updateProfile(result.user, {
        displayName: name,
    });

    return result;
};

export const googleLogin = () => {
    return signInWithPopup(
        auth,
        googleProvider
    );
};

export const logoutUser = () => {
    return signOut(auth);
};