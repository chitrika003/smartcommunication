import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useFormik } from 'formik';
import * as yup from "yup";


const Login = () => {
    const navigate = useNavigate();
    const [load,setLoad] = useState(false);
    const userType = new URLSearchParams(window.location.search).get('userType');

    const formValidation = yup.object({
        mail : yup
        .string()
        .required("Why not fill this field ?"),
        password : yup
        .string()
        .required("Why not fill this field ?")
    });

    const {handleSubmit, values ,handleChange, handleBlur, errors, touched} =
    useFormik({
        initialValues : {mail:"",password:"",userType:""},
        validationSchema : formValidation,
        onSubmit : (loginData)=>{
            login(loginData)
        }
    })
    const login = (loginData)=>{
        // console.log(loginData)
        console.log(userType)
        if(userType === "user"){
            loginData.userType = "user"
        }
        else if(userType === "seller"){
            loginData.userType = "seller"
        } else {
            loginData.userType = ""
            alert("User type not found")
            return
        }
        setLoad(true)
        fetch("http://localhost:9000/login",
        {
          method : "POST",
          crossDomain : true,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : "*",
          },
          body: JSON.stringify({
            mail : loginData.mail,
            password : loginData.password,
            userType : loginData.userType
          }),
        })
        .then((ans)=>ans.json())
        .then((data)=>{
            // console.log(data)
            setLoad(false)
            if(data.status==="401"){
                // alert(data.msg)
                // NotificationManager.error(data.msg,"Error",4000)
                alert(JSON.stringify(data.msg))
                return
            }
            else if(data.status==="200"){
                // NotificationManager.success(data.msg,"Success",4000)
                alert(JSON.stringify(data.msg))
                localStorage.setItem("token",data.token);
                localStorage.setItem("userName",data.name ?? "User");
                localStorage.setItem("userId",data.id);
                localStorage.setItem("userType",data.userType);
                if(data.userType ==="seller"){
                    navigate('/')
                }else{
                    navigate('/')
                }
            }
        })
        .catch((error)=>{
            console.log(error)
            setLoad(false)
            // NotificationManager.error(error,"Error",4000)
            alert(JSON.stringify(error))
        })
    }
  return (
    <form onSubmit={handleSubmit} className='login-container'>
        <div className='app-tittle'>
            {/* <img src={"title"} className='tit-img' aria-label='image'/> */}
        </div>
        <div className='login-inputs'>
            <div className='login-heading'>
                {userType === "user" ? "User" : userType === "seller" ? "Seller" : ""} Login
            </div>
            <div className='input-div'>
                <label className='input-label'>Mail : </label><br/>
                <input
                className='input-box'
                type="text"
                name="mail"
                value={values.mail}
                placeholder='Enter your email'
                onChange={handleChange}
                onBlur={handleBlur}
                /><br/>
                {touched.mail && errors.mail ?<span className='error'>{touched.mail && errors.mail}</span>:"" }
            </div>
            <div className='input-div'>
                <label className='input-label'>Password : </label><br/>
                <input
                className='input-box'
                type="password"
                name="password"
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                /><br/>
                {touched.password && errors.password?<span className='error'>{touched.password && errors.password}</span>:""}
            </div>
            <div className='footer'>
                <button className='login-btn' type="submit"> {
                load? "Processing..." :"Login"}
                </button>
                <div className='already'><Link to={`/signup?userType=${userType ?? 'user'}`}>Don't have an account? Signup</Link></div>
                <div className='already'><Link to="/">Home</Link></div>
            </div>
       </div>
    </form>
  )
}

export default Login