import React from 'react';
import './bookCard.scss';
import { Link } from 'react-router-dom';

function BookCard(props) {

    //Function to display book cover photo
    const displayBookCoverImage = (book) => {
        if (book.book_cover_photo != null) {
            return (<img src={'images/' + book.book_cover_photo + '.jpg'} className="card-img-top" />);
        }
        return (
            <div className='default-book-cover-photo'></div>
        );
    }

    //Function to display book price
    const displayBookPrice = (book) => {
        if (book.discount_amount != 0) {
            return (<>
                <span className='previous-price'>${book.book_price}</span>
                <span className='final-price'>${book.final_price}</span>
            </>);
        }
        return (<span className='final-price'>${book.book_price}</span>);
    }

    return (
        <>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                {/* <Link> */}
                <div className="card book-card">
                    {displayBookCoverImage(props.bookCard)}
                    <div className="card-body">
                        <h5 className="card-title">{props.bookCard.book_title}</h5>
                        <p className="card-text">{props.bookCard.author.author_name}</p>
                    </div>
                    <div className="book-card-price">
                        {displayBookPrice(props.bookCard)}
                    </div>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}

export default BookCard;