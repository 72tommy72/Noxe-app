import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Login(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errorList, setErrorList] = useState([]);
    const [APIError, setAPIError] = useState(null);
    const [clickedButton, setClickedButton] = useState(false);

    function userInfo(e) {
        setErrorList(null);
        let idOfChangedInput = e.target.id;
        let inputValue = e.target.value;
        let newUser = { ...user };
        newUser[idOfChangedInput] = inputValue;
        setUser(newUser);
    }

    function getSpecifiedError(key) {
        if (errorList != null) {
            for (let i = 0; i < errorList.length; i++) {
                if (key == errorList[i].context.key) {
                    return errorList[i].message;
                }
            }
            return '';
        }
    }

    async function submitMyForm(e) {
        setClickedButton(true);
        e.preventDefault();
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        });
        const resultOfValidation = schema.validate(user, { abortEarly: false });
        if (resultOfValidation.error === undefined) {
            try {
                const { data } = await axios.post('https://graduation-project-an7d.onrender.com/auth/login', user);
                console.log(data);
                const userToken = data.token;
                localStorage.setItem('token', userToken);
                props.decoded();
                if (data.success === true) {
                    $('.alert-success').fadeIn(1000).fadeOut(1000, function () {
                        navigate("/home");
                    });
                } else {
                    $('.alert-danger').fadeIn(1000).fadeOut(1000);
                    setAPIError(data.message);
                }
            } catch (error) {
                $('.alert-danger').fadeIn(1000).fadeOut(1000);
                setAPIError(error.response?.data?.message || "An error occurred");
            }
        } else {
            let errorList = resultOfValidation.error.details;
            setErrorList(errorList);
        }
        setClickedButton(false);
    }

    return (
        <>
            <form onSubmit={submitMyForm} action="">
                <div
                    style={{ display: "none" }}
                    className="alert alert-success text-center"
                >
                    Login Succeeded
                </div>
                <div
                    style={{ display: "none" }}
                    className="alert alert-danger text-center"
                >
                    {APIError}
                </div>

                <div className="d-flex justify-content-center align-content-center mt-5">
                    <div className="w-50 mt-5">
                        <h2 className="m-auto">Login</h2>
                        <div className="inputs">
                            <label htmlFor="email" className="form-label mt-3">
                                Email :
                            </label>
                            <input
                                onChange={userInfo}
                                type="email"
                                className="form-control "
                                id="email"
                                placeholder="email"
                            />
                        </div>
                        {getSpecifiedError("email") ? (
                            <div className="alert alert-danger fa-sm mt-1">
                                {getSpecifiedError("email")}
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="inputs">
                            <label htmlFor="password" className="form-label mt-3">
                                Password :
                            </label>
                            <input
                                onChange={userInfo}
                                type="password"
                                className="form-control "
                                id="password"
                                placeholder="password"
                            />
                        </div>
                        {getSpecifiedError("password") ? (
                            <div className="alert alert-danger fa-sm mt-1">
                                {getSpecifiedError("password")}
                            </div>
                        ) : (
                            ""
                        )}
                        <button
                            onClick={submitMyForm}
                            className="btn btn-outline-info mt-4"
                        >
                            {clickedButton === true ? (
                                <div>
                                    <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <p 
                            className="text-center mt-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/register')}
                        >
                            Don't have an account? <span className="text-info">Register</span>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
}
