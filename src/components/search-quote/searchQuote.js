import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Container, Row } from 'react-bootstrap';
import { Search, FileEarmarkPlus } from 'react-bootstrap-icons';
import apis from '../../api/quotesApis';
import './search-quote.scss';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/actions';

const SearchQuote = ({ setModalState, searchVal, setSearchVal, setQuotes }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const searchQuote = async () => {
    try {
      dispatch(toggleLoader());
      let APIURI = `/quote/search?author=${searchVal}`
      if (searchVal === "") {
        history.push('/quotes');
        window.location.reload();
      }
      const data = await apis.fetchQuotes(APIURI);
      if (data) {
        setQuotes(data);
      }
    } catch (e) {
    }
    dispatch(toggleLoader());
  }

  return (
    <Container >
      <div className='fs-5 mr-2 mt-4' >Search By Author</div>
      <Row className='justify-content-center' >
        <div className='search-cont mt-2' >
          <input type='text' placeholder='eg:- Martin Fowler' value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
          <Button className='ml-lg-2 ml-md-2 ' onClick={() => searchQuote()} ><Search /><div className='d-block d-lg-none' >Search</div></Button>
          <Button className='ml-lg-2 ml-md-3 ' onClick={() => setModalState(1)} ><FileEarmarkPlus /><div className='d-block d-lg-none' >Add Quote</div></Button>
        </div>
      </Row>
    </Container>
  )
}

export default SearchQuote;