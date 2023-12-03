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
import { useDispatch } from 'react-redux';
import { LogGuest } from '../../actions/usersAction';

const LoginGuest = () => {

    const [action,setAction]=useState("Sign In")
    const navigate = useNavigate()
    const [phone_number, setPhoneNumber]=useState("");
    const dispatch = useDispatch()

  const handlelogin=async(e)=>{
    e.preventDefault();
        const data = {
          phone_number
        };
        dispatch(LogGuest(data))
      .then((result) => {
          Swal.fire('Login Berhasil!');
          navigate('/user/Profile/');
          const token = result.data.token;
            // console.log(access_token);
            localStorage.setItem("token", token);
            Cookies.set("token", token);
        })
        .catch((error) => {
          console.log(error.message);
        });
  }

    // const handlelogin = async (e) => {
    //     console.log(phone_number)
    //     e.preventDefault();
    
    //     try {
    //       Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, Save It!",
    //       }).then(async (result) => {
    //         if (result.isConfirmed) {
    //           await axios
    //             .post(`http://localhost:2112/users/loginGuest`, {
    //                 phone_number: phone_number,
    //             })
    
    //             .then((result) => {
    //             console.log("aman")
    //               Swal.fire("success");
    //               navigate("/signin");//////menuju ke

    //               const token = result.data.token;
    //               localStorage.setItem("token", token);
    //               Cookies.set("token", token);

    //             })
    //             .catch((error) => {                  
    //             });
    //         }
    //       });
    //     } catch (err) {
    //     console.log(err.massage)  
    //     }
    //   };

    return (
        <div className='container123'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
            <div className='input'>
                    <img src={phone_icon} alt=''/>
                    <input type='phonenumber' value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                </div>
                <div className='forgot-password'>Jika Anda Belum Mempunyai Akun!!  
                    <Link to="/guestRegister" style={{ textDecoration: "none" }}>
                    <span>Click Here</span>
                    </Link>
                    </div>
                <div className='submit-container'>
                    <div onClick={handlelogin} className={action==="Sign Up"?"submit gray":"submit"}>Login</div>
                </div>
            </div>
        </div>
    );
}

export default LoginGuest;
