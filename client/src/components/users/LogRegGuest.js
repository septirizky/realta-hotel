import React,{ useState, useEffect } from 'react';
import "./css/LogReg.css"
import { FaFacebookF, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa';
import { LogGuest,RegGuest } from '../../actions/usersAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export const LogRegGuest = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    phone_number: '',
  });
  const [registerData, setRegisterData] = useState({
    phone_number: '',
  });

  const navigate = useNavigate()
  const [islogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const { loginGuestResult, signupGuestResult } = useSelector((state) => state.UsersReducer);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
        phone_number: loginData.phone_number,
      };
      setIsLogin(true);
      try {
        await dispatch(LogGuest(userData)); 
      } catch (error) {
        console.error("Error while logging in:", error);
        setIsLogin(false); 
      }
  };

  const handleRegister = (e) => {
    e.preventDefault();const userData = {
        phone_number: registerData.phone_number,
      };
      setIsLogin(false); // Reset login state when registering
      dispatch(RegGuest(userData));
      try {
        Swal.fire('Register Berhasil')
        setActiveTab('login')
      } catch (error) {
        console.error("Error while registering:", error);
      }
  };

 useEffect(() => {
  console.log(loginGuestResult)
    if (islogin && loginGuestResult && loginGuestResult.token) {
      Swal.fire('Login Berhasil!');
      const token = loginGuestResult.token;
      localStorage.setItem('token', token);
      Cookies.set('token', token);
      navigate('/Home');
    }else if(signupGuestResult && signupGuestResult.data){
      Swal.fire('Registration Successful!');
      setActiveTab('login');}
  }, [islogin, loginGuestResult, navigate,signupGuestResult, setActiveTab]);

  // useEffect(() => {
  //   if (signupGuestResult && signupGuestResult.data) {
  //     Swal.fire('Registration Successful!');
  //     setActiveTab('login');
  //   }
  // }, [signupGuestResult, setActiveTab]);


  return (
    <div className='gktauapa'>
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-lg-6">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                <a
                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                    id="tab-login"
                    href="#pills-login"
                    role="tab"
                    aria-controls="pills-login"
                    aria-selected={activeTab === 'login'}
                    style={{ color:"white" }}
                    onClick={() => handleTabChange('login')}
                >
                    Login
                </a>
                </li>
                <li className="nav-item" role="presentation">
                <a
                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                    id="tab-register"
                    href="#pills-register"
                    role="tab"
                    aria-controls="pills-register"
                    aria-selected={activeTab === 'register'}
                    style={{ color:"white" }}
                    onClick={() => handleTabChange('register')}
                >
                    Register
                </a>
                </li>
            </ul>
            <div className="text-center mb-3">
                <p style={{ color:"white" }}>{activeTab === 'login' ? 'Sign in with:' : 'Sign up with:'}</p>
                <button href="https://www.facebook.com/login/" type="button" className="btn btn-link btn-floating mx-1">
                <FaFacebookF style={{ fontSize: '36px' }}/>
                </button>
                <button href="www.google.com" type="button" className="btn btn-link btn-floating mx-1">
                <FaGoogle style={{ fontSize: '36px' }}/>
                </button>
                <button href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiaWQifQ%3D%3D%22%7D" type="button" className="btn btn-link btn-floating mx-1">
                <FaTwitter style={{ fontSize: '36px' }}/>
                </button>
                <button href="https://github.com/" type="button" className="btn btn-link btn-floating mx-1">
                <FaGithub style={{ fontSize: '36px' }}/>
                </button>
            </div>
            <h5 className="text-center" style={{ color:"white" }}>or:</h5>
            {activeTab === 'login' ? (
                <form onSubmit={handleLogin}>
                <div className="form-outline mb-4" style={{ color:"white" }}>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            className="form-control "
                            value={loginData.phone_number}
                            onChange={(e) => handleInputChange(e, 'login')}
                            required
                        />
                        <label className="form-label" htmlFor="phone_number" >
                            Phone Number
                        </label>
                        </div>

                {/* Submit button */}
                <div className="row mb-4">
                        <div className="col-md-6 d-flex justify-content-center" >
                        {/* <!-- Checkbox --> */}
                        <div className="form-check mb-3 mb-md-0" style={{ color:"white" }}>
                            <input className="form-check-input" type="checkbox" value="" id="loginCheck" defaultChecked  />
                            <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                        </div>
                        </div>

                        <div className="col-md-6 d-flex justify-content-center" >
                        {/* <!-- Simple link --> */}
                        <a style={{ color:"white" }} href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block mb-4 align-content-center  " style={{ color:"white" }}>
                    Sign in
                </button>
                
                    <p style={{ color:"white" }}>Not a member? <a href="#!" style={{ color:"white" }} onClick={() => handleTabChange('register')}>Register</a></p>
                </div>
                </form>
            

            ) : (
        // -----------------------REGISTER---------------------//

                        <form onSubmit={handleRegister}>

                        {/* Phone Number input */}
                        <div className="form-outline mb-4" style={{ color:"white" }}>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            className="form-control"
                            value={registerData.phone_number}
                            onChange={(e) => handleInputChange(e, 'register')}
                            required
                        />
                        <label className="form-label" htmlFor="phone_number">
                            Phone Number
                        </label>
                        </div>

                        {/* Checkbox for agreement */}
                        <div className="form-check d-flex justify-content-center mb-4">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="registerCheck"
                            defaultChecked
                            aria-describedby="registerCheckHelpText"
                            required
                        />
                        
                        <label className="form-check-label" htmlFor="registerCheck" style={{ color:"white" }}>
                            I have read and agree to the terms
                        </label>
                        </div>

                        {/* Submit button */}
                        <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-3">
                            Register
                        </button>
                        <p style={{ color:"white" }}>
                            Already a member? <a href="#!" style={{ color:"white" }} onClick={() => handleTabChange('login')}>Sign in</a>
                        </p>
                        </div>
                        </form>
            )}
        {/* ---------- */}
                </div>
            </div>
        </div>
        </div>
        );
        };


