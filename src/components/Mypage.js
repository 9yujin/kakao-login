import React, { useContext } from "react";
import userContext from "../context";

const Mypage = () => {
    const context = useContext(userContext);
    const userData = context.user;
    console.log(userData);

    return (
        <>
            <h1>마이 페이지</h1>
            <div>
                <div
                    style={{
                        backgroundImage: `url(${context.user.image})`,
                        height: "100px",
                        width: "100px",
                        margin: "30px auto",
                        backgroundSize: "cover",
                        borderRadius: "10px",
                    }}
                ></div>
                <h3>이름</h3>
                <div>{context.user.name}</div>
                <h3>이메일</h3>
                <div>{context.user.email}</div>
                <h3>전화번호</h3>
                <div>{context.user.phone}</div>
                <h3>와우회원</h3>
                {context.user.wow ? <div>결제일</div> : <div>와우 회원이 아닙니다</div>}
            </div>
        </>
    );
};

export default Mypage;
