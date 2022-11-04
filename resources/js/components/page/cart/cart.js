import React, { useState, useEffect } from 'react';
import BookInCart from '../../element/bookInCart/bookInCart';
import './cart.scss';

function Cart(props) {

    const [cartToTal, setCartTotal] = useState(0);

    //Function used to display book in cart
    const displayBookInCart = () => {
        if (props.cart != []) {
            return (
                props.cart.map((bookInCart) => {
                    return (<BookInCart book={bookInCart} key={"book_in_cart_" + bookInCart.id} totalPrice={cartToTal} setToTalPrice={setCartTotal}></BookInCart>);
                })
            );
        }
        return (<tr className="product-in-cart-detail"><h3>There is nothing in cart</h3></tr>);
    }

    const getCartTotal = () => {
        let total = 0;
        if (props.cart != []) {
            props.cart.forEach(bookInCart => {
                total += bookInCart.final_price * bookInCart.quantity;
            });
        }
        setCartTotal(total);
    }

    //ComponentDidMount
    useEffect(() => {
        const abort = new AbortController();
        getCartTotal();
        return () => abort.abort();
    }, []);

    return (
        <>
            {/* <!-- Cart --> */}

            <div className="container your-cart">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="part-title">
                        <p>Your cart: 0 items</p>
                    </div>
                </div>
                <div className="line"></div>
                {/* <!-- Products In Cart --> */}
                <div className="row products-in-cart">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <table className="products-in-cart-table">
                                <thead>
                                    <tr>
                                        <th scope="col-6">
                                            <h5 className="card-header">Product</h5>
                                        </th>
                                        <th scope="col-2">
                                            <h5 className="card-header">Price</h5>
                                        </th>
                                        <th scope="col-2">
                                            <h5 className="card-header">Quantity</h5>
                                        </th>
                                        <th scope="col-2">
                                            <h5 className="card-header">Total</h5>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayBookInCart()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="card cart-totals">
                            <h5 className="card-header">Cart Totals</h5>
                            <div className="card-body">
                                <h5 className="cart-totals-price">${cartToTal}</h5>
                                <button className="button">Place order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;