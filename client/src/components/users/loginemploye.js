import React, { useEffect, useState } from 'react';
import "./css/singupEmployee.css";
import user_icon from "./Image/person.png";
import email_icon from "./Image/email.png";
import password_icon from "./Image/password.png";
import phone_icon from "./Image/phone.png"
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { LogUsers } from '../../actions/usersAction';



const SigninEmployee = () => {
    const [action,setAction]=useState("Sign In")
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate()
    const [islogin,setislogin]=useState(false)
    const dispatch = useDispatch()

    
    const { loading,data,errorMessage } = useSelector(
        (state) => state.UserReducer
      );

    const handleLogin = async(e)=>{
        e.preventDefault();
        const data = {
          email,
          password,
        };
        setislogin(true)
        dispatch(LogUsers(data))
        
    //   .then((result) => {
    //       Swal.fire('Login Berhasil!');
          
    //       const token = result.token;
    //         localStorage.setItem("token", token);
    //         Cookies.set("token", token);
    //         navigate('/user/Profile/');
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
  }

  useEffect(()=>{
    if(islogin){
        Swal.fire('Login Berhasil!');
              const token = data.token;
                localStorage.setItem("token", token);
                Cookies.set("token", token);
                navigate('/Home');
        console.log(islogin)
    }
  },[data]
  )


    return (
        <div className='container123'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={email_icon} alt=''/>
                    <input type='email'value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                </div>

                <div className='input'>
                    <img src={password_icon} alt=''/>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <div className='forgot-password'>Jika Anda Belum Mempunyai Akun!!  
                    <Link to="/register" style={{ textDecoration: "none" }}>
                    <span>Click Here</span>
                    </Link>
                    </div>

                <div className='submit-container'>
                    <div onClick={handleLogin} className={action==="Login"?"submit gray":"submit"}>Login</div>
                </div>
            </div>
        </div>
    );
}

export default SigninEmployee;
