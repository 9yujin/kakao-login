import React, { useContext, useState } from "react";
import axios from "axios";
import userContext from "../context";
import { Form, Input, InputNumber, Button } from "antd";

const Signup = ({ joinSucceed, signin }) => {
    const context = useContext(userContext);
    const [data, setData] = useState({
        name: context.kakao.name,
        email: context.kakao.email,
        phone: "",
        password: String(context.kakao.id),
        image: context.kakao.image,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const response = await axios({
                method: "POST",
                url: `https://9yujin.shop/app/users`,
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": `application/json`,
                },
            });
            if (response.data.code == 1000) {
                joinSucceed();
                signin();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="form-wrapper">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <div className="form=group">
                            <div
                                style={{
                                    backgroundImage: `url(${context.kakao.image})`,
                                    backgroundSize: "cover",
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "10px",
                                    margin: "30px auto",
                                }}
                            ></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" id="name" onChange={(e) => {}} value={context.kakao.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" id="email" onChange={(e) => {}} value={context.kakao.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                onChange={(e) => {
                                    setData({ ...data, phone: String(e.target.value) });
                                }}
                            />
                        </div>
                        {/* {error != "&nbsp" ? <div className="error">{error}</div> : ""} */}
                        <input type="submit" value={"회원가입"} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
