import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";

const App = () => {
  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    await loginHandler(token);
    console.log(data);
  };

  const loginHandler = async (token) => {
    try {
      const { data } = await api.post("/auth/login", {
        token,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <button className="w-50 h-24 bg-white" onClick={googleLogin}>
        Continue with Google
      </button>
    </div>
  );
};

export default App;
