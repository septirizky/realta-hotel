import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentGateaway, updatePaymentGateaway } from '../../../../actions/paymentAction';

const ModalEditPaga = (props) => {
    const {
        showModalPaga,
        handleCloseEditPaga,
        handleSubmit,    
        resetField,
        Paga,
        setPaga,
        Keyword
    } = props;

    const dispatch = useDispatch();

    const{updatePaymentGateawayResult, updatePaymentGateawayError} = useSelector(
        (state)=>state.paymentReducers
    )

    const [isEdit, setisEdit] = useState(false);
    const editPaga = (data)=>{
        data=Paga
        // console.log(data)
        dispatch(updatePaymentGateaway(data))
        setisEdit(true);
    }

    useEffect(() => {
       if(isEdit){
        console.log(updatePaymentGateawayResult)
        console.log(updatePaymentGateawayError)
        if(updatePaymentGateawayResult){
            Swal.fire({
                title: updatePaymentGateawayResult,
                text: 'Bank Berhasil Diubah!',
                icon: 'success'
            })
            .then(()=>{
                handleCloseEditPaga(false);
                resetField('paga_code');
                resetField('paga_name');
                dispatch(getPaymentGateaway({paga_code:Keyword}))
            })
        }
        else if(updatePaymentGateawayError){
            
            Swal.fire({
                title: updatePaymentGateawayError,
                text: 'Gagal Mengubah Data!',
                icon: 'error'
            })
        }
       }
    }, [updatePaymentGateawayResult,updatePaymentGateawayError]);


    return (
        <Modal show={showModalPaga} onHide={handleCloseEditPaga}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(editPaga)}>
            <Modal.Body>
              <div className="row g-3 align-items-center">
                  <div className="col-4">
                      <label  className="col-form-label">Code</label>
                  </div>
                  <div className="col-6">                                               
                      <input type="text" value={Paga.paga_code} id="paga_code" className="form-control" onChange={(e)=>setPaga({...Paga,paga_code:e.target.value})} required/>
                  </div>
                  <div className="col-4">
                      <label className="col-form-label">Name</label>
                  </div>
                  <div className="col-6">
                      <input value={Paga.paga_name} type="text" id="paga_name" className="form-control" onChange={(e)=>setPaga({...Paga,paga_name:e.target.value})} required/>
                  </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditPaga}>
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

export default ModalEditPaga;
