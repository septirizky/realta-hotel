import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddBank, getBank } from '../../../../actions/paymentAction';
import Swal from 'sweetalert2'
const ModalAddBank = (props) => {
  const {
    showModalBank,
    handleCloseAddBank,
    register,
    handleSubmit,
    resetField,
    Keyword
  } = props;
  
    const dispatch = useDispatch();

    const [isAddBank, setisAddBank] = useState(false);

    const { addBankResult, addBankError } = useSelector(
      (state) => state.paymentReducers
    );

    const submitBank = (data)=>{
      console.log(data)
      setisAddBank(true)
      dispatch(AddBank(data));
    }

    useEffect(() => {
      if(isAddBank){
        if(addBankResult){
            Swal.fire({
                title: addBankResult,
                text: 'Bank Berhasil Ditambah!',
                icon: 'success'
            }).then(()=>{
              handleCloseAddBank(false)
              resetField('bank_code')
              resetField('bank_name')
              dispatch(getBank({bank_name:Keyword}))
            })
            }
            else if(addBankError){
                Swal.fire({
                    title: addBankError,
                    text: 'Gagal Menginput!',
                    icon: 'error'
                })
            }
        }
    }, [addBankResult,addBankError]);
  
    return (
           <Modal show={showModalBank} onHide={handleCloseAddBank}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(submitBank)}>
            <Modal.Body>
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
                      <input {...register('bank_name')} type="text" id="bankname" className="form-control" required/>
                  </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddBank}>
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

export default ModalAddBank;
