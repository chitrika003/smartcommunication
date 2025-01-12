import React, { useState } from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
// import png from './bikewash.png';
// import title from "./title1.png"

const Signup = () => {

    const navigate = useNavigate()
    const [load,setLoad] = useState(false)
    const [userType,setUserType] = useState(new URLSearchParams(window.location.search).get('userType'))
    const [secretkey,setSecretkey] = useState("")
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [mail,setMail] = useState("")
    const [password,setPassword] = useState("")

    const signup = ()=>{

        if(userType === '' || !userType) {
            alert("Please select a user type")
            return
        }
        if(userType === "seller" && secretkey===""){
            // NotificationManager.warning("Please enter the secret key","Warning",5000);
            alert("Please enter the secret key")
            return
        }

        if(name === ""){
            alert("Please enter your name")
            return
        }

        if(mail === ""){
            alert("Please enter your email")
            return
        }

        if(phone === ""){
            alert("Please enter your phone number")
            return
        }

        if(password === ""){
            alert("Please enter your password")
            return
        }

        if(password.length<8){
            alert("Password must be at least 8 characters long")
            return
        }

        if(phone.length<10){
            alert("Phone number must be at least 10 digits long")
            return
        }

        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)){
            alert("Invalid email address")
            return
        }

        // console.log(values)
        setLoad(true)
        // https://bikewashapp.onrender.com/signup
        fetch("http://localhost:9000/signup",
        {
          method : "POST",
          crossDomain : true,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : "*",
          },
          body: JSON.stringify({
            name,
            mail,
            phone,
            password,
            usertype: userType,
            secretkey,
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
                alert(JSON.stringify(data.msg));
                console.log({data})
                // localStorage.setItem("userName",data.name ?? "User");
                // localStorage.setItem("token",data.token);
                // localStorage.setItem("userType",data.usertype);
                // localStorage.setItem("userId",data.id);
                navigate(`/login?userType=${userType}`) 
            }
            else if(data.msg==="Invalid Seller secret key"){
                // NotificationManager.error(data.msg,"Error !! Please enter the correct Secret key",4000)
                alert(JSON.stringify(data.msg))
            }
        })
        .catch((error)=>{
            console.log(error)
            setLoad(false)
            alert(JSON.stringify(error?.message))
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        signup()
    }

return (

    <div className='signup-container'>
        <div className='signup-inputs'>

            <div className='signup-heading'>
                {userType === "user" ? "User" : userType === "seller" ? "Seller" : ""} Signup
            </div>

            <div className='input-div'>
                <label className='input-label'>Name : </label><br/>
                <input
                    className='input-box'
                    type="text"
                    name="name"
                    value={name}
                    placeholder='Enter your name here'
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    onBlur={()=>{
                        setName(name)
                    }}
                /><br/>
                {/* {formik.touched.name && formik.errors.name ?<span className='error'>{formik.errors.name}</span>:"" } */}
            </div>

            <div className='input-div'>
                <label className='input-label'>Mail : </label><br/>
                <input
                    className='input-box'
                    type="text"
                    name="mail"
                    placeholder='Enter your email here'
                    value={mail}
                    onChange={(e)=>{
                        setMail(e.target.value)
                    }}
                    onBlur={()=>{
                        setMail(mail)
                    }}
                /><br/>
                {/* {formik.touched.mail && formik.errors.mail ?<span className='error'>{formik.errors.mail}</span>:"" } */}
            </div>

            <div className='input-div'>
                <label className='input-label'>Phone : </label><br/>
                <input
                    className='input-box'
                    type="text"
                    name="phone"
                    placeholder='Enter your number here'
                    value={phone}
                    onChange={(e)=>{
                        setPhone(e.target.value)
                    }}
                    onBlur={()=>{
                        setPhone(phone)
                    }}
                /><br/>
                {/* {formik.touched.phone && formik.errors.phone?<span className='error'>{formik.errors.phone}</span>:""} */}
            </div>

            <div className='input-div'>
                <label className='input-label'>Password : </label><br/>
                    <input
                        className='input-box'
                        type="password"
                        name="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        onBlur={()=>{
                            setPassword(password)
                        }}
                    /><br/>
                {/* {formik.touched.password && formik.errors.password?<span className='error'>{formik.errors.password}</span>:""} */}
            </div> 

            <div className='input-div'>
                <label className='input-label'>User type : </label><br/>
                <select
                    className='select-box'
                    name="usertype"
                    value={userType}
                    onChange={(e)=>{
                        setUserType(e.target.value)
                    }}
                    onBlur={()=>{
                        setUserType(userType)
                    }}
                >
                    <option className='value' value="" label="Select a User type" />
                    <option className='value' value="user" label="User" />
                    <option className='value' value="seller" label="Seller" />
                </select><br/>
                {/* {touched.usertype && errors.usertype?<span className='error'>{touched.usertype && errors.usertype}</span>:""} */}
            </div>

            {userType==="seller"?
            <div className='input-div'>
                <label className='input-label'>Secret key : </label><br/>
                <input
                    className='input-box'
                    type="text"
                    name="secretkey"
                    value={secretkey}
                    onChange={(e)=>{
                        setSecretkey(e.target.value)
                    }}
                    onBlur={()=>{
                        setSecretkey(secretkey)
                    }}
                /><br/>
                {/* {formik.touched.secretkey && formik.errors.secretkey?<span className='error'>{formik.errors.secretkey}</span>:""} */}
            </div>:""}

            <div className='footer'>
                <button className='btn' type="submit" onClick={handleFormSubmit}>
                    {load? "Submitting..." :"Signup"}
                </button>
                <div className='already'><Link to={`/login?userType=${userType ?? 'user'}`}>Already have an account?  Login</Link></div>
            </div>
        </div>
    </div> 

  )
}

export default Signup