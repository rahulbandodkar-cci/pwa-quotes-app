import axios from 'axios';

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`
});

// Author api
const fetchAuthors = async () => {
    let response = await api.get(`author`);
    return (response && response.data) ? response.data : null;
}

//Quote apis
const fetchQuotes = async (uri) => {
    let response = await api.get(uri);
    return (response && response.data) ? response.data : null;
}

const addQuote = async (quote) => {
    let response = await api.post("/quote", quote, headers);
    return response.data;
}

const deleteQuote = async (id) => {
    let response = await api.delete(`/quote/${id}`);
    return (response && response.status==202) ? response.data : null;
}

const editQuote = async (id, quoteData) => {
    let response = await api.patch(`/quote/${id}`, quoteData);
    return response;
}

const likeUnlike = async (uri) => {
    const response = await api.post(uri);
    return response;
}

export default { fetchAuthors, fetchQuotes, addQuote, deleteQuote, editQuote, likeUnlike };