import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction } from '../../actions/paymentAction';

const Transaction = () => {
    const dispatch = useDispatch();
    const { handleSubmit } = useForm();
    const ref = useRef();
    const [isSearch, setisSearch] = useState(false);

    const {
        getTransactionResult, 
        getTransactionLoading, 
        getTransactionError       
    } = useSelector((state)=>state.paymentReducers);

    const [Transaction, setTransaction] = useState({
        trx_num:'',
        type:''
    });
    
    useEffect(() => {
        if (isSearch) {
            console.log(Transaction)
            clearTimeout(ref.current)
            ref.current = setTimeout(() => {
                dispatch(getTransaction(Transaction))
            },1000)
            
        }else{
            // Transaction.type=''
            // console.log(Transaction)
            dispatch(getTransaction(Transaction))
        }
    }, [dispatch,Transaction]);

    
    return (
        <>
            <div className='row'>
                <div className='col-3 justify-content-end text-end '>
                    <span className='fs-4'>Search</span>
                </div>
                <div className='col-9'>
                {/* <form onSubmit={handleSubmit(test)}> */}
                    <div className='row justify-content-start text-start'>
                        <div className='col-5 '>
                            <input type="text" value={Transaction.trx_num} className="form-control justify-content-end" placeholder="Search By Transaction Number" aria-describedby="addon-wrapping"
                            onChange={(e)=>{
                                setTransaction({...Transaction,trx_num:e.target.value})
                                setisSearch(true)
                            }}
                            />
                        </div>
                        <div className='d-grid gap-2 col-3'>
                            <button type='submit'className='btn btn-dark'> Search</button>
                        </div>
                        <div className='col-3'>
                            <select className="form-select rounded-3" required value={Transaction.type} onChange={(e)=>{
                                 setTransaction({...Transaction,type:e.target.value})
                                 setisSearch(true)
                                }}>
                                <option className='text-center' value='TP'>TP</option>
                                <option className='text-center' value='TRB'>TRB</option>
                                <option className='text-center' value='TPY'>RPY</option>
                                <option className='text-center' value='RF'>RF</option>
                                <option className='text-center' value='ORM'>ORM</option>
                            </select>
                        </div>
                    </div>
                {/* </form> */}
                </div>
            </div>

            <div className='p-4'>
            <table className="table w-100">
                    <thead>
                        <tr className='text-center'>
                        <th scope="col">Transaction Number</th>
                        <th scope="col">Trx Date</th>
                        <th scope="col">Debet</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Note</th>
                        <th scope="col">Order Number</th>
                        <th scope="col">Source</th>
                        <th scope="col">Target</th>
                        <th scope="col">Transfer Ref</th>
                        <th scope="col">Type</th>
                        <th scope="col">User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        getTransactionResult ?(
                            getTransactionResult.map((trx)=>{
                                return(
                                <tr key={trx.patr_id}>
                                    <th scope="row">{trx.patr_trx_number}</th>
                                        <td className='text-center'>{trx.patr_modified_date}</td>
                                        <td className='text-center'>{trx.patr_debet}</td>
                                        <td className='text-center'>{trx.patr_credit}</td>
                                        <td className='text-center'>{trx.patr_note}</td>
                                        <td className='text-center'>{trx.patr_order_number}</td>
                                        <td className='text-center'>{trx.patr_source_id}</td>
                                        <td className='text-center'>{trx.patr_target_id}</td>
                                        <td className='text-center'>{trx.patr_trx_number_ref}</td>
                                        <td className='text-center'>{trx.patr_type}</td>
                                        <td className='text-center'>{trx.patr_user_id}</td>
                                </tr>
                                )
                            }
                            )
                        )
                        :getTransactionLoading?(
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        ):(
                            <tr>{getTransactionError ? getTransactionError : "data Kosong"}</tr>
                        )

                    }
                        {/* <tr>
                            <th scope="row" className='text-start'>1</th>
                                <td className='text-center'>1</td>
                                <td className='text-center'>2</td>
                                <td className='text-center'>3</td>
                                <td className='text-center'>4</td>
                                <td className='text-center'>5</td>
                                <td className='text-center'>6</td>
                                <td className='text-center'>6</td>
                                <td className='text-center'>6</td>
                                <td className='text-center'>6</td>
                                <td className='text-center'>6</td>
                                
                        </tr>                 */}
                    </tbody>
                    </table>
            </div>
        </>
    );
}

export default Transaction;
