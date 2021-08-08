import { useEffect, useState } from "react"
import apis from "../api/quotesApis";
import helpers from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../redux/actions';

const useQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchVal, setSearchVal] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInitial = async () => {
            dispatch(toggleLoader());
            const { uri, slug } = helpers.getURI();
            if (slug) {
                setSearchVal(slug);
            }
            let data = await apis.fetchQuotes(uri);
            if (data && Array.isArray(data)) {
                setQuotes(data);
                setIsLoading(false);
            } else {
                setError("Error while retrieving quotes");
            }
            dispatch(toggleLoader());
        }
        fetchInitial();
    }, [])

    return { quotes, isLoading, error, searchVal, setQuotes, setSearchVal }
}

export default useQuotes;