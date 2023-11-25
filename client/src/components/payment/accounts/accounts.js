import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../../actions/paymentAction';

const Accounts = () => {
    const dispatch = useDispatch();

    const { register, resetField, handleSubmit } = useForm();

    const userId = 1;

    const {
        getUserAccountResult,
        getUserAccountLoading,
        getUserAccountError,

    } = useSelector((state)=>state.paymentReducers);


    useEffect(() => {
        dispatch(getUserAccount(userId))
    }, [dispatch]);
    
    return (
        <>
            <div className='row'>
                <div className='col-12 col-lg-12 col-sm-12 col-md-12 '>


                <table className="table w-100">
                    <thead>
                        <tr>

                        <th scope="col">No</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Desc</th>
                        <th scope="col">Saldo</th>
                        <th scope="col">Type</th>
                        <th scope="col">
                            <button type='button' className='btn'>
                                <FaPlus className='me-2'/>ADD
                            </button>
                        </th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                            getUserAccountResult ?(
                                getUserAccountResult.map((usac,index)=>{
                                    return(
                                        <tr>
                                        <th scope="row">{index+1}</th>
                                            <td>{usac.usac_account_number}</td>
                                            <td>{usac.usac_entity.bank ? usac.usac_entity.bank.bank_name :usac.usac_entity.payment_gateway.paga_name }</td>
                                            <td>{usac.usac_saldo}</td>
                                            <td>{usac.usac_type}</td>
                                            <td><button className='btn ms-3'><MdEdit/></button></td>
                                    </tr>
                                    )
                                }
                                )
                            )
                            :getUserAccountLoading?(
                                <tr>Loading...</tr>
                            ):(
                                <tr>{getUserAccountError ? getUserAccountError : "data Kosong"}</tr>
                            )

                        }
                           
                                   
                    </tbody>
                    </table> 


                </div>
            </div>


        </>
        
    );
}

export default Accounts;
