import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../../actions/paymentAction';
import ModalAddAccounts from './modals/modalAddAccounts';
import ModalEditAccounts from './modals/modalEditAccounts';

const Accounts = () => {
    const dispatch = useDispatch();
    const { register, resetField, handleSubmit,reset} = useForm();

    const [showModalAddAccount, setshowModalAddAccount] = useState(false);
    const [showModalEditAccount, setshowModalEditAccount] = useState(false);

    const [UserAccount, setUserAccount] = useState({
        usac_id : '',
        account_number : '',
        saldo : '',
        type : '',
        entity_id : '',
        expmonth : '',
        expyear : '',
    });

    const showAddAccount=()=>{
        setshowModalAddAccount(true)
    }
    const showEditAccount =(usac_id,account_number,entity_id,saldo,type,usac_expmonth,usac_expyear)=>{
        // console.log(account_number)
        setUserAccount({
            usac_id:usac_id,
            account_number:account_number,
            saldo:saldo,
            type:type,
            entity_id:entity_id,
            expmonth:usac_expmonth,
            expyear:usac_expyear
        })
        
        setshowModalEditAccount(true)
        // console.log(UserAccount)
    }

    const closeAddAccount = ()=>{
        setshowModalAddAccount(false)
        reset();
    }
    
    const closeEditAccount =()=>{
        setshowModalEditAccount(false)
        reset();
    }

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
                            <button type='button' className='btn' onClick={showAddAccount}>
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
                                            <td><button className='btn ms-3' onClick={()=>{
                                               
                                                showEditAccount(
                                                    usac.usac_id,
                                                    usac.usac_account_number,
                                                    usac.usac_entity_id,
                                                    usac.usac_saldo,
                                                    usac.usac_type,
                                                    usac.usac_expmonth,
                                                    usac.usac_expyear,
                                                )
                                                // console.log(usac.usac_expmonth)
                                            }}><MdEdit/></button></td>
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
            
            <ModalAddAccounts
                showModalAccounts = {showModalAddAccount}
                handleCloseModalAddAccount = {closeAddAccount}
                register = {register}
                handleSubmit = {handleSubmit}
                resetField = {resetField}
                reset = {reset}
            />

            <ModalEditAccounts
                showModalAccounts = {showModalEditAccount}
                handleCloseEditAccount = {closeEditAccount}
                register={register}
                handleSubmit={handleSubmit}
                reset={reset}
                UserAccount = {UserAccount}
                setUserAccount = {setUserAccount}
            />

        </>
        
    );
}

export default Accounts;
