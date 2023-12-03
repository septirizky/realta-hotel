import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DeleteWorkOrder, GetWorkOrder, PostWorkOrder, PutWorkOrder} from "../../actions/hrAction";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TiTimes} from "react-icons/ti";
import Swal from "sweetalert2";
import {useForm} from "react-hook-form";
import {FaTasks} from "react-icons/fa";
import {Link} from "react-router-dom";

export const WorkOrder = () => {
    const [searchForm, setSearchForm] = useState({
        startDate: '',
        endDate: '',
        workOrderStatus: ''
    })
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
    const [isPost, setIsPost] = useState(false)
    const [isPut, setIsPut] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const {
        postWorkOrderResult,
        putWorkOrderResult,
        deleteWorkOrderResult,
        getWorkOrderResult,
        getWorkOrderLoading,
        getWorkOrderError,
    } = useSelector((state) => state.HrReducer)
    const dispatch = useDispatch()
    const postWorkOrder = (data) => {
        setIsPost(true)
        // console.log(data)
        dispatch(PostWorkOrder({woro_start_date: data.woro_start_date, woro_status: 'OPEN', woro_user_id: 1}))
    }
    const putWorkOrder = (data) => {
        setIsPut(true)
        dispatch(PutWorkOrder({woro_start_date: data.woro_start_date, woro_status: data.woro_status}, data.woro_id))
    }
    const deleteWorkOrder = (id, tanggal) => {
        Swal.fire({
            title: `Delete Work Order \n ${tanggal}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                setIsDelete(true)
                dispatch(DeleteWorkOrder(id))
            }
        })
    }
    useEffect(() => {
        if (isPost) {
            let timerInterval
            Swal.fire({
                title: 'Add Work Order success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isPut) {
            let timerInterval
            Swal.fire({
                title: 'Update Work Order success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelete) {
            let timerInterval
            Swal.fire({
                title: 'Delete Work Order success',
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
        reset2()
        setIsPost(false)
        setIsPut(false)
        setIsDelete(false)
        dispatch(GetWorkOrder(searchForm))
    }, [searchForm, postWorkOrderResult, putWorkOrderResult, deleteWorkOrderResult]);
    return (
        <div>
            <h1>Work Order</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Work Order</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-2 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addWorkOrder">
                        <BiPlus size='26'/> Add Work Order
                    </button>
                </div>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating">
                                <input type="date"
                                       onChange={(e) => {
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
                                       onChange={(e) => setSearchForm({...searchForm, endDate: e.target.value})}
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
                <caption>Jumlah data : {getWorkOrderResult ? getWorkOrderResult.length : ''}</caption>
                <thead>
                <tr>
                    <th>#</th>
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
                                        <td>{index+1}</td>
                                        <td scope="row">{(workOrderDate.getDate().toString().split('').length === 1 ? '0' + workOrderDate.getDate() : workOrderDate.getDate()) + " " + months[workOrderDate.getMonth()] + " " + workOrderDate.getFullYear()}</td>
                                        <td>{value.woro_status === "OPEN"? (
                                            <span className="badge bg-success">OPEN</span>) : value.woro_status === "CLOSED" ? (
                                            <span className="badge bg-danger">CLOSED</span>):(<span className="badge bg-black">CANCELLED</span>)}</td>
                                        <td>{value.woro_user.user_full_name}</td>
                                        <td className='text-end pe-4'>
                                            <div className="dropstart">
                                                <button className='btn btn-light' data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                                </button>
                                                <ul className="dropdown-menu">
                                                        <Link to={"/hr/work-order/"+value.woro_id+"/"+value.woro_user.user_full_name+"/"+value.woro_start_date} className="dropdown-item custom-hover-yellow"
                                                              href='#'><FaTasks size='16'/> Work Order Detail</Link>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow" href='#'
                                                           onClick={() => {
                                                               setValue2("woro_start_date", value.woro_start_date)
                                                               setValue2("woro_status", value.woro_status)
                                                               setValue2("woro_id", value.woro_id)
                                                               // console.log(value)
                                                           }}
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#editWorkOrder"><FiEdit
                                                            size='16'/> Edit</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item custom-hover-yellow text-danger"
                                                           onClick={(e)=>{
                                                               deleteWorkOrder(
                                                                   value.woro_id,
                                                                   (workOrderDate.getDate().toString().split('').length === 1 ? '0' + workOrderDate.getDate() : workOrderDate.getDate()) + " " + months[workOrderDate.getMonth()] + " " + workOrderDate.getFullYear()
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
            <div className="modal fade" id="addWorkOrder" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Work Order</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <form onSubmit={handleSubmit(postWorkOrder)}>
                            <div className="modal-body">
                                <div className="form-floating m-3">
                                    <input type="date" {...register('woro_start_date', {required: true})}
                                           className="form-control text-dark" id="addDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="addDept">Start Date</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close
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
                            <h5 className="modal-title" id="exampleModalLabel">Add Work Order</h5>
                            <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                        </div>
                        <form onSubmit={handleSubmit2(putWorkOrder)}>
                            <div className="modal-body">
                                <div className="form-floating m-3">
                                    <input type="date" {...register2('woro_start_date', {required: true})}
                                           className="form-control text-dark" id="addDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="addDept">Start Date</label>
                                </div>
                                <div className="form-floating m-3">
                                    <select className="form-select"
                                            {...register2('woro_status', {required: true})}
                                            aria-label="Floating label select example">
                                        <option value="OPEN">Open</option>
                                        <option value="CLOSED">Closed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                    <label htmlFor="addEmp">Status Work Order</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close
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
