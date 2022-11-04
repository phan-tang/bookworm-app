import React from "react";
import './bookInCart.scss';
import { useState } from "react";

function BookInCart(props) {

    const [quantity, setQuantity] = useState(props.book.quantity);

    //Function used to apply sort and filter for list of books
    const handleChangeQuantity = (action) => {
        if (action == "subtract" && quantity != 1) {
            setQuantity(quantity - 1);

        }
        if (action == "add" && quantity != 8) {
            setQuantity(quantity + 1);
        }
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
                    <img src={"images/" + props.book.book_cover_photo + ".jpg"}></img>
                    <span>
                        <h5>{props.book.title}</h5>
                        <h6>{props.book.author}</h6>
                    </span>
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
        </>
    );
}

export default BookInCart;