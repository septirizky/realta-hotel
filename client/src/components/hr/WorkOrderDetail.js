import {BiPlus} from "react-icons/bi";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    DeleteWorkOrder, DeleteWorkOrderDetail,
    GetAllFacilities,
    GetEmployee,
    GetServiceTask,
    GetWorkOrderDetail,
    PostWorkOrderDetail, PutWorkOrderDetail
} from "../../actions/hrAction";
import {useForm} from "react-hook-form";
import {TiTimes} from "react-icons/ti";
import Swal from "sweetalert2";

export const WorkOrderDetail = () => {
    // const location = useLocation()
    const [woroDate, setWoroDate] = useState('')
    const [woroName, setWoroName] = useState('')
    const [isPost, setIsPost] = useState(false)
    const [isPut, setIsPut] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const params = useParams()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors}
    } = useForm()
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setValue: setValue2,
        formState: {errors: errors2}
    } = useForm()
    const dispatch = useDispatch();
    const {
        deleteWorkOrderDetailResult,
        postWorkOrderDetailResult,
        putWorkOrderDetailResult,
        getServiceTaskResult,
        getFacilitiesResult,
        getEmployeeResult,
        getWorkOrderDetailResult,
        getWorkOrderDetailLoading,
        getWorkOrderDetailError,
    } = useSelector((state) => state.HrReducer)
    const addWorkOrderDetail = (data) => {
        const dataJson = {
            wode_task_name: data.service_task.split(',')[1],
            wode_status: "INPROGRESS",
            wode_start_date: data.wode_start_date,
            wode_end_date: data.wode_end_date,
            wode_notes: data.notes,
            wode_emp_id: data.emp_id,
            wode_seta_id: data.service_task.split(',')[0],
            wode_faci_id: data.faci_id,
            wode_woro_id: params.id
        }
        // console.log(dataJson)
        setIsPost(true)
        dispatch(PostWorkOrderDetail(dataJson))
    }
    const editWorkOrderDetail = (data) => {
        const dataJson = {
            wode_task_name: data.service_task.split(',')[1],
            wode_status: data.wode_status,
            wode_start_date: data.wode_start_date,
            wode_end_date: data.wode_end_date,
            wode_notes: data.notes,
            wode_emp_id: data.emp_id,
            wode_seta_id: data.service_task.split(',')[0],
            wode_faci_id: data.faci_id,
        }
        // console.log(dataJson)
        setIsPut(true)
        dispatch(PutWorkOrderDetail(dataJson, data.wode_id))
    }
    const deleteWorkOrderDetail = (id, service) => {
        Swal.fire({
            title: `Delete Work Order Detail \n ${service}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                setIsDelete(true)
                dispatch(DeleteWorkOrderDetail(id))
            }
        })
    }
    useEffect(() => {
        if (isPost){
            let timerInterval
            Swal.fire({
                title: 'Add Work Order Detail success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isPut){
            let timerInterval
            Swal.fire({
                title: 'Edit Work Order Detail success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelete){
            let timerInterval
            Swal.fire({
                title: 'Delete Work Order Detail success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        reset()
        dispatch(GetServiceTask())
        dispatch(GetEmployee())
        dispatch(GetAllFacilities())
        dispatch(GetWorkOrderDetail(params.id))
        setWoroDate(params.date)
        setWoroName(params.name)
        setIsPost(false)
        setIsPut(false)
        setIsDelete(false)
    }, [postWorkOrderDetailResult, putWorkOrderDetailResult, deleteWorkOrderDetailResult]);
    return (
        <div>
            <h1>Work Order Detail</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link className="breadcrumb-item" aria-current="page" to={"/hr/work-order"}>Work Order</Link>
                    <li className="breadcrumb-item active" aria-current="page">Work Order Detail</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="date" value={woroDate} disabled
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Created At</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="text" value={woroName} disabled
                                       className="form-control text-dark form-control-sm" id="searchDept"
                                       placeholder="name@example.com" required/>
                                <label htmlFor="searchDept">Created By</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4 d-flex justify-content-end align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addWorkOrder">
                        <BiPlus size='26'/> Add Work Order Detail
                    </button>
                </div>
            </div>
            <table className="table table-striped table-hover align-middle">
                <caption>Jumlah data :</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Status</th>
                    <th scope="col">Assign To</th>
                    <th scope="col" className='text-end'>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getWorkOrderDetailResult ? (
                        getWorkOrderDetailResult.length !== 0 ? (
                            getWorkOrderDetailResult.map((value, index) => {
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{value.wode_task_name}</td>
                                        <td>{value.wode_notes}</td>
                                        <td>{value.wode_status === "COMPLETED" ? (
                                            <span className="badge bg-success">Completed</span>) : value.wode_status === "INPROGRESS" ? (
                                            <span className="badge bg-warning">InProgress</span>) : (
                                            <span className="badge bg-danger">Cancelled</span>)}</td>
                                        <td>{value.wode_emp.emp_fullname}</td>
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
                                                               setValue2("service_task", value.wode_seta_id+","+value.wode_task_name)
                                                               setValue2("wode_status", value.wode_status)
                                                               setValue2("emp_id", value.wode_emp_id)
                                                               setValue2("faci_id", value.wode_faci_id)
                                                               setValue2("wode_start_date", value.wode_start_date)
                                                               setValue2("wode_end_date", value.wode_end_date)
                                                               setValue2("notes", value.wode_notes)
                                                               setValue2("wode_id", value.wode_id)
                                                               // console.log(value)
                                                           }}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editWorkOrder"><FiEdit
                                                            size='16'/> Edit</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow text-danger"
                                                           onClick={(e) => {
                                                               deleteWorkOrderDetail(
                                                                   value.wode_id,
                                                                   value.wode_task_name
                                                               )
                                                           }}
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
                    ) : getWorkOrderDetailLoading ? (
                        <tr>
                            <td colSpan='7' className='text-center'>Loading....</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='6'>{getWorkOrderDetailError}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <div className="modal fade" id="addWorkOrder" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Work Order</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <form onSubmit={handleSubmit(addWorkOrderDetail)}>
                            <div className="modal-body">
                                {
                                    getServiceTaskResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register('service_task', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Service Task</option>
                                                {getServiceTaskResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.seta_id+","+value.seta_name}>{value.seta_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Service Task</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Service Task tidak ada
                                        </div>
                                    )
                                }
                                {
                                    getEmployeeResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register('emp_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Employee</option>
                                                {getEmployeeResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.emp_id}>{value.emp_fullname}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Employee</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Employee tidak ada
                                        </div>
                                    )
                                }
                                {
                                    getFacilitiesResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register('faci_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Facility</option>
                                                {getFacilitiesResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.faci_id}>{value.faci_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Facility</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Employee tidak ada
                                        </div>
                                    )
                                }
                                <div className="form-floating mb-3">
                                    <input type="date" {...register('wode_start_date', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="searchDept">Start Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" {...register('wode_end_date', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="searchDept">End Date</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" {...register('notes', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="" required/>
                                    <label htmlFor="searchDept">Notes</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                        onClick={(e) => reset()}>Close
                                </button>
                                <button type="submit" className="btn custom-btn-yellow">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editWorkOrder" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Work Order</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <form onSubmit={handleSubmit2(editWorkOrderDetail)}>
                            <div className="modal-body">
                                {
                                    getServiceTaskResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register2('service_task', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Service Task</option>
                                                {getServiceTaskResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.seta_id+","+value.seta_name}>{value.seta_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Service Task</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Service Task tidak ada
                                        </div>
                                    )
                                }
                                {
                                    getEmployeeResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register2('emp_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Employee</option>
                                                {getEmployeeResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.emp_id}>{value.emp_fullname}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Employee</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Employee tidak ada
                                        </div>
                                    )
                                }
                                {
                                    getFacilitiesResult ? (
                                        <div className="form-floating mb-3">
                                            <select className="form-select"
                                                    id="addEmp" {...register2('faci_id', {required: true})}
                                                    aria-label="Floating label select example">
                                                <option value="" selected>Pilih Facility</option>
                                                {getFacilitiesResult.map((value) => {
                                                    return (
                                                        <option
                                                            value={value.faci_id}>{value.faci_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="addEmp">Facility</label>
                                        </div>

                                    ) : (
                                        <div>
                                            Employee tidak ada
                                        </div>
                                    )
                                }
                                <div className="form-floating mb-3">
                                    <input type="date" {...register2('wode_start_date', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="searchDept">Start Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" {...register2('wode_end_date', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="searchDept">End Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" {...register2('notes', {required: true})}
                                           className="form-control text-dark form-control-sm" id="searchDept"
                                           placeholder="" required/>
                                    <label htmlFor="searchDept">Notes</label>
                                </div>
                                <div className="form-floating">
                                    <select className="form-select"
                                            {...register2('wode_status', {required: true})}
                                            aria-label="Floating label select example">
                                        <option value="INPROGRESS">InProgress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                    <label htmlFor="addEmp">Status</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal"
                                        onClick={(e) => reset()}>Close
                                </button>
                                <button type="submit" className="btn custom-btn-yellow">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
