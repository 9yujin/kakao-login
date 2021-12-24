import React, { useContext } from "react";
import userContext from "../context";

const Mypage = ({ logout }) => {
    const context = useContext(userContext);
    const jwt = context.user.jwt.split(".");
    console.log(jwt);

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
            <input type="button" value="로그아웃" style={{ margin: "20px" }} onClick={logout}></input>
            <div style={{ fontSize: "10px", color: "gray" }}>
                <p>{jwt[0]}.</p>
                <p>{jwt[1]}.</p>
                <p>{jwt[2]}</p>
            </div>
        </>
    );
};

export default Mypage;
