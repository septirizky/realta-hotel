import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBank, getPaymentGateaway } from '../../../../actions/paymentAction';

const ModalAddAccounts = (props) => {
    const {
        showModalAccounts,
        handleCloseMOdalAddAccount,
        register,
        handleSubmit,
        resetField,
    } = props;
    
    const dispatch = useDispatch();
    const [Type, setType] = useState('Debet');
    const [entityId, setentityId] = useState('');
    
    const {
      getBankResult, 
      getBankLoading, 
      getBankError,
      
      getPaymentGateawayResult,
      getPaymentGateawayError,
      getPaymentGateawayLoading,
  } = useSelector((state)=>state.paymentReducers);

    useEffect(() => {

      dispatch(getBank({bank_name:''}))
      dispatch(getPaymentGateaway({paga_code:''}))
    }, [dispatch]);
    return (
        <Modal show={showModalAccounts} onHide={handleCloseMOdalAddAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form>
        <Modal.Body>
          <div className="row g-3 align-items-center">
              <div className="col-6">
                  <label  className="col-form-label">Account Number</label>
              </div>
              <div className="col-6">                                               
                  <input type="text" id="bankcode" className="form-control" required/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Saldo</label>
              </div>
              <div className="col-6">
                  <input  type="text" id="bankcode" className="form-control" required/>
              </div>
              <div className="col-6">
                  <label className="col-form-label">Type</label>
              </div>
              <div className="col-6">
              <select class="form-select h-50" aria-label="Default select example" onChange={(e)=>setType(e.target.value)}>
                <option selected value='Debet'>Debet</option>
                <option value='Credit'>Credit</option>
                <option value='Fintech'>Fintech</option>
                </select>
              </div>

              <div className="col-6">
                  <label className="col-form-label">Bank Name / Fintech Name</label>
              </div>
              <div className="col-6">
                 <select class="form-select h-25" aria-label="Default select example" onChange={(e)=>setentityId(e.target.value)}>
                 {  
                    Type === "Debet"|| Type === "Credit" ?
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
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMOdalAddAccount}>
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
