import {Alert} from 'react-bootstrap';
import './alert.scss';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleAlert } from '../../redux/actions';

const CustomAlert = ({variant = 'success',message, }) => {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    useEffect(()=> {
        if(alert){
            setTimeout(()=>dispatch(toggleAlert({msg:"",variant:""})),3000);
        }
    } )

    return(
        <Alert variant={variant} className='toast-alert'  >
          {message}
        </Alert>
    )
}

export default CustomAlert;