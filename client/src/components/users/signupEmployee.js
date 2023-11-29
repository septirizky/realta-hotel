import React, { useState } from 'react';
import "./css/singupEmployee.css";
import user_icon from "./Image/person.png";
import email_icon from "./Image/email.png";
import password_icon from "./Image/password.png";
import phone_icon from "./Image/phone.png"
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupEmployee = () => {

    const [action,setAction]=useState("Sign Up")
    const navigate = useNavigate()
    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [phone_number, setPhoneNumber]=useState("");
    const handleRegister = async (e) => {
        console.log(username, email, password, confirmPassword, phone_number)
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
                .post(`http://localhost:2112/users/signupEmployee`, {
                    username: username,
                    email: email, 
                    password: password, 
                    confirmPassword: confirmPassword, 
                    phone_number: phone_number,
                })
    
                .then((result) => {
                console.log("aman")
                  Swal.fire("success");
                  navigate("/signin");//////menuju ke

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
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt=''/>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className='input'>
                    <img src={email_icon} alt=''/>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=''/>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=''/>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                </div>
                <div className='input'>
                    <img src={phone_icon} alt=''/>
                    <input type='phonenumber' value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                </div>
                <div className='submit-container'>
                    <div onClick={handleRegister} className={action==="Login"?"submit gray":"submit"} >Sign Up</div>
                    
                </div>
            </div>
        </div>
    );
}

export default SignupEmployee;
