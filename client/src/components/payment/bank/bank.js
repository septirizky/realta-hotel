import React, { useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getBank } from '../../../actions/paymentAction';
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { SlMagnifier  } from 'react-icons/sl'
import ModalAddBank from './modals/modalAddBank.js';
import {useForm} from 'react-hook-form'
import ModalEditBank from './modals/modalEditBank.js';

const Bank = () => {
    const dispatch = useDispatch();
    const ref = useRef();
    const { register, resetField, handleSubmit } = useForm();
    const {
        getBankResult, 
        getBankLoading, 
        getBankError       
    } = useSelector((state)=>state.paymentReducers);

    
    const [showModalAddBank, setshowModalAddBank] = useState(false);
    const [showModalEditBank, setshowModalEditBank] = useState(false);
    const [isSearch, setisSearch] = useState(false);
    const [Keyword, setKeyword] = useState('');
    
    const [Bank, setBank] = useState({
        bank_entity_id : '',
        bank_code : '',
        bank_name : '',
    });

    const showAddBank = ()=>{
        setshowModalAddBank(true);
    }

    const closeAddBank = ()=>{
        setshowModalAddBank(false);
        resetField('bank_code');
        resetField('bank_name');
    }

    const showEditBank = (bank_entity_id,bank_code, bank_name)=>{
        setBank({
            bank_entity_id: bank_entity_id,
            bank_code: bank_code,
            bank_name: bank_name
        })
        setshowModalEditBank(true);
    }
    const closeEditBank = ()=>{
        setshowModalEditBank(false);
        resetField('bank_code');
        resetField('bank_name');
    }

    useEffect(() => {
        if (isSearch) {
            clearTimeout(ref.current)
            ref.current = setTimeout(() => {
                dispatch(getBank({bank_name:Keyword}))
            },1000)
            
        }else{
            dispatch(getBank({bank_name:Keyword}))
        }
        
    }, [dispatch,Keyword]);

    return (
        <>
            <div className='row'>
                <div className='col-12 col-lg-12 col-sm-12 col-md-12 '>

                <div className="row align-items-center mb-2">
                    <div className="col-4 col-sm-2 ms-lg-3">
                        <label className="col-form-label">Search Bank</label>
                    </div>
                    <div className="col-8 col-lg-4 ">
                    <div className="input-group">
                        <span className="input-group-text bg-white " id="addon-wrapping"><SlMagnifier/></span>
                        <input type="text" className="form-control border-start-0" placeholder="Search By Bank Name" aria-describedby="addon-wrapping"
                            onChange={(e)=>{
                                setKeyword(e.target.value)
                                setisSearch(true)    
                            }
                            }
                        />
                    </div>

                        
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

                        </tr>
                    </thead>
                    <tbody>
                        {
                            getBankResult ?(
                                getBankResult.map((bank,index)=>{
                                    return(
                                    <tr key={bank.bank_entity_id}>
                                        <th scope="row">{index+1}</th>
                                            <td>{bank.bank_code}</td>
                                            <td>{bank.bank_name}</td>
                                            <td><button className='btn ms-3' onClick={()=>{
                                                showEditBank(
                                                    bank.bank_entity_id,
                                                    bank.bank_code,
                                                    bank.bank_name
                                                )
                                            }}><MdEdit/></button></td>
                                    </tr>
                                    )
                                }
                                )
                            )
                            :getBankLoading?(
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            ):(
                                <tr>{getBankError ? getBankError : "data Kosong"}</tr>
                            )

                        }
                    </tbody>
                    </table> 


                </div>
            </div>

            <ModalAddBank
                showModalBank = {showModalAddBank}
                handleCloseAddBank = {closeAddBank}
                register = {register}
                handleSubmit = {handleSubmit}
                resetField = {resetField}
                Keyword = {Keyword}
            />

            <ModalEditBank
                showModalBank = {showModalEditBank}
                handleCloseEditBank = {closeEditBank}
                handleSubmit = {handleSubmit}
                register = {register}
                Bank = {Bank}
                setBank = {setBank}
                resetField={resetField}
                Keyword = {Keyword}
            />
        </>
        
    );
}

export default Bank;
