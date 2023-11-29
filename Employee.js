import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TiTimes} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import {
    DeleteDepartment,
    DeleteEmployee, GetDepartment,
    GetEmployee,
    GetJobRole, GetShift,
    PostDepartment,
    UpdateDepartment
} from "../../actions/hrAction";
import Swal from "sweetalert2";
import {MdHistory} from "react-icons/md";

export const Employee = () => {
    const [formEmp, setFormEmp] = useState('')
    const [formEditEmp, setFormEditEmp] = useState('')
    const [formKeyword, setFormKeyword] = useState('')
    const [image, setImage] = useState("https://via.placeholder.com/100")
    const [imageSave, setImageSave] = useState(null)
    const [isAddEmp, setIsAddEmp] = useState(false)
    const [isDelEmp, setIsDelEmp] = useState(false)
    const [isPutEmp, setIsPutEmp] = useState(false)
    const dispatch = useDispatch()
    const [generalForm, setGeneralForm] = useState({
        emp_national_id: 0,
        emp_fullname: '',
        emp_birth_date: '',
        emp_hire_date: '',
        emp_marital_status: '',
        emp_gender: '',
        emp_salaried_flag: '',
        emp_vacation_hours: '',
        emp_sickleave_hours: '',
        emp_current_flag:'',
        emp_photo: imageSave,
        emp_joro_id:''
    })
    const {
        getEmployeeResult,
        getJobRoleResult,
        getDepartmentResult,
        getShiftResult,
        postDepartmentResult,
        updateDepartmentResult,
        deleteEmployeeResult,
        getEmployeeLoading,
        getEmployeeError
    } = useSelector((state) => state.HrReducer)
    const postEmp = () => {
        setIsAddEmp(true)
        // dispatch(({dept_name: formDept}))
    }
    const updateEmp = (id) => {
        setIsPutEmp(true)
        // dispatch(UpdateDepartment(id, {dept_name: formEditDept}))
    }
    const deleteEmp = (id, event, name) => {
        Swal.fire({
            title: `Delete Employee ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelEmp(true)
                dispatch(DeleteEmployee(id))
            }
        })
    }
    useEffect(() => {
        if (isDelEmp) {
            let timerInterval
            Swal.fire({
                title: 'Delete Employee success',
                html: 'Auto Close',
                timer: 1100,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        dispatch(GetEmployee())
        dispatch(GetJobRole())
        dispatch(GetShift())
        dispatch(GetDepartment({dept_name: ''}))
        setIsDelEmp(false)
    }, [deleteEmployeeResult]);
    return (
        <div>
            <h1>Employee</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Employee</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-2 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addModal">
                        <BiPlus size='26'/> Add Employee
                    </button>
                </div>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="text"
                                       onChange={(e) => setFormKeyword(e.target.value)}
                                       value={formKeyword}
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Search Employee</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="text"
                                       onChange={(e) => setFormKeyword(e.target.value)}
                                       value={formKeyword}
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Search Employee</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover align-middle">
                <caption>Jumlah data : {getEmployeeResult ? getEmployeeResult.length : 0}</caption>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">National ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Birth Date</th>
                    <th scope="col">Hire Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className='text-end'>

                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getEmployeeResult ? (
                        getEmployeeResult.length !== 0 ? (
                            getEmployeeResult.map((value, index) => {
                                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                let birthDate = new Date(value.emp_birth_date)
                                let hireDate = new Date(value.emp_hire_date)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{value.emp_id}</th>
                                        <td>{value.emp_national_id}</td>
                                        <td>{value.emp_fullname}</td>
                                        <td>{(birthDate.getDate().toString().split('').length === 1 ? '0' + birthDate.getDate() : birthDate.getDate()) + " " + months[birthDate.getMonth()] + " " + birthDate.getFullYear()}</td>
                                        <td>{(hireDate.getDate().toString().split('').length === 1 ? '0' + birthDate.getDate() : birthDate.getDate()) + " " + months[hireDate.getMonth()] + " " + hireDate.getFullYear()}</td>
                                        <td>{value.emp_current_flag ? (
                                            <span className="badge bg-success">Active</span>) : (
                                            <span className="badge bg-danger">Inactive</span>)}</td>
                                        <td className='text-end pe-4'>
                                            <div className="dropstart">
                                                <button className='btn btn-light' data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow" href='#'
                                                           onClick={() => setFormEditEmp(value.dept_name)}
                                                           data-bs-toggle="modal"
                                                           data-bs-target={"#editModal" + value.dept_id}><FiEdit
                                                            size='16'/> Edit</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow"
                                                           href='#'><MdHistory size='16'/> Salary History</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow"
                                                           href='#'><MdHistory size='16'/> Department History</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow text-danger"
                                                           onClick={(e) => deleteEmp(value.emp_id, e, value.emp_fullname)}
                                                           href='#'><FiTrash size='16'/> Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="modal fade" id={"editModal" + value.dept_id} tabIndex="-1"
                                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <form>
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Add
                                                                    Department</h5>
                                                                <TiTimes data-bs-dismiss="modal" aria-label="Close"
                                                                         color='#EBAB2D' size={26}/>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-floating m-3">
                                                                    <input type="text"
                                                                           onChange={(e) => setFormEditEmp(e.target.value)}
                                                                           value={formEditEmp}
                                                                           className="form-control text-dark"
                                                                           id="addEmp"
                                                                           placeholder="name@example.com" required/>
                                                                    <label htmlFor="addEmp">Department</label>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-dark"
                                                                        data-bs-dismiss="modal">Close
                                                                </button>
                                                                <button type="button" className="btn custom-btn-yellow"
                                                                        onClick={() => updateEmp(value.dept_id)}
                                                                        data-bs-dismiss="modal">Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan='7' className='text-center'>Tidak ada data</td>
                            </tr>
                        )
                    ) : getEmployeeLoading ? (
                        <tr>
                            <td colSpan='3'>Loading...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='3'>{getEmployeeError}</td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            <div className="modal fade modal-xl" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
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
                                                <input type="text" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" placeholder='16 digit'
                                                       id="National"
                                                       required/>
                                                <label htmlFor="National">National ID</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="text" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" id="dept"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="dept">Fullname</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="date" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" id="addEmp"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="addEmp">Birth Date</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="date" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" id="addEmp"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="addEmp">Hire Date</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp"
                                                        aria-label="Floating label select example">
                                                    <option value="S">Single</option>
                                                    <option value="M">Married</option>
                                                </select>
                                                <label htmlFor="addEmp">Marital Status</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp"
                                                        aria-label="Floating label select example">
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                                <label htmlFor="addEmp">Gender</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp"
                                                        aria-label="Floating label select example">
                                                    <option value="0">Hourly</option>
                                                    <option value="1">Monthly</option>
                                                </select>
                                                <label htmlFor="addEmp">Salaried Flag</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp"
                                                        aria-label="Floating label select example">
                                                    <option value="1">Active</option>
                                                    <option value="0">InActive</option>
                                                </select>
                                                <label htmlFor="addEmp">Current Flag</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="number" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" id="addEmp"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="addEmp">Vacation Hours</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-floating">
                                                <input type="number" onChange={(e) => setFormEmp(e.target.value)}
                                                       value={formEmp}
                                                       className="form-control text-dark" id="addEmp"
                                                       placeholder="name@example.com" required/>
                                                <label htmlFor="addEmp">Sick Leave Hours</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            {
                                                getJobRoleResult ? (
                                                    <div className="form-floating">
                                                        <select className="form-select" id="addEmp"
                                                                aria-label="Floating label select example">
                                                            {getJobRoleResult.map((value) => {
                                                                return (
                                                                    <option value={value.joro_id}>{value.joro_name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        <label htmlFor="addEmp">Job Role</label>
                                                    </div>

                                                ) : (
                                                    <div>
                                                        Job Role tidak ada
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div>
                                        <img className='object-fit-contain' style={{width: "100%", height: "330px"}}
                                             src={image} alt=''/>
                                    </div>
                                    <div className='mt-3'>
                                        <input type="file" className="form-control text-dark" id="addEmp"
                                               onChange={(e) => {
                                                   setImageSave(e.target.files[0])
                                                   setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")
                                               }}
                                               placeholder="name@example.com" required/>
                                    </div>
                                </div>
                            </div>
                            <h6>Salary</h6>
                            <hr/>
                            <div className='row mb-4'>
                                <div className='col'>
                                    <div className="form-floating">
                                        <input type="number" onChange={(e) => setFormEmp(e.target.value)}
                                               value={formEmp}
                                               className="form-control text-dark" placeholder='16 digit'
                                               id="National"
                                               required/>
                                        <label htmlFor="National">Salary Rate</label>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-floating">
                                        <select className="form-select" id="addEmp"
                                                aria-label="Floating label select example">
                                            <option value="0">Hourly</option>
                                            <option value="1">Monthly</option>
                                        </select>
                                        <label htmlFor="addEmp">Frequency</label>
                                    </div>
                                </div>
                            </div>
                            <h6>Assignment</h6>
                            <hr/>
                            <div className='row mb-4'>
                                <div className='col'>
                                    {
                                        getDepartmentResult ? (
                                            <div className="form-floating">
                                                <select className="form-select" id="addEmp"
                                                        aria-label="Floating label select example">
                                                    {getDepartmentResult.map((value) => {
                                                        return (
                                                            <option value={value.dept_id}>{value.dept_name}</option>
                                                        )
                                                    })}
                                                </select>
                                                <label htmlFor="addEmp">Department</label>
                                            </div>

                                        ) : (
                                            <div>
                                                Department tidak ada
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col'>
                                    <div className="form-floating">
                                        <input type="date" onChange={(e) => setFormEmp(e.target.value)}
                                               value={formEmp}
                                               className="form-control text-dark" placeholder='16 digit'
                                               id="National"
                                               required/>
                                        <label htmlFor="National">Start Date</label>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-floating">
                                        <input type="date" onChange={(e) => setFormEmp(e.target.value)}
                                               value={formEmp}
                                               className="form-control text-dark" placeholder='16 digit'
                                               id="National"
                                               required/>
                                        <label htmlFor="National">End Date</label>
                                    </div>
                                </div>
                            </div>
                            <h6>Shift</h6>
                            <hr/>
                            {
                                getShiftResult ? (
                                    <div className="form-floating">
                                        <select className="form-select" id="addEmp"
                                                aria-label="Floating label select example">
                                            {getShiftResult.map((value) => {
                                                return (
                                                    <option value={value.shift_id}>{value.shift_name}</option>
                                                )
                                            })}
                                        </select>
                                        <label htmlFor="addEmp">Shift</label>
                                    </div>

                                ) : (
                                    <div>
                                        Shift tidak ada
                                    </div>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                    onClick={() => setFormEmp('')}>Close
                            </button>
                            <button type="button" className="btn custom-btn-yellow" onClick={() => postEmp()}
                                    data-bs-dismiss="modal">Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac est est. Duis id elit ante. Curabitur
                condimentum libero ut hendrerit semper. Duis laoreet, neque at elementum pulvinar, tortor sem cursus
                ligula, quis sollicitudin tellus lacus ut ligula. Sed sed ligula vestibulum massa egestas bibendum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pellentesque risus.

                Cras metus tellus, molestie in nisi ut, dignissim sagittis justo. Proin nec lacinia odio. Nulla
                consequat odio ac magna facilisis tincidunt. In et augue elementum, ullamcorper nulla a, cursus massa.
                Mauris placerat imperdiet nibh. Donec turpis dolor, pellentesque a augue et, condimentum lacinia nibh.
                Aenean eleifend porta commodo. Fusce nec est ut ex interdum ullamcorper eu a turpis. Duis porta et
                lectus et vehicula. Nunc risus felis, fringilla quis lectus at, imperdiet lobortis nibh. Fusce turpis
                felis, ullamcorper id dolor eget, egestas pharetra dolor. Integer nec ligula sed felis porttitor
                placerat sit amet ac purus. Integer consequat interdum lectus, vestibulum aliquam dolor congue vel.
                Suspendisse potenti. Morbi laoreet odio a metus imperdiet blandit.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada mollis mauris in
                pretium. Aenean gravida malesuada consequat. Duis tincidunt ultricies ipsum id hendrerit. Vivamus
                ultricies sem eu purus placerat aliquam. Sed finibus odio et enim commodo vulputate. Donec urna turpis,
                aliquet vel est ac, pharetra rutrum purus. Sed id cursus mi, ut ornare quam. Curabitur efficitur sem a
                eros ornare, quis pharetra felis finibus. Maecenas venenatis orci at tortor gravida tempor. Pellentesque
                fringilla nunc eget enim vulputate, rutrum facilisis magna commodo. Pellentesque pellentesque quam quis
                mi consectetur, eu lobortis urna blandit.

                Cras finibus nunc leo, sed accumsan metus viverra egestas. Donec id elementum eros. Proin vulputate, est
                ut pulvinar rhoncus, lacus felis placerat sapien, vitae dignissim tellus arcu sed neque. Sed in odio
                libero. Ut massa nunc, scelerisque et ligula vitae, bibendum accumsan tortor. Duis nibh velit, eleifend
                iaculis leo in, rutrum feugiat risus. Aenean dapibus urna ac massa tempus, vitae suscipit felis mattis.
                Suspendisse ultrices diam tempor, consequat elit ac, mollis diam.

                Etiam eleifend purus eu velit consectetur, at vulputate ex facilisis. Curabitur viverra, velit ac
                gravida tincidunt, orci quam gravida ex, nec consequat eros nisi sed dui. Donec aliquam purus eget nisi
                varius, et mattis purus pellentesque. Donec libero lacus, aliquam eget magna eu, pharetra gravida nulla.
                Suspendisse facilisis ipsum vitae vulputate eleifend. Suspendisse scelerisque placerat augue eget
                vulputate. Aliquam erat volutpat. Ut vel nisi interdum, pulvinar purus non, ornare dui.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac est est. Duis id elit ante. Curabitur
                condimentum libero ut hendrerit semper. Duis laoreet, neque at elementum pulvinar, tortor sem cursus
                ligula, quis sollicitudin tellus lacus ut ligula. Sed sed ligula vestibulum massa egestas bibendum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pellentesque risus.

                Cras metus tellus, molestie in nisi ut, dignissim sagittis justo. Proin nec lacinia odio. Nulla
                consequat odio ac magna facilisis tincidunt. In et augue elementum, ullamcorper nulla a, cursus massa.
                Mauris placerat imperdiet nibh. Donec turpis dolor, pellentesque a augue et, condimentum lacinia nibh.
                Aenean eleifend porta commodo. Fusce nec est ut ex interdum ullamcorper eu a turpis. Duis porta et
                lectus et vehicula. Nunc risus felis, fringilla quis lectus at, imperdiet lobortis nibh. Fusce turpis
                felis, ullamcorper id dolor eget, egestas pharetra dolor. Integer nec ligula sed felis porttitor
                placerat sit amet ac purus. Integer consequat interdum lectus, vestibulum aliquam dolor congue vel.
                Suspendisse potenti. Morbi laoreet odio a metus imperdiet blandit.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada mollis mauris in
                pretium. Aenean gravida malesuada consequat. Duis tincidunt ultricies ipsum id hendrerit. Vivamus
                ultricies sem eu purus placerat aliquam. Sed finibus odio et enim commodo vulputate. Donec urna turpis,
                aliquet vel est ac, pharetra rutrum purus. Sed id cursus mi, ut ornare quam. Curabitur efficitur sem a
                eros ornare, quis pharetra felis finibus. Maecenas venenatis orci at tortor gravida tempor. Pellentesque
                fringilla nunc eget enim vulputate, rutrum facilisis magna commodo. Pellentesque pellentesque quam quis
                mi consectetur, eu lobortis urna blandit.

                Cras finibus nunc leo, sed accumsan metus viverra egestas. Donec id elementum eros. Proin vulputate, est
                ut pulvinar rhoncus, lacus felis placerat sapien, vitae dignissim tellus arcu sed neque. Sed in odio
                libero. Ut massa nunc, scelerisque et ligula vitae, bibendum accumsan tortor. Duis nibh velit, eleifend
                iaculis leo in, rutrum feugiat risus. Aenean dapibus urna ac massa tempus, vitae suscipit felis mattis.
                Suspendisse ultrices diam tempor, consequat elit ac, mollis diam.

                Etiam eleifend purus eu velit consectetur, at vulputate ex facilisis. Curabitur viverra, velit ac
                gravida tincidunt, orci quam gravida ex, nec consequat eros nisi sed dui. Donec aliquam purus eget nisi
                varius, et mattis purus pellentesque. Donec libero lacus, aliquam eget magna eu, pharetra gravida nulla.
                Suspendisse facilisis ipsum vitae vulputate eleifend. Suspendisse scelerisque placerat augue eget
                vulputate. Aliquam erat volutpat. Ut vel nisi interdum, pulvinar purus non, ornare dui.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac est est. Duis id elit ante. Curabitur
                condimentum libero ut hendrerit semper. Duis laoreet, neque at elementum pulvinar, tortor sem cursus
                ligula, quis sollicitudin tellus lacus ut ligula. Sed sed ligula vestibulum massa egestas bibendum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pellentesque risus.

                Cras metus tellus, molestie in nisi ut, dignissim sagittis justo. Proin nec lacinia odio. Nulla
                consequat odio ac magna facilisis tincidunt. In et augue elementum, ullamcorper nulla a, cursus massa.
                Mauris placerat imperdiet nibh. Donec turpis dolor, pellentesque a augue et, condimentum lacinia nibh.
                Aenean eleifend porta commodo. Fusce nec est ut ex interdum ullamcorper eu a turpis. Duis porta et
                lectus et vehicula. Nunc risus felis, fringilla quis lectus at, imperdiet lobortis nibh. Fusce turpis
                felis, ullamcorper id dolor eget, egestas pharetra dolor. Integer nec ligula sed felis porttitor
                placerat sit amet ac purus. Integer consequat interdum lectus, vestibulum aliquam dolor congue vel.
                Suspendisse potenti. Morbi laoreet odio a metus imperdiet blandit.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada mollis mauris in
                pretium. Aenean gravida malesuada consequat. Duis tincidunt ultricies ipsum id hendrerit. Vivamus
                ultricies sem eu purus placerat aliquam. Sed finibus odio et enim commodo vulputate. Donec urna turpis,
                aliquet vel est ac, pharetra rutrum purus. Sed id cursus mi, ut ornare quam. Curabitur efficitur sem a
                eros ornare, quis pharetra felis finibus. Maecenas venenatis orci at tortor gravida tempor. Pellentesque
                fringilla nunc eget enim vulputate, rutrum facilisis magna commodo. Pellentesque pellentesque quam quis
                mi consectetur, eu lobortis urna blandit.

                Cras finibus nunc leo, sed accumsan metus viverra egestas. Donec id elementum eros. Proin vulputate, est
                ut pulvinar rhoncus, lacus felis placerat sapien, vitae dignissim tellus arcu sed neque. Sed in odio
                libero. Ut massa nunc, scelerisque et ligula vitae, bibendum accumsan tortor. Duis nibh velit, eleifend
                iaculis leo in, rutrum feugiat risus. Aenean dapibus urna ac massa tempus, vitae suscipit felis mattis.
                Suspendisse ultrices diam tempor, consequat elit ac, mollis diam.

                Etiam eleifend purus eu velit consectetur, at vulputate ex facilisis. Curabitur viverra, velit ac
                gravida tincidunt, orci quam gravida ex, nec consequat eros nisi sed dui. Donec aliquam purus eget nisi
                varius, et mattis purus pellentesque. Donec libero lacus, aliquam eget magna eu, pharetra gravida nulla.
                Suspendisse facilisis ipsum vitae vulputate eleifend. Suspendisse scelerisque placerat augue eget
                vulputate. Aliquam erat volutpat. Ut vel nisi interdum, pulvinar purus non, ornare dui.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac est est. Duis id elit ante. Curabitur
                condimentum libero ut hendrerit semper. Duis laoreet, neque at elementum pulvinar, tortor sem cursus
                ligula, quis sollicitudin tellus lacus ut ligula. Sed sed ligula vestibulum massa egestas bibendum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pellentesque risus.

                Cras metus tellus, molestie in nisi ut, dignissim sagittis justo. Proin nec lacinia odio. Nulla
                consequat odio ac magna facilisis tincidunt. In et augue elementum, ullamcorper nulla a, cursus massa.
                Mauris placerat imperdiet nibh. Donec turpis dolor, pellentesque a augue et, condimentum lacinia nibh.
                Aenean eleifend porta commodo. Fusce nec est ut ex interdum ullamcorper eu a turpis. Duis porta et
                lectus et vehicula. Nunc risus felis, fringilla quis lectus at, imperdiet lobortis nibh. Fusce turpis
                felis, ullamcorper id dolor eget, egestas pharetra dolor. Integer nec ligula sed felis porttitor
                placerat sit amet ac purus. Integer consequat interdum lectus, vestibulum aliquam dolor congue vel.
                Suspendisse potenti. Morbi laoreet odio a metus imperdiet blandit.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada mollis mauris in
                pretium. Aenean gravida malesuada consequat. Duis tincidunt ultricies ipsum id hendrerit. Vivamus
                ultricies sem eu purus placerat aliquam. Sed finibus odio et enim commodo vulputate. Donec urna turpis,
                aliquet vel est ac, pharetra rutrum purus. Sed id cursus mi, ut ornare quam. Curabitur efficitur sem a
                eros ornare, quis pharetra felis finibus. Maecenas venenatis orci at tortor gravida tempor. Pellentesque
                fringilla nunc eget enim vulputate, rutrum facilisis magna commodo. Pellentesque pellentesque quam quis
                mi consectetur, eu lobortis urna blandit.

                Cras finibus nunc leo, sed accumsan metus viverra egestas. Donec id elementum eros. Proin vulputate, est
                ut pulvinar rhoncus, lacus felis placerat sapien, vitae dignissim tellus arcu sed neque. Sed in odio
                libero. Ut massa nunc, scelerisque et ligula vitae, bibendum accumsan tortor. Duis nibh velit, eleifend
                iaculis leo in, rutrum feugiat risus. Aenean dapibus urna ac massa tempus, vitae suscipit felis mattis.
                Suspendisse ultrices diam tempor, consequat elit ac, mollis diam.

                Etiam eleifend purus eu velit consectetur, at vulputate ex facilisis. Curabitur viverra, velit ac
                gravida tincidunt, orci quam gravida ex, nec consequat eros nisi sed dui. Donec aliquam purus eget nisi
                varius, et mattis purus pellentesque. Donec libero lacus, aliquam eget magna eu, pharetra gravida nulla.
                Suspendisse facilisis ipsum vitae vulputate eleifend. Suspendisse scelerisque placerat augue eget
                vulputate. Aliquam erat volutpat. Ut vel nisi interdum, pulvinar purus non, ornare dui.
            </p>
        </div>
    )
}
