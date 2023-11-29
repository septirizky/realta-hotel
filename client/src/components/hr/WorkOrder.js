import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetWorkOrder} from "../../actions/hrAction";
import reducers from "../../reducers";
import HrReducer from "../../reducers/hrReducer";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {MdHistory} from "react-icons/md";

export const WorkOrder = () => {
    const [searchForm, setSearchForm] = useState({
        startDate: '',
        endDate: '',
        workOrderStatus: ''
    })
    const {
        getWorkOrderResult,
        getWorkOrderLoading,
        getWorkOrderError,
    } = useSelector((state) => state.HrReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetWorkOrder(searchForm))
    }, [searchForm]);
    return (
        <div>
            <h1>Work Order</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">WorkOrder</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-2 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addModal">
                        <BiPlus size='26'/> Add Work Order
                    </button>
                </div>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="date"
                                       onChange={(e)=> {
                                           setSearchForm({...searchForm, startDate: e.target.value})
                                           console.log(e.target.value)
                                       }}
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Start Date</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="date"
                                       onChange={(e)=>setSearchForm({...searchForm, endDate: e.target.value})}
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">End Date</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <select className="form-select"
                                        onChange={(e) => {
                                            setSearchForm({...searchForm, workOrderStatus: e.target.value})
                                            console.log("Status", e.target.value)
                                        }}
                                        aria-label="Floating label select example">
                                    <option value="">Default</option>
                                    <option value="OPEN">Open</option>
                                    <option value="CLOSED">Closed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                                <label htmlFor="addEmp">Status Work Order</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover align-middle">
                <caption>Jumlah data : {getWorkOrderResult? getWorkOrderResult.length:''}</caption>
                <thead>
                <tr>
                    <th scope="col">Work Order Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created By</th>
                    <th scope="col" className='text-end'>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getWorkOrderResult ? (
                        getWorkOrderResult.length !== 0 ? (
                            getWorkOrderResult.map((value, index) => {
                                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                let workOrderDate = new Date(value.woro_start_date)
                                return (
                                    <tr key={index}>
                                        <td scope="row">{(workOrderDate.getDate().toString().split('').length === 1 ? '0' + workOrderDate.getDate() : workOrderDate.getDate()) + " " + months[workOrderDate.getMonth()] + " " + workOrderDate.getFullYear()}</td>
                                        <td>{value.woro_status}</td>
                                        <td>{value.woro_user_id}</td>
                                        <td className='text-end pe-4'>
                                            <div className="dropstart">
                                                <button className='btn btn-light' data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow" href='#'
                                                           onClick={() => {
                                                               // setImageEdit(value.emp_photo)
                                                               // setValue2("emp_id", value.emp_id)
                                                               // setValue2("emp_photo", value.emp_photo)
                                                               // setValue2("emp_national_id", value.emp_national_id)
                                                               console.log(value)
                                                           }}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editModal"><FiEdit
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
                                                           href='#'><FiTrash size='16'/> Delete</a>
                                                    </li>
                                                </ul>
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
                    ) : getWorkOrderLoading ? (
                        <tr>
                            <td colSpan='3'>Loading...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='3'>{getWorkOrderError}</td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            {/*<div className="modal fade modal-xl" id="addModal" data-bs-keyboard="false" data-bs-backdrop="static"*/}
            {/*     tabIndex="-1" aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>*/}
            {/*                <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}*/}
            {/*                         onClick={() => resetHandler()}/>*/}
            {/*            </div>*/}
            {/*            <form key={1} onSubmit={handleSubmit(postEmp)}>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <h6>General</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row'>*/}
            {/*                        <div className='col-sm-9'>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register('emp_national_id', {required: true})}*/}
            {/*                                            className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                            id="National"*/}
            {/*                                            required/>*/}
            {/*                                        <label htmlFor="National">National ID</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input type="text" {...register('emp_fullname', {required: true})}*/}
            {/*                                               className="form-control text-dark" id="dept"*/}
            {/*                                               placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="dept">Fullname</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input type="date" {...register('emp_birth_date', {required: true})}*/}
            {/*                                               className="form-control text-dark" id="addEmp"*/}
            {/*                                               placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Birth Date</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input type="date" {...register('emp_hire_date', {required: true})}*/}
            {/*                                               className="form-control text-dark" id="addEmp"*/}
            {/*                                               placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Hire Date</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register('emp_marital_status', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="S">Single</option>*/}
            {/*                                            <option value="M">Married</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Marital Status</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register('emp_gender', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="M">Male</option>*/}
            {/*                                            <option value="F">Female</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Gender</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register('emp_salaried_flag', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="0">Hourly</option>*/}
            {/*                                            <option value="1">Monthly</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Salaried Flag</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register('emp_current_flag', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="1">Active</option>*/}
            {/*                                            <option value="0">InActive</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Current Flag</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register('emp_vacation_hours', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Vacation Hours</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register('emp_sickleave_hours', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Sick Leave Hours</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    {*/}
            {/*                                        getJobRoleResult ? (*/}
            {/*                                            <div className="form-floating">*/}
            {/*                                                <select className="form-select"*/}
            {/*                                                        id="addEmp" {...register('emp_joro_id', {required: true})}*/}
            {/*                                                        aria-label="Floating label select example">*/}
            {/*                                                    {getJobRoleResult.map((value) => {*/}
            {/*                                                        return (*/}
            {/*                                                            <option*/}
            {/*                                                                value={value.joro_id}>{value.joro_name}</option>*/}
            {/*                                                        )*/}
            {/*                                                    })}*/}
            {/*                                                </select>*/}
            {/*                                                <label htmlFor="addEmp">Job Role</label>*/}
            {/*                                            </div>*/}

            {/*                                        ) : (*/}
            {/*                                            <div>*/}
            {/*                                                Job Role tidak ada*/}
            {/*                                            </div>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col-sm-3'>*/}
            {/*                            <div>*/}
            {/*                                <img className='object-fit-contain' style={{width: "100%", height: "330px"}}*/}
            {/*                                     src={image} alt=''/>*/}
            {/*                            </div>*/}
            {/*                            <div className='mt-3'>*/}
            {/*                                <input type="file" className="form-control text-dark" id="addEmp"*/}
            {/*                                       onChange={(e) => {*/}
            {/*                                           setImageSave(e.target.files[0])*/}
            {/*                                           setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")*/}
            {/*                                       }}*/}
            {/*                                       placeholder="name@example.com"/>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6>Salary</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row mb-4'>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input type="number" {...register('ephi_rate_salary', {required: true})}*/}
            {/*                                       className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                       id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">Salary Rate</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <select className="form-select"*/}
            {/*                                        id="addEmp" {...register('ephi_pay_frequence', {required: true})}*/}
            {/*                                        aria-label="Floating label select example">*/}
            {/*                                    <option value="0">Hourly</option>*/}
            {/*                                    <option value="1">Monthly</option>*/}
            {/*                                </select>*/}
            {/*                                <label htmlFor="addEmp">Frequency</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6>Assignment</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row mb-4'>*/}
            {/*                        <div className='col'>*/}
            {/*                            {*/}
            {/*                                getDepartmentResult ? (*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register('edhi_dept_id', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            {getDepartmentResult.map((value) => {*/}
            {/*                                                return (*/}
            {/*                                                    <option*/}
            {/*                                                        value={value.dept_id}>{value.dept_name}</option>*/}
            {/*                                                )*/}
            {/*                                            })}*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Department</label>*/}
            {/*                                    </div>*/}
            {/*                                ) : (*/}
            {/*                                    <div>*/}
            {/*                                        Department tidak ada*/}
            {/*                                    </div>*/}
            {/*                                )*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input type="date" {...register('edhi_start_date', {required: true})}*/}
            {/*                                       className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                       id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">Start Date</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input type="date" {...register('edhi_end_date', {required: true})}*/}
            {/*                                       className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                       id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">End Date</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6>Shift</h6>*/}
            {/*                    <hr/>*/}
            {/*                    {*/}
            {/*                        getShiftResult ? (*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <select className="form-select" defaultValue='1'*/}
            {/*                                        id="addEmp" {...register('edhi_shift_id', {required: true})}*/}
            {/*                                        aria-label="Floating label select example">*/}
            {/*                                    {getShiftResult.map((value) => {*/}
            {/*                                        return (*/}
            {/*                                            <option value={value.shift_id}>{value.shift_name}</option>*/}
            {/*                                        )*/}
            {/*                                    })}*/}
            {/*                                </select>*/}
            {/*                                <label htmlFor="addEmp">Shift</label>*/}
            {/*                            </div>*/}
            {/*                        ) : (*/}
            {/*                            <div>*/}
            {/*                                Shift tidak ada*/}
            {/*                            </div>*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*                <div className="modal-footer">*/}
            {/*                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close*/}
            {/*                    </button>*/}
            {/*                    <button type="submit" className="btn custom-btn-yellow">Submit*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="modal fade modal-xl" id="editModal" data-bs-keyboard="false" data-bs-backdrop="static"*/}
            {/*     tabIndex="-1" aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>*/}
            {/*                <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}*/}
            {/*                         onClick={() => resetHandler()}/>*/}
            {/*            </div>*/}
            {/*            <form key={2} onSubmit={handleSubmit2(updateEmp)}>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <h6 className="text-start">General</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row'>*/}
            {/*                        <div className='col-sm-9'>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <input type='text' {...register2('emp_id', {required: true})} hidden/>*/}
            {/*                                    <input type='text' {...register2('emp_photo', {required: true})} hidden/>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register2('emp_national_id', {required: true})}*/}
            {/*                                            className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                            id="National"*/}
            {/*                                            required/>*/}
            {/*                                        <label htmlFor="National">National ID</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="text" {...register2('emp_fullname', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="dept"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="dept">Fullname</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="date" {...register2('emp_birth_date', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Birth Date</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="date" {...register2('emp_hire_date', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Hire Date</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register2('emp_marital_status', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="S">Single</option>*/}
            {/*                                            <option value="M">Married</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Marital Status</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register2('emp_gender', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="M">Male</option>*/}
            {/*                                            <option value="F">Female</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Gender</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register2('emp_salaried_flag', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="0">Hourly</option>*/}
            {/*                                            <option value="1">Monthly</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Salaried Flag</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register2('emp_current_flag', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            <option value="1">Active</option>*/}
            {/*                                            <option value="0">InActive</option>*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Current Flag</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            <div className='row mb-4'>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register2('emp_vacation_hours', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Vacation Hours</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <input*/}
            {/*                                            type="number" {...register2('emp_sickleave_hours', {required: true})}*/}
            {/*                                            className="form-control text-dark" id="addEmp"*/}
            {/*                                            placeholder="name@example.com" required/>*/}
            {/*                                        <label htmlFor="addEmp">Sick Leave Hours</label>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                                <div className='col'>*/}
            {/*                                    {*/}
            {/*                                        getJobRoleResult ? (*/}
            {/*                                            <div className="form-floating">*/}
            {/*                                                <select className="form-select"*/}
            {/*                                                        id="addEmp" {...register2('emp_joro_id', {required: true})}*/}
            {/*                                                        aria-label="Floating label select example">*/}
            {/*                                                    {getJobRoleResult.map((value) => {*/}
            {/*                                                        return (*/}
            {/*                                                            <option*/}
            {/*                                                                value={value.joro_id}>{value.joro_name}</option>*/}
            {/*                                                        )*/}
            {/*                                                    })}*/}
            {/*                                                </select>*/}
            {/*                                                <label htmlFor="addEmp">Job Role</label>*/}
            {/*                                            </div>*/}

            {/*                                        ) : (*/}
            {/*                                            <div>*/}
            {/*                                                Job Role tidak ada*/}
            {/*                                            </div>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col-sm-3'>*/}
            {/*                            <div>*/}
            {/*                                <img className='object-fit-contain' style={{width: "100%", height: "330px"}}*/}
            {/*                                     src={imageEdit} alt=''/>*/}
            {/*                            </div>*/}
            {/*                            <div className='mt-3'>*/}
            {/*                                <input type="file" className="form-control text-dark" id="addEmp" {...register2('dummy')}*/}
            {/*                                       onChange={(e) => {*/}
            {/*                                           setImageSaveEdit(e.target.files[0])*/}
            {/*                                           setImageEdit(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")*/}
            {/*                                       }}*/}
            {/*                                       placeholder="name@example.com"/>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6 className="text-start">Salary</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row mb-4'>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input*/}
            {/*                                    type="number" {...register2('ephi_rate_salary', {required: true})}*/}
            {/*                                    className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                    id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">Salary Rate</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <select className="form-select"*/}
            {/*                                        id="addEmp" {...register2('ephi_pay_frequence', {required: true})}*/}
            {/*                                        aria-label="Floating label select example">*/}
            {/*                                    <option value="0">Hourly</option>*/}
            {/*                                    <option value="1">Monthly</option>*/}
            {/*                                </select>*/}
            {/*                                <label htmlFor="addEmp">Frequency</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6 className="text-start">Assignment</h6>*/}
            {/*                    <hr/>*/}
            {/*                    <div className='row mb-4'>*/}
            {/*                        <div className='col'>*/}
            {/*                            {*/}
            {/*                                getDepartmentResult ? (*/}
            {/*                                    <div className="form-floating">*/}
            {/*                                        <select className="form-select"*/}
            {/*                                                id="addEmp" {...register2('edhi_dept_id', {required: true})}*/}
            {/*                                                aria-label="Floating label select example">*/}
            {/*                                            {getDepartmentResult.map((value) => {*/}
            {/*                                                return (*/}
            {/*                                                    <option value={value.dept_id}>{value.dept_name}</option>*/}
            {/*                                                )*/}
            {/*                                            })}*/}
            {/*                                        </select>*/}
            {/*                                        <label htmlFor="addEmp">Department</label>*/}
            {/*                                    </div>*/}

            {/*                                ) : (*/}
            {/*                                    <div>*/}
            {/*                                        Department tidak ada*/}
            {/*                                    </div>*/}
            {/*                                )*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input type="date" {...register2('edhi_start_date', {required: true})}*/}
            {/*                                       className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                       id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">Start Date</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='col'>*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <input type="date" {...register2('edhi_end_date', {required: true})}*/}
            {/*                                       className="form-control text-dark" placeholder='16 digit'*/}
            {/*                                       id="National"*/}
            {/*                                />*/}
            {/*                                <label htmlFor="National">End Date</label>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <h6 className="text-start">Shift</h6>*/}
            {/*                    <hr/>*/}
            {/*                    {*/}
            {/*                        getShiftResult ? (*/}
            {/*                            <div className="form-floating">*/}
            {/*                                <select className="form-select"*/}
            {/*                                        id="addEmp" {...register2('edhi_shift_id', {required: true})}*/}
            {/*                                        aria-label="Floating label select example">*/}
            {/*                                    {getShiftResult.map((value) => {*/}
            {/*                                        return (*/}
            {/*                                            <option value={value.shift_id}>{value.shift_name}</option>*/}
            {/*                                        )*/}
            {/*                                    })}*/}
            {/*                                </select>*/}
            {/*                                <label htmlFor="addEmp">Shift</label>*/}
            {/*                            </div>*/}

            {/*                        ) : (*/}
            {/*                            <div>*/}
            {/*                                Shift tidak ada*/}
            {/*                            </div>*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*                <div className="modal-footer">*/}
            {/*                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close*/}
            {/*                    </button>*/}
            {/*                    <button type="submit" className="btn custom-btn-yellow">Submit*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
