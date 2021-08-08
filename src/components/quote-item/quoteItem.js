import React, { useState } from "react";
import './quoteitem.scss';
import { Button, Card, Col } from "react-bootstrap";
import apis from "../../api/quotesApis";
import {
    HandThumbsUp, HandThumbsDown, HandThumbsUpFill,
    HandThumbsDownFill, PencilSquare, Trash, ChevronDown, ChevronUp
} from 'react-bootstrap-icons';
import helpers from '../../utils/helpers';

const QuoteItem = ({ quote, editHandler, deleteHandler, setQuotes }) => {

    const [isLoading, setIsLoading] = useState("");
    const [viewMore, setViewMore] = useState(false);

    const ViewMore = () => {
        return(
            <span className='view-more' onClick={()=>setViewMore(!viewMore)} >View more <ChevronDown size={15} className='icon' /></span>
        )
    }
    
    const ViewLess = () => {
        return(
            <span className='view-more' onClick={()=>setViewMore(!viewMore)} >View less <ChevronUp size={15} className='icon' /></span>
        )
    }

    const likesHandler = async (type, reset) => {
        setIsLoading(type);
        const URI = `quote/${quote._id}/${type}/up`;
        const data = await apis.likeUnlike(URI);
        if (data.status !== 202) {
            setIsLoading("");
            helpers.getAlert("Error!!", "", "error");
            return;
        }
        reset(type === "dislike" ? "dislikes" : "likes");
    }

    const resetQuotes = (type) => {
        setQuotes(currQuote => {
            return currQuote.map(item => {
                if (item._id === quote._id) {
                    item[type] = item[type] + 1;
                }
                return item
            })
        })
        setIsLoading("");
        helpers.getAlert(`Quote ${type === "dislikes" ? "disliked" : "liked"}`, "", "success");
    }

    return (
        <Col md={12} className='quote-item' >

            <Card className={'quote-card'+(!viewMore ? ' fixed-quote-height' : '')} style={{ margin: '1rem', width: '90%' }}>
            <div className='card-top'  >
             “
            </div>
                <Card.Body style={{borderColor: '#8c8c8c'}} >

                    <Card.Text className='quote' >
                        “ {(quote.quote.length < 200) ? quote.quote : (viewMore ? quote.quote : (quote.quote).slice(0,200)+'...')}
                        <div>
                            { (quote.quote.length > 200) ? (viewMore ? <ViewLess /> : <ViewMore />) : null }
                        </div>
                    </Card.Text>
                    <div className='author' >~ {quote.author}</div>
                    <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">
                        <div className='mr-2' >
                            <HandThumbsUpFill color='#28a745' />
                            <span className='ml-1' >{quote.likes}</span>
                        </div>
                        <div className='ml-2'>
                            <HandThumbsDownFill color='red' />
                            <span className='ml-1' >{quote.dislikes}</span>
                        </div>
                    </Card.Subtitle>
                    <div className='btn-cont' >
                        <Button className='btn m-2' onClick={() => editHandler(quote)} ><PencilSquare /></Button>
                        <Button className='btn m-2' variant={'danger'}  onClick={() => deleteHandler(quote._id)} ><Trash /></Button>
                    </div>
                </Card.Body>
            </Card>
            <div className='likes' >
                <Button className='float-btn m-2' disabled={(isLoading === 'likes')} variant='success'  onClick={() => likesHandler('likes', resetQuotes)} >
                    <HandThumbsUp className='like-icon' />
                </Button>
                <Button className='float-btn m-2' disabled={(isLoading === 'dislike')} variant='danger' onClick={() => likesHandler('dislike', resetQuotes)} >
                    <HandThumbsDown className='like-icon' />
                </Button>
            </div>
        </Col>
    );
}

export default QuoteItem;
