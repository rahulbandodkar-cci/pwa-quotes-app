import * as React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import apis from '../../api/quotesApis';
import { useState } from 'react';
import helpers from '../../utils/helpers';

const EditModal = ({ editQuote, setQuotes, modalState, setModalState }) => {
  const [quote, setQuote] = useState({
    quote: editQuote.quote,
    author: editQuote.author,
    likes: editQuote.likes
  })
  const [isLoading,setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let resp = await apis.editQuote(editQuote._id, quote);
      if (resp.status !== 202) {
        setLoading(false);
        helpers.getAlert("Error while adding quote","","error");
        return;
      }
      setQuotes(currQuotes => {
        return currQuotes.map(item => {
          if (item._id === editQuote._id) {
            for (const value of Object.keys(quote)) {
              item[value] = quote[value];
            }
          }
          return item
        })
      })
      setLoading(false);
      setModalState(0);
      helpers.getAlert("Quote updated successfully","","success");
    } catch (e) {
      console.log(e);
      setLoading(false);
      helpers.getAlert("Error while adding quote","","error");
    }
  }

  const changeHandler = (e) => {
    setQuote(currQuote => {
      return {
        ...currQuote,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <Modal
      show={Boolean(modalState === 3)}
      size="md"
      onHide={() => setModalState(0)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Quote
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group >
            <Form.Label>Quote</Form.Label>
            <Form.Control name='quote' className='text-input' value={quote.quote} placeholder='Quote' onChange={changeHandler} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control name='author' className='text-input' placeholder='Author' value={quote.author} onChange={changeHandler} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Likes</Form.Label>
            <Form.Control name='likes' className='text-input' placeholder='Likes' value={quote.likes} onChange={changeHandler} />
          </Form.Group>
          <Button name='submit' type='submit' className='w-100 p-2' disabled={isLoading} >EDIT</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;