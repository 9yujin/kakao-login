import React, { createContext, useState } from "react";

const userContext = createContext({
    kakao: { name: "", email: "", id: "", image: "" },
    user: { name: "", email: "" },
    setKakao: () => {},
    setUser: () => {},
});

export default userContext;
