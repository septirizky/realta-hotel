import React, { useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AddBank, getBank } from '../../../actions/paymentAction';

import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


const Bank = (props) => {
    const dispatch = useDispatch();
    const {
        getBankResult, 
        getBankLoading, 
        getBankError,

        addBankResult,
        addBankLoading,
        addBankError,
    } = useSelector((state)=>state.paymentReducers);

    // const handleReset = () => {
    //     formRef.current.reset();
    //     document.getElementById('addbank-modal').style.display='none'
    //   };
    // const submitBank = (data)=>{
    //     setisAddBank(true)
    //     dispatch(AddBank(data))
    // }

    const [showModalAddBank, setshowModalAddBank] = useState(false);

    const showAddBank = ()=>{
        setshowModalAddBank(true);
    }
    useEffect(() => {
        // if(isAddBank){
        //     if(addBankResult){
        //     Swal.fire({
        //         title: addBankResult,
        //         text: 'Bank Berhasil Ditambah!',
        //         icon: 'success'
        //     }).then(()=>{
        //         handleReset();
                
        //         document.getElementById("addbank-modal").classList.remove("show");
        //         document.querySelectorAll(".modal-backdrop")
        //         .forEach(el => el.classList.remove("modal-backdrop"));
        //     })
        //     }
        //     else if(addBankError){
        //         Swal.fire({
        //             title: addBankError,
        //             text: 'Gagal Menginput!',
        //             icon: 'error'
        //         })
        //     }
        // }
        
        dispatch(getBank())
    }, [addBankResult,addBankError]);

    console.log(showModalAddBank)
    return (
        <div>
            <div className='row'>
                <div className='col-12 col-lg-12 col-sm-12 col-md-12 '>

                <div className="row align-items-center mb-2">
                    <div className="col-4 col-sm-2 ms-lg-3">
                        <label className="col-form-label">Search Bank</label>
                    </div>
                    <div className="col-8 col-lg-4 ">
                        <input type="text" id="inputSearch" className="form-control"/>
                    </div>
                    </div>
                <table className="table w-100">
                    <thead>
                        <tr>

                        <th scope="col">No</th>
                        <th scope="col">Bank Code</th>
                        <th scope="col">Bank Name</th>
                        <th scope="col">
                            <button type='button' className='btn' onClick={showAddBank}>
                                <FaPlus className='me-2'/>ADD
                            </button>
                        </th>

                            {/* <div className="modal fade" id="addbank-modal" tabIndex="-1" aria-labelledby="modal-addbanklabel" aria-hidden="true">
                                <div className="modal-dialog">
                                <form ref={formRef} onSubmit={handleSubmit(submitBank)}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Bank</h1>
                                            <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-4">
                                                <label  className="col-form-label">Bank Code</label>
                                            </div>
                                            <div className="col-6">                                               
                                                <input type="text" {...register('bank_code')} id="bankcode" className="form-control" required/>
                                            </div>

                                            <div className="col-4">
                                                <label className="col-form-label">Bank Name</label>
                                            </div>
                                            <div className="col-6">
                                                <input {...register('bank_name')} type="text" id="bankcode" className="form-control" required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">                 
                                                <button type="reset" className="btn btn-secondary me-2" data-bs-dismiss='modal' >Close</button>
                                                <button type="submit" className="btn btn-primary" >Save changes</button>
                                        </div>
                                    </div>
                                </form>

                                </div>
                            </div>    */}
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getBankResult.length>0 ?(
                                getBankResult.map((bank,index)=>{

                                    return(
                                    <tr key={bank.bank_entity_id}>
                                        <th scope="row">{index+1}</th>
                                            <td>{bank.bank_code}</td>
                                            <td>{bank.bank_name}</td>
                                            <td><button className='btn ms-3 '><MdEdit/></button></td>
                                    </tr>
                                    )
                                }
                                )
                            )
                            :getBankLoading?(
                                <tr>Loading...</tr>
                            ):(
                                <tr>{getBankError? getBankError : "data Kosong"}</tr>
                            )

                        }
                    </tbody>
                    </table>                    

                </div>
            </div>
        
            <AddBank
                showModalBank = {showModalAddBank}
            />

        </div>
        
    );
}

export default Bank;
