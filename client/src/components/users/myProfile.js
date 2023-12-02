import React , { useState,useEffect } from 'react';
import {BiPlus} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { InsProfile, ChaPassword } from '../../actions/usersAction';
import {MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage,MDBBtn,MDBBreadcrumb,MDBBreadcrumbItem,
        } from 'mdb-react-ui-kit';
        

export default function ProfilePage() {

  
  const [formEmp, setFormEmp] = useState('')
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('bonus');
    const handleTabChange = (tab) => {
      setActiveTab(tab)};

  const [image, setImage] = useState("https://via.placeholder.com/100")
  const [imageSave, setImageSave] = useState()

  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [type,settype] = useState('')
  const [company,setcompany] = useState('')
  const [handphone, sethandphone] = useState('')
  const [roletype, setroletype] = useState('')
  const [nationalid,setnationalid] = useState('')
  const [birthdate,setbirthdate] = useState('')
  const [jobtitle,setjobtitle] = useState('')
  const [gender,setgender] = useState('')
  const [maritalstatus,setmaritalstatus] = useState('')
  const [prestige,setprestige]= useState('')
 
  const [currentpassword,setcurrentpassword] = useState('')
  const [newpassword,setnewpassword] = useState('')
  const [retypepassword,setretypepassword] = useState('')

  const dispatch = useDispatch()

  const token = Cookies.get('token')?jwtDecode(Cookies.get('token')):'';
  // const decode = jwtDecode();
  useEffect(()=>{
    if(token){
      setusername(token.existingUser[0].user_full_name)
      setemail(token.existingUser[0].user_email)
      settype(token.existingUser[0].user_type)
      setcompany(token.existingUser[0].user_company_name)
      sethandphone(token.existingUser[0].user_phone_number)
      // setroletype(token.existingUser.user_phone_number)
      // setnationalid(token.existingUser.user_phone_number)
      // setbirthdate(token.existingUser.user_phone_number)
      // setjobtitle(token.existingUser.user_phone_number)
      // setgender(token.existingUser.user_phone_number)
      // setmaritalstatus(token.existingUser.user_phone_number)
      // setprestige(token.existingUser.user_phone_number)
    console.log(token)}
  },[])

const insertdata = async(e)=>{
  e.preventDefault();
        const data = {
          username,email,type,company,handphone,roletype,nationalid,birthdate,jobtitle,gender,maritalstatus
        };
        dispatch(InsProfile(data))
      .then((result) => {
          Swal.fire('Succes');
        })
        .catch((error) => {
          console.log(error.message);
          Swal.fire('Error', 'Failed to save profile data', 'error');
        });
}
  
  ///buat pass
  const changePassword = async(e)=>{
    e.preventDefault();
      const data = {
            currentpassword,newpassword,retypepassword
          };
          dispatch(ChaPassword(data))
        .then((result) => {
            Swal.fire('Succes');
  
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire('Error', 'Failed to save password', 'error');
          });
        }


  /////link buat mencet tombol atas nya
  const home = (Link)=>{
    window.location.href=Link
  }
 

  // const insertdata =async(e)=>{
  //   try {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         const requestData = {
  //           user_full_name: username,
  //           user_type: type,
  //         };
  //         const response = await axios.post('http://localhost:2112/users/insert', requestData, {
  //           timeout: 12000,
  //         });

  //         if (response.data && response.data.message === 'Success') {
  //           Swal.fire('Success');
  //         } else {
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error.message || 'An error occurred');
  //   }
  // };

  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'
                onClick={() => home('/')}
                >Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#"
                onClick={() => home('/')}
                >User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <h6>General</h6>
                <hr/>
                <h5> This information will be display, so careful what you share</h5>
                <div className="row">
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle "
                    style={{ width: '150px' }}
                    fluid
                  />
                    </div>
                    <div class="col-10">
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {username?(<MDBCardText className="text-muted">{username ? username : "Johnatan Smith"}</MDBCardText>):("-")}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Prestige</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {prestige?(<MDBCardText className="text-muted">{prestige ? prestige : "Gold Member"}example@example.com</MDBCardText>):("-")}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Type</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {type?(<MDBCardText className="text-muted">{type ? type : "Travel Agent"}</MDBCardText>):("-")}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {email?(<MDBCardText className="text-muted">{email}</MDBCardText>):("-")}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone Number</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        {handphone?(<MDBCardText className="text-muted">{handphone ? handphone : "082269764383"}</MDBCardText>):("-")}
                      </MDBCol>
                      <MDBCol sm="3" className='float-end' >
                      <div class="d-flex justify-content-end">
                      <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                          data-bs-target="#addModal">
                          <BiPlus size='26'/> Edit
                      </button>
                      </div>
                      </MDBCol>
                    </MDBRow>
                    </div>
                </div>

                
                <div className="modal fade modal-xl" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <div className="modal-body">
                            <h6>General</h6>
                            <hr/>
                            <div className='row'>
                                <div className='col-sm-9'>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" value={username} onChange={(e) => setusername(e.target.value)}
                                                       className="form-control text-dark" placeholder='16 digit'
                                                       id="Username"
                                                       required/>
                                                <label htmlFor="Username">Username</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" value={email} onChange={(e) => setemail(e.target.value)}
                                                       className="form-control text-dark" id="dept"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="Email">Email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp" value={type} onChange={(e) => settype(e.target.value)}
                                                        aria-label="Floating label select example">
                                                    <option value="T">Travel Agent</option>
                                                    <option value="C">Corporate</option>
                                                    <option value="I">Individual</option>
                                                </select>
                                                <label htmlFor="Type">Type</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" value={company} onChange={(e) => setcompany(e.target.value)}
                                                       className="form-control text-dark" id="Company"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="Company">Company</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                    <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" value={handphone} onChange={(e) => sethandphone(e.target.value)}
                                                       className="form-control text-dark" id="dept"
                                                       placeholder="32 digit" required/>
                                                <label htmlFor="dept">Handphone</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" disabled  id="Role Type" 
                                                       value={roletype} onChange={(e) => setroletype(e.target.value)}
                                                        aria-label="Floating label select example">
                                                    <option value="1">Guest</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3">Office Boy</option>
                                                    <option value="4">Admin</option>
                                                    <option value="25">Staff</option>
                                                </select>
                                                <label htmlFor="Role Type">Role Type</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div>
                                        <img className='object-fit-contain' style={{width: "175px", height: "175px", marginLeft:'25px'}}
                                             src={image} alt=''/>
                                    </div>
                                    <div className='mt-2'>
                                        <input type="file" className="form-control text-dark" id="addEmp"
                                               onChange={(e) => {
                                                   setImageSave(e.target.files[0])
                                                   setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")
                                               }}
                                               placeholder="name@example.com" required/>
                                    </div>
                                </div>
                            </div>
                            <h6>Profile</h6>
                            <hr/>
                            <div className='row mb-4'>
                            <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" 
                                                       value={nationalid} onChange={(e) => setnationalid(e.target.value)}
                                                       className="form-control text-dark" placeholder='16 digit'
                                                       id="National"
                                                       required/>
                                                <label htmlFor="National">National ID</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="date" 
                                                       value={birthdate} onChange={(e) => setbirthdate(e.target.value)}
                                                       className="form-control text-dark" id="Birth Date"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="Birth Date">Birth Date</label>
                                            </div>
                                        </div>
                            </div>
                              <div className='row mb-4'>
                              <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" 
                                                       value={jobtitle} onChange={(e) => setjobtitle(e.target.value)}
                                                       className="form-control text-dark" placeholder='16 digit'
                                                       id="Job Title"
                                                       required/>
                                                <label htmlFor="Job Title">Job Title</label>
                                            </div>
                                        </div> 
                              </div>
                            <div className='row mb-4'>
                            <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="Gender" 
                                                   value={gender} onChange={(e) => setgender(e.target.value)}
                                                        aria-label="Floating label select example">
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                                <label htmlFor="Gender">Gender</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="Marital Status"
                                                    value={maritalstatus} onChange={(e) => setmaritalstatus(e.target.value)}
                                                        aria-label="Floating label select example">
                                                    <option value="S">Single</option>
                                                    <option value="M">Married</option>
                                                </select>
                                                <label htmlFor="Marital Status">Marital Status</label>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                    onClick={() => setFormEmp('')}>Close
                            </button>
                            <button type="button" className="btn custom-btn-yellow" data-bs-dismiss="modal"
                            onClick={insertdata}> Submit
                            </button>
                        </div>
                    </div>
                    </div>
                    </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>


