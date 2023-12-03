import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { addPaga, getBank, getPaymentGateaway } from '../../../../actions/paymentAction';
import Swal from 'sweetalert2'

const ModalAddPaga = (props) => {
    const {
        showModalPaga,
        handleCloseAddPaga,
        register,
        resetField,
        handleSubmit,
        Keyword
    } = props;
    
    const dispatch = useDispatch();
    const [isAdd, setisAdd] = useState(false);
    const {addPagaResult, addPagaError}= useSelector(
        (state) => state.paymentReducers
    );

    const submitAdd = (data)=>{
        setisAdd(true);
        dispatch(addPaga(data))
    }

    useEffect(() => {
        if(isAdd){
            if(addPagaResult){
                Swal.fire({
                    title: addPagaResult,
                    text: 'Payment Gateaway Berhasil Ditambah!',
                    icon: 'success'
                }).then(()=>{
                  handleCloseAddPaga(false)
                  resetField('paga_code')
                  resetField('paga_name')
                  dispatch(getPaymentGateaway({paga_code:Keyword}))
                })
            }
            else if(addPagaError){
                Swal.fire({
                    title: addPagaError,
                    text: 'Gagal Menginput!',
                    icon: 'error'
                })
            }
        }
    }, [addPagaResult,addPagaError]);

    return (
        <Modal show={showModalPaga} onHide={handleCloseAddPaga}>
            <Modal.Header closeButton>
              <Modal.Title>Add Payment Gateway</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(submitAdd)}>
            <Modal.Body>
              <div className="row g-3 align-items-center">
                  <div className="col-4">
                      <label  className="col-form-label">Code</label>
                  </div>
                  <div className="col-6">                                               
                      <input type="text" {...register('paga_code')} id="paga_code" className="form-control" required/>
                  </div>
                  <div className="col-4">
                      <label className="col-form-label">Name</label>
                  </div>
                  <div className="col-6">
                      <input {...register('paga_name')} type="text" id="paga_name" className="form-control" required/>
                  </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddPaga}>
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

export default ModalAddPaga;
