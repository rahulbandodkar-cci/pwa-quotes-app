// @flow
import * as React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import apis from '../../api/quotesApis';
import { useState } from 'react';
import helpers from '../../utils/helpers';

const AddQuoteModal = ({ setQuotes, modalState, setModalState }) => {
	const [quote, setQuote] = useState({
		quote: "",
		author: "",
		tags: ""
	})
	const [isLoading,setLoading] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			setLoading(true);
			let resp = await apis.addQuote(quote);
			setQuotes(currQuote => [...currQuote, resp.quote])
			setModalState(0);
			helpers.getAlert("Quote added successfully","","success");
		} catch (e) {
			console.log("errr", e)
			setLoading(false);
			helpers.getAlert((e.response && e.response.data && e.response.data.message) ? e.response.data.message : "Error while adding quote","","error");
			
		}
	}

	const changeHandler = (e) => {
		setQuote({
			...quote,
			[e.target.name]: e.target.value
		})
	}

	return (
		<Modal
			show={Boolean(modalState === 1)}
			size="md"
			onHide={() => setModalState(0)}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add Quote
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
						<Form.Label>Tags</Form.Label>
						<Form.Control name='tags' className='text-input' placeholder='Tags' value={quote.tags} onChange={changeHandler} />
					</Form.Group>
					<Button name='submit' type='submit' className='w-100 p-2' disabled={isLoading} >ADD</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);

}

export default AddQuoteModal;