{/*              table 2                      */}



          {roletype === "1"?(<MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <h6>Security</h6>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Change Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    {newpassword?(<MDBCardText className="text-muted">**********</MDBCardText>):("-")}
                  </MDBCol>
                  <MDBCol sm="2">
                  <div class="d-flex justify-content-end">
                  <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addModal1">
                        <BiPlus size='20'/> Edit
                  </button>
                  </div>
                  </MDBCol>
                </MDBRow>
                

                <div className="modal fade modal-xl" id="addModal1" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <div className="modal-body">
                        <div className="input-group mb-4" >
                                          <span className="input-group-text ">Current Password</span>
                                          <input type="text" 
                                          value={currentpassword} onChange={(e) => setcurrentpassword(e.target.value)}
                                            aria-label="First name" 
                                            class="form-control" />
                                        </div>
                                        
                                <div className="input-group mb-4">
                                    <span class="input-group-text">New Password</span>
                                  <input type="text" 
                                  value={newpassword} onChange={(e) => setnewpassword(e.target.value)}
                                  aria-label="First name" 
                                  class="form-control" />
                                </div>
                                <div className="input-group">
                                <span class="input-group-text">Re-type Password</span>
                                <input type="text" 
                                value={retypepassword} onChange={(e) => setretypepassword(e.target.value)}
                                aria-label="First name" 
                                class="form-control" />
                              </div>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                    onClick={() => setFormEmp('')}>Close
                            </button>
                            <button type="button" className="btn custom-btn-yellow" 
                                    data-bs-dismiss="modal" onClick={changePassword}>Submit
                            </button>
                        </div>
                    </div>
                    </div>
                    </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>):("")}


