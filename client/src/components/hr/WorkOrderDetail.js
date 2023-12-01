import {BiPlus} from "react-icons/bi";
import {PiDotsThreeOutlineVerticalDuotone} from "react-icons/pi";
import {FaTasks} from "react-icons/fa";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TiTimes} from "react-icons/ti";
import {Link, useParams} from "react-router-dom";

export const WorkOrderDetail = () => {
    const params = useParams()

    return (
        <div>
            <h1>Work Order Detail</h1>
            <nav className='bread-separator' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link className="breadcrumb-item active" aria-current="page" to={"/hr/work-order"}>Work Order</Link>
                    <li className="breadcrumb-item active" aria-current="page">Work Order Detail</li>
                </ol>
            </nav>
            <div className='row mb-4 justify-content-between'>
                <div className='col-sm-2 align-content-center mt-2'>
                    <button type="button" className="btn custom-btn-yellow" data-bs-toggle="modal"
                            data-bs-target="#addWorkOrder">
                        <BiPlus size='26'/> Add Work Order Detail
                    </button>
                </div>
                {/*<div className='col-sm-8'>*/}
                {/*    <div className='row'>*/}
                {/*        <div className='col'>*/}
                {/*            <div className="form-floating">*/}
                {/*                <input type="date"*/}
                {/*                       onChange={(e) => {*/}
                {/*                           console.log(e.target.value)*/}
                {/*                       }}*/}
                {/*                       className="form-control text-dark form-control-sm" id="searchDept"*/}
                {/*                       placeholder="name@example.com" required/>*/}
                {/*                <label htmlFor="searchDept">Start Date</label>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className='col'>*/}
                {/*            <div className="form-floating">*/}
                {/*                <input type="date"*/}
                {/*                       className="form-control text-dark form-control-sm" id="searchDept"*/}
                {/*                       placeholder="name@example.com" required/>*/}
                {/*                <label htmlFor="searchDept">End Date</label>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className='col'>*/}
                {/*            <div className="form-floating">*/}
                {/*                <select className="form-select"*/}
                {/*                        onChange={(e) => {*/}
                {/*                            console.log("Status", e.target.value)*/}
                {/*                        }}*/}
                {/*                        aria-label="Floating label select example">*/}
                {/*                    <option value="">Default</option>*/}
                {/*                    <option value="OPEN">Open</option>*/}
                {/*                    <option value="CLOSED">Closed</option>*/}
                {/*                    <option value="CANCELLED">Cancelled</option>*/}
                {/*                </select>*/}
                {/*                <label htmlFor="addEmp">Status Work Order</label>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <table className="table table-striped table-hover align-middle">
                <caption>Jumlah data :</caption>
                <thead>
                <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Status</th>
                    <th scope="col">Assign To</th>
                    <th scope="col" className='text-end'>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Cleaning Room</td>
                    <td>Room 201</td>
                    <td>Inprogress</td>
                    <td>Sulthan</td>
                    <td>...</td>
                </tr>
                </tbody>
            </table>
            {/*<div className="modal fade" id="addWorkOrder" tabIndex="-1" aria-labelledby="exampleModalLabel"*/}
            {/*     aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Add Work Order</h5>*/}
            {/*                <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>*/}
            {/*            </div>*/}
            {/*            <form onSubmit={handleSubmit(postWorkOrder)}>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <div className="form-floating m-3">*/}
            {/*                        <input type="date" {...register('woro_start_date', {required: true})}*/}
            {/*                               className="form-control text-dark" id="addDept"*/}
            {/*                               placeholder="name@example.com" required/>*/}
            {/*                        <label htmlFor="addDept">Start Date</label>*/}
            {/*                    </div>*/}
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
            {/*<div className="modal fade" id="editWorkOrder" tabIndex="-1" aria-labelledby="exampleModalLabel"*/}
            {/*     aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Add Work Order</h5>*/}
            {/*                <TiTimes data-bs-dismiss="modal" aria-label="Close" color='#EBAB2D' size={26}/>*/}
            {/*            </div>*/}
            {/*            <form onSubmit={handleSubmit2(putWorkOrder)}>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <div className="form-floating m-3">*/}
            {/*                        <input type="date" {...register2('woro_start_date', {required: true})}*/}
            {/*                               className="form-control text-dark" id="addDept"*/}
            {/*                               placeholder="name@example.com" required/>*/}
            {/*                        <label htmlFor="addDept">Start Date</label>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-floating m-3">*/}
            {/*                        <select className="form-select"*/}
            {/*                                {...register2('woro_status', {required: true})}*/}
            {/*                                aria-label="Floating label select example">*/}
            {/*                            <option value="OPEN">Open</option>*/}
            {/*                            <option value="CLOSED">Closed</option>*/}
            {/*                            <option value="CANCELLED">Cancelled</option>*/}
            {/*                        </select>*/}
            {/*                        <label htmlFor="addEmp">Status Work Order</label>*/}
            {/*                    </div>*/}
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
