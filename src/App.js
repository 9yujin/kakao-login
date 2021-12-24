import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import userContext from "./context";

const App = () => {
    const [kakao, setKakao] = useState({ name: "", email: "", id: "" });
    const [user, setUser] = useState({ name: "", email: "" });

    return (
        <div className="App">
            <userContext.Provider value={{ kakao, setKakao, user, setUser }}>
                <Login />
            </userContext.Provider>
        </div>
    );
};

export default App;
