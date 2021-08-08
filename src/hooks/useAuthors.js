import { useEffect, useState } from "react"
import apis from "../api/quotesApis";
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../redux/actions';

const useAuthors = () => {
    const [authors,setAuthors] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchInitial = async () => {
            dispatch(toggleLoader());
            let data = await apis.fetchAuthors();
            if(data && Array.isArray(data)){
                setAuthors(data);
                setIsLoading(false);
            }else{
                setError("Error while retrieving authors");
            }
            dispatch(toggleLoader());
        }
        fetchInitial();
    },[])

    return { authors , isLoading , error }
} 

export default useAuthors;