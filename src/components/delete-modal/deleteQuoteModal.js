import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import apis from '../../api/quotesApis';
import { useState, useEffect } from 'react';
import helpers from '../../utils/helpers';

const DeleteModal = ({ delId, setQuotes, setModalState, modalState }) => {

  const submitHandler = async () => {
    try {
      let resp = await apis.deleteQuote(delId);
      if(!resp){
        throw new Error;
      }
      setQuotes(currQuotes => {
        return currQuotes.filter(item => item._id !== delId)
      })
      setModalState(0);
      helpers.getAlert("Quote deleted successfully","","success");
    } catch (e) {
      setModalState(0);
      helpers.getAlert("Error while quote deletion","","error");
    }
  }

  return (
    <Modal
      show={Boolean(modalState === 2)}
      size="md"
      onHide={() => setModalState(0)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Quote
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='p-2' >
          <Button className='m-3 pl-4 pr-4' onClick={submitHandler} >Yes</Button>
          <Button className='m-3 pl-4 pr-4' onClick={() => setModalState(0)} >No</Button>
        </div>
      </Modal.Body>
    </Modal>
  );

}

export default DeleteModal;