import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux';
import { getBank, getPaymentGateaway, getUserAccount, updateUserAccount } from '../../../../actions/paymentAction';
import Swal from 'sweetalert2';

const ModalEditAccounts = (props) => {
    const {
        showModalAccounts,
        handleCloseEditAccount,
        handleSubmit,
        UserAccount,
        setUserAccount,
        reset
    } = props;
    
    const dispatch = useDispatch();
    const{
      getBankResult, 
      getBankLoading, 
      getBankError,
      
      getPaymentGateawayResult,
      getPaymentGateawayError,
      getPaymentGateawayLoading,

      updateUserAccountResult,
      updateUserAccountLoading,
      updateUserAccountError,


    } = useSelector(
      (state)=>state.paymentReducers
    )
    const [isEdit, setisEdit] = useState(false);
    const [Exp, setExp] = useState('');

    const submitEdit = (data)=>{
        const month = Exp.split("-");
        UserAccount.expyear = month[0]
        UserAccount.expmonth = month[1]
        data = UserAccount
        setisEdit(true)
        dispatch(updateUserAccount(data))

    }

    const userId = 1;
    useEffect(() => {
      setExp(UserAccount.expyear + '-' + UserAccount.expmonth)
      
      if(isEdit){
        if(updateUserAccountResult){
            Swal.fire({
                title: updateUserAccountResult,
                text: 'Bank Berhasil Diubah!',
                icon: 'success'
            }).then(()=>{
              handleCloseEditAccount(false)
              reset()
              dispatch(getUserAccount(userId))
              setisEdit(false)
            })
        }
        else if(updateUserAccountError){
            Swal.fire({
                title: updateUserAccountError,
                text: 'Gagal Mengubah Data!',
                icon: 'error'
            })
        }
    }

      dispatch(getBank({bank_name:''}))
      dispatch(getPaymentGateaway({paga_code:''}))
    },[dispatch,UserAccount,updateUserAccountResult,updateUserAccountError]);


    return (
        <Modal show={showModalAccounts} onHide={handleCloseEditAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(submitEdit)}>
        <Modal.Body>
          <div className="row g-3 align-items-center">
              <div className="col-6">
                  <label  className="col-form-label">Account Number</label>
              </div>
              <div className="col-6">                                               
                  <input type="text" value={UserAccount.account_number} id="account_number" className="form-control" required onChange={(e)=>setUserAccount({...UserAccount,account_number:e.target.value})}/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Saldo</label>
              </div>
              <div className="col-6">
                  <input value={UserAccount.saldo} type="text" id="saldo" className="form-control" required onChange={(e)=>setUserAccount({...UserAccount,saldo:e.target.value})}/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Type</label>
              </div>
              <div className="col-6">
              <select className="form-select" aria-label="Default select example" value={UserAccount.type} onChange={(e)=>setUserAccount({...UserAccount,type:e.target.value})}>
                <option selected value='Debet'>Debet</option>
                <option value='Credit Card'>Credit Card</option>
                <option value='Payment'>Payment</option>
                </select>
              </div>

              <div className="col-6">
                  <label className="col-form-label">Bank Name / Fintech Name</label>
              </div>
              <div className="col-6">
                 <select className="form-select" value={UserAccount.entity_id} onChange={(e)=>setUserAccount({...UserAccount,entity_id:e.target.value})}>
                 {  
                    UserAccount.type === "Debet"|| UserAccount.type === "Credit Card" ?
                      getBankResult ?(
                          getBankResult.map((bank)=>{
                                return(
                                    <option value={bank.bank_entity_id}>{bank.bank_name}</option>
                                      
                                  )
                                }
                                )
                            )
                            :getBankLoading?(
                                <tr>Loading...</tr>
                            ):(
                                <tr>{getBankError ? getBankError : "data Kosong"}</tr>
                            )
                            :
                            getPaymentGateawayResult ?(
                              getPaymentGateawayResult.map((paga)=>{
                                    return(
                                        <option value={paga.paga_entity_id}>{paga.paga_name}</option>
                                          
                                      )
                                    }
                                    )
                                )
                                :getPaymentGateawayLoading?(
                                    <option>Loading...</option>
                                ):(
                                    <option>{getPaymentGateawayError ? getPaymentGateawayError : "data Kosong"}</option>
                                )
                        }
                
                </select>
              </div>

              <div className="col-6">
                  <label className="col-form-label">Expired In</label>
              </div>
              <div className="col-6">
              <input onChange={(e)=>setExp(e.target.value)} value={Exp} type="month" id="expired" className="form-control" required/>
              </div>
              
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditAccount}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
}

export default ModalEditAccounts;
