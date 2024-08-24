import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import axios from 'axios';
import $ from "jquery";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register(){
    const navigate = useNavigate()
    
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        
    });
    const [ errorList, setErrorList] = useState([])
    const [APIError, setAPIError] = useState(null);
    const [clickedButton, setClickedButton] = useState(false);

    function userInfo(e){
        setErrorList(null) 
        setAPIError(null)
        let idOfChangedInput = e.target.id
        let inputValue = e.target.value
        let newUser = {...user}
        newUser[idOfChangedInput] = inputValue
        setUser(newUser)    
    }
    function getSpecifiedError(key){
        if (errorList !== null ) {
            for (let i = 0; i < errorList.length; i++) {
                if (key === errorList[i].context.key) {
                    return errorList[i].message
                }
            }
            return '';  
        }
    }   

    async function submitMyForm(e){
        setClickedButton(true)
        e.preventDefault()
        const schema = Joi.object({
            userName: Joi.string().max(30).min(3).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
            confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
            // confirm_password: Joi.string().valid(Joi.ref('password')).required(),
        })
        const resultOfValidation = schema.validate(user , {abortEarly: false})
        if (resultOfValidation.error === undefined) {
            // const response = await fetch('https://graduation-project-blond.vercel.app/auth/register',{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(user)
            //     });
            // const {data} = await response.json();
            const {data} = await axios.post('https://graduation-project-an7d.onrender.com/auth/register', user)
            if (data.message === 'success') {
                $('.alert-success').fadeIn(1000).fadeOut(1000,function(){
                    navigate("/login")
                })
            }else {
                setAPIError(data.error)    
            }        
        }else{
            let errorList = resultOfValidation.error.details
                setErrorList(errorList) 
                
        }setClickedButton(false)
    }
    

    return <>
        <form onSubmit={submitMyForm} action="" >
            <div className="d-flex justify-content-center align-content-center mt-5">
            <div style={{"display":'none'}} className="alert alert-success text-center"> Registration Succeeded</div>
            <div className="w-50 m-auto ">
                {/* {APIError?<div className='alert alert-danger'>{APIError}</div>: ""}
                {errorList.length === 0 ?  "" :errorList.map((err, index) => (<div key={index} className='alert alert-danger'>{err.message}</div>)) }                <h2 className="m-auto">Registration Form</h2> */}
                
                <label htmlFor="userName" className="form-label mt-3">userName :</label>
                <input onChange={userInfo} type="text" className="form-control " id="userName" placeholder="userName"/>
                
                
                {getSpecifiedError('userName')?<div className='alert alert-danger fa-sm mt-1'>{getSpecifiedError('userName')}</div>: ""}


                {/* 
                <label htmlFor="last_name" className="form-label mt-3">Last_name :</label>
                <input onChange={userInfo} type="text" className="form-control " id="last_name" placeholder="last_name"/>
                </div> */}
                
                <label htmlFor="email" className="form-label mt-3">Email :</label>
                <input onChange={userInfo} type="email" className="form-control " id="email" placeholder="email"/>
                
                {getSpecifiedError('email')?<div className='alert alert-danger fa-sm mt-1'>{getSpecifiedError('email')}</div>: ""}

                {/* 
                <label htmlFor="age" className="form-label mt-3">Age :</label>
                <input onChange={userInfo} type="number" className="form-control " id="age" placeholder="age"/>
                </div> */}
                
                <label htmlFor="password" className="form-label mt-3">Password :</label>
                <input onChange={userInfo} type="password" className="form-control " id="password" placeholder="password"/>
                
                {getSpecifiedError('password')?<div className='alert alert-danger fa-sm mt-1'>{getSpecifiedError('password')}</div>: ""}

                
                <label htmlFor="confirmPassword" className="form-label mt-3">Confirm Password :</label>
                <input onChange={userInfo} type="password" className="form-control " id="confirmPassword" placeholder="confirmPassword"/>
                {getSpecifiedError('confirmPassword')?<div className='alert alert-danger fa-sm mt-1'>{getSpecifiedError('confirmPassword')}</div>: ""}

                <button onClick={submitMyForm} className="btn btn-outline-info mt-3">
                {clickedButton === true ? <div ><FontAwesomeIcon className="fa-spin" icon={faSpinner } /></div> : 'Register' }
                    </button>
            </div>
            </div>
        </form>
    </>
}
