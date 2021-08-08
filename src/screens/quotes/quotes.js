import * as React from 'react';
import Layout from '../../components/layout/layout';
import './quotes.scss';
import QuoteItem from '../../components/quote-item/quoteItem';
import AddModal from '../../components/add-modal/addQuotemodal';
import EditModal from '../../components/edit-modal/editQuoteModal';
import DeleteModal from '../../components/delete-modal/deleteQuoteModal';
import SearchQuote from '../../components/search-quote/searchQuote';
import useQuotes from '../../hooks/useQuotes';
import { useState } from 'react';

const Quotes = () => {
  const [editQuote, setEditQuote] = useState({});
  const [modalState, setModalState] = useState(0);
  const [delId, setDelId] = useState("");
  const { isLoading, quotes, error, searchVal, setSearchVal, setQuotes } = useQuotes();

  const editHandler = (quote) => {
    setEditQuote(quote);
    setModalState(3);
  }

  const deleteHandler = (id) => {
    setModalState(2);
    setDelId(id);
  }

  return (
    <Layout>
      {modalState === 1 && <AddModal modalState={modalState} setModalState={setModalState} setQuotes={setQuotes} />}
      {modalState === 2 && <DeleteModal modalState={modalState} setModalState={setModalState} delId={delId} setQuotes={setQuotes} />}
      {modalState === 3 && <EditModal modalState={modalState} setModalState={setModalState} editQuote={{...editQuote}} setQuotes={setQuotes} />}
      <div className='quotes' >
        <h1>Quotes</h1>
        <SearchQuote searchVal={searchVal} setModalState={setModalState} setSearchVal={setSearchVal} setQuotes={setQuotes} />
        <div className='mt-4' >
          {
            quotes?.map((quote, _id) => {
              return <QuoteItem key={_id} quote={quote} editHandler={editHandler} deleteHandler={deleteHandler} setQuotes={setQuotes} />
            })
          }
          {!isLoading && quotes.length === 0 && <div className='fs-2' > No Quotes available ! </div>}
          {error && <div className='fs-4'> Error while retrieving quotes.. </div>}
        </div>
      </div>
    </Layout>
  );
};

export default Quotes;