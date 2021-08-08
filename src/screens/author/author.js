// @flow
import * as React from 'react';
import Layout from '../../components/layout/layout';
import AuthorItem from '../../components/author-item/authorItem';
import './author.scss';
import useAuthors from '../../hooks/useAuthors';

const Author = () => {
  const { authors, isLoading, error } = useAuthors();

  return (
    <Layout>
      <h1  >Authors</h1>
      <p className='mt-4' >Author's list</p>
      <div className='mt-lg-4 author-cont row' >

        {
          authors?.map((author, _id) => {
            return <AuthorItem key={_id} author={author} />
          })
        }
        {(!isLoading && authors.length === 0) && <div className='fs-2'> No Authors Available </div>}
        {error && <div className='fs-2'> Error while retrieving authors.. </div>}
      </div>

    </Layout>
  );
};

export default Author;