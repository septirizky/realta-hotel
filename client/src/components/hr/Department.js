import {BiPlus} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";
import {useEffect, useState} from "react";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FiEdit, FiTrash} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {DeleteDepartment, GetDepartment, PostDepartment, UpdateDepartment} from "../../actions/hrAction";
import Swal from "sweetalert2";

export const Department = () => {
    const [formDept, setFormDept] = useState('')
    const [formEditDept, setFormEditDept] = useState('')
    const [isAddDept, setIsAddDept] = useState(false)
    const [isDelDept, setIsDelDept] = useState(false)
    const [isPutDept, setIsPutDept] = useState(false)
    const dispatch = useDispatch()
    const {
        getDepartmentResult,
        postDepartmentResult,
        updateDepartmentResult,
        deleteDepartmentResult,
        getDepartmentLoading,
        getDepartmentError
    } = useSelector((state) => state.HrReducer)
    const postDept = () => {
        setIsAddDept(true)
        dispatch(PostDepartment({dept_name: formDept}))
    }
    const updateDept = (id) => {
        setIsPutDept(true)
        dispatch(UpdateDepartment(id, {dept_name: formEditDept}))
    }
    const deleteDept = (id, event, name) => {
        Swal.fire({
            title: `Delete Department ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Sure',
            confirmButtonColor: '#EBAB2D'
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelDept(true)
                dispatch(DeleteDepartment(id))
            }
        })
    }
    useEffect(() => {
        if (isAddDept) {
            let timerInterval
            Swal.fire({
                title: 'Add Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelDept) {
            let timerInterval
            Swal.fire({
                title: 'Delete Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isPutDept) {
            let timerInterval
            Swal.fire({
                title: 'Update Department success',
                html: 'Auto Close',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        dispatch(GetDepartment())
        setFormDept('')
        setIsAddDept(false)
        setIsDelDept(false)
        setIsPutDept(false)
    }, [postDepartmentResult, deleteDepartmentResult, updateDepartmentResult]);
    return (
        <div>
            <h1 className='mb-4'>Department</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Department</li>
                </ol>
            </nav>
            <table className="table table-striped table-hover align-middle">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Department</th>
                    <th scope="col" className='text-end'>
                        <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                                data-bs-target="#addModal">
                            <BiPlus size='26'/> Add Department
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    getDepartmentResult ? (
                        getDepartmentResult.map((value, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.dept_name}</td>
                                    <td className='text-end pe-4'>
                                        <div className="dropstart">
                                            <button className='btn btn-light' data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                <PiDotsThreeOutlineVerticalDuotone size='24'/>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item custom-hover-yellow" href='#'
                                                       onClick={() => setFormEditDept(value.dept_name)}
                                                       data-bs-toggle="modal"
                                                       data-bs-target={"#editModal" + value.dept_id}><FiEdit
                                                    size='16'/> Edit</a></li>
                                                <li><a className="dropdown-item custom-hover-yellow text-danger"
                                                       onClick={(e) => deleteDept(value.dept_id, e, value.dept_name)}
                                                       href='#'><FiTrash size='16'/> Delete</a></li>
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
                                                                       onChange={(e) => setFormEditDept(e.target.value)}
                                                                       value={formEditDept}
                                                                       className="form-control text-dark" id="addDept"
                                                                       placeholder="name@example.com" required/>
                                                                <label htmlFor="addDept">Department</label>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-dark"
                                                                    data-bs-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn custom-btn-yellow"
                                                                    onClick={() => updateDept(value.dept_id)}
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
                    ) : getDepartmentLoading ? (
                        <tr>
                            <td colSpan='3'>Loading...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan='3'>{getDepartmentError}</td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Department</h5>
                                <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>
                            </div>
                            <div className="modal-body">
                                <div className="form-floating m-3">
                                    <input type="text" onChange={(e) => setFormDept(e.target.value)} value={formDept}
                                           className="form-control text-dark" id="addDept"
                                           placeholder="name@example.com" required/>
                                    <label htmlFor="addDept">Department</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn custom-btn-yellow" onClick={() => postDept()}
                                        data-bs-dismiss="modal">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
