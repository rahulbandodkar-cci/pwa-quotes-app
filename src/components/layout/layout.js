// @flow
import * as React from 'react';
import Header from '../header/header';
import { Container } from 'react-bootstrap';
import './layout.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Alert from '../alert/alert.js';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1,
    color: '#000',
    backgroundColor: '#fff',
    opacity: "0.7 !important"
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const loader = useSelector(state => state.loader);
  const { show , variant , msg } = useSelector(state => state.alert);

  return (
    <>
      <Header />
      <Container className='main-container p-4' >
        <Backdrop className={classes.backdrop} open={loader} >
          <CircularProgress disableShrink size='4rem' thickness={4} />
        </Backdrop>
        {props.children}
        {show ? <Alert variant={variant} message={msg} /> : null}
      </Container>
    </>
  );
};

export default Layout;