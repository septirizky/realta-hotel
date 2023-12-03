import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentGateaway } from '../../../actions/paymentAction';
import { useForm } from 'react-hook-form';
import ModalAddPaga from './modals/modalAddPaga';
import ModalEditPaga from './modals/modalEditPaga';
import {SlMagnifier} from 'react-icons/sl' 


const PaymentGateaway = () => {

    const dispatch = useDispatch();
    const { register, resetField, handleSubmit } = useForm();
    const ref = useRef();
    
    const{
        getPaymentGateawayResult,
        getPaymentGateawayError,
        getPaymentGateawayLoading,
    } = useSelector((state)=>state.paymentReducers)

    const [Paga, setPaga] = useState({
        paga_entity_id:'',
        paga_code:'',
        paga_name:''
    });
    const [showModalAddPaga, setshowModalAddPaga] = useState(false);
    const [showModalEditPaga, setshowModalEditPaga] = useState(false);
    const [Keyword, setKeyword] = useState('');
    const [isSearch, setisSearch] = useState(false);


    const showAddPaga=()=>{
        setshowModalAddPaga(true)
    }
    const closeAddPaga=()=>{
    setshowModalAddPaga(false)
        resetField('paga_code');
        resetField('paga_name');
    }

    const showEditPaga = (paga_entity_id,paga_code,paga_name)=>{
        setPaga({
            paga_entity_id: paga_entity_id,
            paga_code:paga_code,
            paga_name:paga_name
        })
        setshowModalEditPaga(true)
    }

    const closeEditPaga = ()=>{
        setshowModalEditPaga(false);
        resetField('paga_code');
        resetField('paga_name');
    }

    useEffect(() => {
        if (isSearch) {
            clearTimeout(ref.current)
            ref.current = setTimeout(() => {
                dispatch(getPaymentGateaway({paga_code:Keyword}))
            },1000)
            
        }else{
            dispatch(getPaymentGateaway({paga_code:Keyword}))
        }
    },[dispatch,Keyword]);

    return (
        <div>
            <div className='row'>
                <div className='col-12 col-lg-12 col-sm-12 col-md-12 '>

                <h1 className='mb-4 ms-3'>Payment Gateaway</h1>

                <div className="row align-items-center mb-2">
                    <div className="col-4 col-sm-2 ms-lg-3">
                        <label className="col-form-label">Search Bank</label>
                    </div>
                    <div className="col-8 col-lg-4 ">
                    <div className="input-group">
                        <span className="input-group-text bg-white " id="addon-wrapping"><SlMagnifier/></span>
                        <input type="text" className="form-control border-start-0" placeholder="Search By Code" aria-describedby="addon-wrapping"
                            onChange={(e)=>{
                                setKeyword(e.target.value)
                                setisSearch(true)    
                            }
                            }
                        />
                    </div>
                    </div>
                    </div>
                <table className="table table-striped w-100">
                    <thead>
                        <tr>

                        <th scope="col">No</th>
                        <th scope="col">Code</th>
                        <th scope="col">Fintech</th>
                        <th scope="col">
                            <button type='button' className='btn' onClick={showAddPaga}>
                                <FaPlus className='me-2'/>ADD
                            </button>
                        </th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                            getPaymentGateawayResult ?(
                                getPaymentGateawayResult.map((paga,index)=>{
                                    return(
                                    <tr key={paga.paga_entity_id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{paga.paga_code}</td>
                                            <td>{paga.paga_name}</td>
                                            <td><button className='btn ms-3' onClick={()=>{
                                                showEditPaga(
                                                    paga.paga_entity_id,
                                                    paga.paga_code,
                                                    paga.paga_name
                                                )
                                            }}><MdEdit/></button></td>
                                    </tr>
                                    )
                                }
                                )
                            )
                            :getPaymentGateawayLoading?(
                                <tr>
                                    <td colSpan={4} className='text-center fs-3'>Loading...</td>
                                </tr>
                            ):(
                                <tr>
                                    <td colSpan={4} className='text-center fs-3'>{getPaymentGateawayError ? getPaymentGateawayError : "data Kosong"}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table> 
                </div>
            </div>

            <ModalAddPaga
                showModalPaga = {showModalAddPaga}
                handleCloseAddPaga = {closeAddPaga}
                register = {register}
                resetField = {resetField}
                handleSubmit = {handleSubmit}
                Keyword = {Keyword}
            />

            <ModalEditPaga
                showModalPaga = {showModalEditPaga}
                handleCloseEditPaga = {closeEditPaga}
                resetField ={resetField}
                handleSubmit = {handleSubmit}
                Paga = {Paga}
                setPaga = {setPaga}
                Keyword = {Keyword}
            />
        </div>
    );
}

export default PaymentGateaway;