{/*                          Table 3                          */}
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <h6>Security</h6>
                <hr />
                <MDBRow>
                
                <ul className="nav nav-tabs mb-3" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'bonus' ? 'active' : ''}`}
                      onClick={() => handleTabChange('bonus')}
                    >
                      Bonus Points
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
                      onClick={() => handleTabChange('members')}
                    >
                      History Members
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent0">
                  {/* KOLOM Bonus Points */}
                  <div className={`tab-pane fade ${activeTab === 'bonus' ? 'show active' : ''}`}>
                    <table className="table">
                    <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Created On</th>
                          <th scope="col">Bonus Type</th>
                          <th scope="col">Point</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>dhgf</td>
                          <td>dhgf</td>
                          <td>@fghd</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>gfh</td>
                          <td>fhdg</td>
                          <td>@dfhg</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>gfh</td>
                          <td>fhdg</td>
                          <td>@dfhg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                 {/*  KOLOM History Members*/} 
                  <div className={`tab-pane fade ${activeTab === 'members' ? 'show active' : ''}`}>
                    <table className="table">
                    <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Promote Date</th>
                          <th scope="col">Member Type</th>
                          <th scope="col">Point</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>dhgf</td>
                          <td>dhgf</td>
                          <td>@fghd</td>
                          <td>@adakok</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>gfh</td>
                          <td>fhdg</td>
                          <td>@dfhg</td>
                          <td>@adakok</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td colspan="2">Larry the Bird</td>
                          <td>@twitter</td>
                          <td>@adakok</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>@ada</td>
                          <td>@ada1</td>
                          <td>@ada3</td>
                          <td>@adakok</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div> 
                                               
                </MDBRow>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>


        </MDBRow>
      </MDBContainer>
    </section>
  );
}