import React from "react";
import './bookInCart.scss';
import { useState } from "react";
import { Link } from "react-router-dom";

function BookInCart(props) {

    const [quantity, setQuantity] = useState(props.book.quantity);

    //Function used to handle change quantity of books in cart
    const handleChangeQuantity = (action) => {
        if (action == "subtract" && quantity > 0) {
            setQuantity(quantity - 1);
        }
        if (action == "add" && quantity < 8) {
            setQuantity(quantity + 1);
        }
        props.handleBooksInCart(props.book.book_id, action);
    }

    //Function used to display book cover photo
    const displayBookCoverImage = (book) => {
        if (book.book_cover_photo != null) {
            return (<img src={'images/' + book.book_cover_photo + '.jpg'} />);
        }
        return (
            <span className='default-book-cover-photo'></span>
        );
    }

    //Function used to display book previous price
    const displayPreviousPrice = () => {
        if (props.book.final_price != props.book.previous_price) {
            return (<p className="previous-price">${props.book.previous_price}</p>);
        }
        return (<></>);
    }

    return (
        <>
            <tr className="product-in-cart-detail">
                <th scope="row" className="product-in-cart-name">
                    <Link className='book-link' to={`/product/${props.book.book_id}`}>
                        {displayBookCoverImage(props.book)}
                        <span>
                            <h5 className="book-title">{props.book.title}</h5>
                            <h6>{props.book.author}</h6>
                        </span>
                    </Link>
                </th>
                <td className="product-in-cart-price">
                    <h5 className="book-final-price">${props.book.final_price}</h5>
                    {displayPreviousPrice()}
                </td>
                <td className="product-in-cart-quantity">
                    <div className="plus-minus-number-input">
                        <button onClick={() => handleChangeQuantity("subtract")}>-</button>
                        <span className="product-quantity">{quantity}</span>
                        <button onClick={() => handleChangeQuantity("add")}>+</button>
                    </div>
                </td>
                <td className="product-in-cart-price">
                    <h5>${props.book.final_price * quantity}</h5>
                </td>
            </tr>
        </ >
    );
}

export default BookInCart;