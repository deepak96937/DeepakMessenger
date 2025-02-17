import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDGRMfOMnJ2yDdIRpk36AWsLtyDdxNwboQ",
    authDomain: "chat-app-dk-7190e.firebaseapp.com",
    projectId: "chat-app-dk-7190e",
    storageBucket: "chat-app-dk-7190e.appspot.com",  // Fixed storageBucket URL
    messagingSenderId: "831644720091",
    appId: "1:831644720091:web:f5ce383e2a20308bbde5fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Save user details in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: '',
            bio: 'Hey, There I am using chat app',
            lastSeen: Date.now()
        });

        // Save empty chat data for the user
        await setDoc(doc(db, "chats", user.uid), {
            chatData: []  // Fixed typo (was `dhatData`)
        });

        toast.success("Signup successful!");
    } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
};


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("You are already login");
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

export { signup, login };
