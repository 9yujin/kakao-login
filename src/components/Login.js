import React, { useState, useEffect, useContext } from "react";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import userContext from "../context";
import Signup from "./Signup";
import Mypage from "./Mypage";
const Login = () => {
    const cookies = new Cookies();
    const context = useContext(userContext);
    const [signup, setSignup] = useState(false);
    const [logined, setLogined] = useState(false);

    const joinSucceed = () => {
        setSignup(false);
    };

    const signin = async () => {
        const token = cookies.get("KakaoAccess");
        console.log(token);
        const loginResult = await axios({
            method: "POST",
            url: `https://9yujin.shop/app/users/login`,
            data: {
                email: context.kakao.email,
                password: String(context.kakao.id),
            },
            headers: {
                "Kakao-access-token": token,
            },
        });
        const loginData = loginResult.data.result;
        context.setUser({
            name: loginData.userName,
            email: loginData.userEmail,
            image: loginData.userImage,
            phone: loginData.userPhone,
            wow: loginData.userWow,
            jwt: loginData.jwt,
        });
    };

    const logout = () => {
        setLogined(false);
        context.setUser({ name: "", email: "", wow: "", image: "", phone: "" });
        context.setKakao({ name: "", email: "", id: "", image: "" });
    };

    useEffect(() => {
        if (context.user.email) {
            setLogined(true);
        }
    }, [context.user.email]);

    useEffect(() => {
        const myAccount = async () => {
            try {
                const response = await axios.get(`https://9yujin.shop/app/users?email=${context.kakao.email}`);
                console.log(response);
                if (response.data.result.length == 0) {
                    setSignup(true);
                } else {
                    //로그인
                    signin();
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (context.kakao.id) {
            if (!context.kakao.email) {
                alert("이메일 정보 제공 동의를 해주세요!!");
            } else {
                myAccount();
            }
        }
    }, [context.kakao]);

    return (
        <div>
            {!signup && !logined && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1>카카오 로그인</h1>
                    <KakaoLogin
                        token={"자바스크립트 app key"}
                        onSuccess={(res) => {
                            console.log(res);
                            cookies.set("kakaoAccess", res.response.access_token, {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 30,
                            });
                            context.setKakao({
                                name: res.profile.kakao_account.profile.nickname,
                                email: res.profile.kakao_account.email,
                                id: res.profile.id,
                                image: res.profile.kakao_account.profile.profile_image_url,
                            });
                        }}
                        onFail={(err) => {
                            console.log("로그인실패", err);
                        }}
                        onLogout={() => {
                            console.log("로그아웃");
                        }}
                    />
                    <KakaoLogin
                        token={"자바스크립트 app key"}
                        onSuccess={(res) => {
                            console.log(res);
                            context.setKakao({
                                name: res.profile.kakao_account.profile.nickname,
                                email: res.profile.kakao_account.email,
                                id: res.profile.id,
                                image: res.profile.kakao_account.profile.profile_image_url,
                            });
                        }}
                        onFail={(err) => {
                            console.log("로그인실패", err);
                        }}
                        onLogout={() => {
                            console.log("로그아웃");
                        }}
                        useLoginForm
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            margin: "10px",
                        }}
                    >
                        <div>다른 계정으로 로그인</div>
                    </KakaoLogin>
                </div>
            )}
            {signup && !logined && <Signup joinSucceed={joinSucceed} signin={signin} />}
            {logined && <Mypage logout={logout} />}
        </div>
    );
};

export default Login;
