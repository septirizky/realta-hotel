import React, { useState } from 'react';
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

const SigninEmployee = () => {
    const [action,setAction]=useState("Sign In")
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        console.log(email,password)
        e.preventDefault();
    
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Save It!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios
                .post(`http://localhost:2112/users/signin`, {
                  email: email, 
                  password: password,
                })
    
                .then((result) => {
                console.log(result.data.token,"ss")
                  Swal.fire("success");
                  navigate("/home");//////menuju ke
                  const token = result.data.token;
                  
                 // console.log(access_token);
                 localStorage.setItem("token", token);
                Cookies.set("token", token);
                })
                .catch((error) => {
                  //assign validation on state
                  
                });
            }
          });
        } catch (err) {
        console.log(err.massage)  
        }
      };

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
