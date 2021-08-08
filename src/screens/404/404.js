// @flow
import * as React from 'react';
import Layout from '../../components/layout/layout';
import './404.scss';

const Err = () => {
  return (
    <Layout>
      <div className='err-cont' >
        <p className='err' >404</p>
      </div>
    </Layout>
  );
};

export default Err;