import React, { createContext, useState } from "react";

const userContext = createContext({
    kakao: { name: "", email: "", id: "", image: "" },
    user: { name: "", email: "", wow: "", image: "", phone: "" },
    setKakao: () => {},
    setUser: () => {},
});

export default userContext;
