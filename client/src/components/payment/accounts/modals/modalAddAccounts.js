import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAccount, getBank, getPaymentGateaway, getUserAccount } from '../../../../actions/paymentAction';
import Swal from 'sweetalert2'

const ModalAddAccounts = (props) => {
    const {
        showModalAccounts,
        handleCloseModalAddAccount,
        register,
        handleSubmit,
        resetField,
        reset
    } = props;
    
    const dispatch = useDispatch();
    const [Type, setType] = useState('Debet');
    const [isAdd, setisAdd] = useState(false);

    const{
      getBankResult, 
      getBankLoading, 
      getBankError,
      
      getPaymentGateawayResult,
      getPaymentGateawayError,
      getPaymentGateawayLoading,

      addUserAccountResult
      ,addUserAccountError 
    } = useSelector(
      (state)=>state.paymentReducers
    )

    const userId = 2

    const tambahUserAccount = (data)=>{
      const date = data.expyear.split("-");
      data.expyear = date[0]
      data.expmonth = date[1]
      data.user_id = userId
      // console.log(data)
      setisAdd(true)
      dispatch(addUserAccount(data))
    }

    useEffect(() => {

      if(isAdd){
        if(addUserAccountResult){
            Swal.fire({
                title: addUserAccountResult,
                text: 'User Account Berhasil Ditambah!',
                icon: 'success'
            }).then(()=>{
              handleCloseModalAddAccount(false)
              dispatch(getUserAccount(userId))
              reset()
            })
            }
            else if(addUserAccountError){
                Swal.fire({
                    title: addUserAccountError,
                    text: 'Gagal Menginput!',
                    icon: 'error'
                })
            }
        }

      dispatch(getBank({bank_name:''}))
      dispatch(getPaymentGateaway({paga_code:''}))

    }, [dispatch,addUserAccountResult,addUserAccountError]);

    return (
        <Modal show={showModalAccounts} onHide={handleCloseModalAddAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(tambahUserAccount)}>
        <Modal.Body>
          <div className="row g-3 align-items-center">
              <div className="col-6">
                  <label  className="col-form-label">Account Number</label>
              </div>
              <div className="col-6">                                               
                  <input type="text" {...register('account_number')} id="account_number" className="form-control" required/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Saldo</label>
              </div>
              <div className="col-6">
                  <input {...register('saldo')} type="text" id="saldo" className="form-control" required/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Type</label>
              </div>
              <div className="col-6">
              <select className="form-select" aria-label="Default select example" {...register('type')} onChange={(e)=>setType(e.target.value)}>
                <option selected value='Debet'>Debet</option>
                <option value='Credit Card'>Credit Card</option>
                <option value='Payment'>Payment</option>
                </select>
              </div>

              <div className="col-6">
                  <label className="col-form-label">Bank Name / Fintech Name</label>
              </div>
              <div className="col-6">
                 <select className="form-select" {...register('entity_id')}>
                 {  
                    Type === "Debet"|| Type === "Credit Card" ?
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
                                // console.log(paga)
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
              <input {...register('expyear','expmonth')}type="month" id="expired" className="form-control" required/>
              </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAddAccount}>
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

export default ModalAddAccounts;
