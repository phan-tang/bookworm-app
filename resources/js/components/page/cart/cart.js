import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import BookInCart from '../../element/bookInCart/bookInCart';
import './cart.scss';
import { useNavigate } from 'react-router-dom';

function Cart(props) {

    const [allBooks, setAllBooks] = useState([]);
    let navigate = useNavigate();

    //Function used to display book in cart
    const displayBookInCart = () => {
        if (props.cart != []) {
            return (
                props.cart.map((bookInCart) => {
                    return (<BookInCart book={bookInCart} key={"book_in_cart_" + bookInCart.book_id} handleBooksInCart={handleChangeBooksQuantityInCart}></BookInCart>);
                })
            );
        }
        return (<></>);
    }

    //Function used to handle change book's quantity in cart
    const handleChangeBooksQuantityInCart = (id, action) => {
        let cart = props.cart;
        let quantity = 0;
        const bookInCart = cart.find(({ book_id }) => book_id == id);
        if (action == "subtract") {
            if (bookInCart.quantity == 1) {
                if (window.confirm("You want to delete this book from cart?")) {
                    cart = cart.filter((book) => book.book_id != id);
                }
            }
            bookInCart.quantity -= 1;
            quantity = -1;
        }
        else {
            if (bookInCart.quantity < 8) {
                bookInCart.quantity += 1;
                quantity = 1;
            }
        }
        props.handleChangeBooksInCart(cart, quantity, quantity * bookInCart.final_price);
    }

    //Function used to handle click button place order
    const handleClickButtonPlaceOrder = () => {
        if (props.userInformation == null) {
            props.setShow(true);
        }
        else {
            if (props.cart.length != 0) {
                let order_items = [];
                let filter_id = [];
                let quantityDeleteBooks = 0;
                let priceDeleteBooks = 0;
                let errorMessage = "";
                props.cart.forEach((bookInCart) => {
                    let book = allBooks.find((item) => item.id == bookInCart.book_id);
                    if (book != null && book.final_price == bookInCart.final_price) {
                        order_items.push({ "id": bookInCart.book_id, "final_price": bookInCart.final_price, "quantity": bookInCart.quantity });
                    }
                    else {
                        filter_id.push(bookInCart.book_id);
                        priceDeleteBooks -= bookInCart.quantity * bookInCart.final_price;
                        quantityDeleteBooks -= bookInCart.quantity;
                        if (errorMessage != "") {
                            errorMessage += ", ";
                        }
                        errorMessage += bookInCart.title;
                    }
                });
                let cart = props.cart.filter((book) => filter_id.includes(book.book_id) == false);
                if (quantityDeleteBooks == 0) {
                    handleCreateOrder(order_items);
                }
                else {
                    props.handleChangeBooksInCart(cart, quantityDeleteBooks, priceDeleteBooks);
                    toast.error("Some books are not unavailable now: " + errorMessage);
                }
            }
            else {
                toast.warning("There is nothing in cart!");
            }
        }
    }

    //Function used to create order
    const handleCreateOrder = async (order_items) => {
        let accessToken = props.userInformation.remember_token;
        console.log(order_items);
        await axios.post('api/place_order', { "order_items": order_items }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status == 201) {
                    props.handleChangeBooksInCart([], -props.numberOfBooks, -props.totalPrice);
                    toast.success("Ordered successfully!", { autoClose: 10000 });
                    setTimeout(() => { return navigate("/") }, 10000);
                }
                else {
                    toast.error("Order failed!");
                }
            }, (error) => {
                console.log(error);
            });
    }

    //Function used to get books in database
    const fetchAllBooksData = async () => {
        await axios.get('api/books?limit=all')
            .then(({ data }) => {
                setAllBooks(data.resource);
            })
            .catch(error => console.log(error));
    }

    //ComponentDidMount
    useEffect(() => {
        const abort = new AbortController();
        fetchAllBooksData();
        return () => abort.abort();
    }, []);

    return (
        <>
            {/* <!-- Cart --> */}

            <div className="container your-cart">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="part-title">
                        <p>Your cart: {props.numberOfBooks} items</p>
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
                                <h5 className="cart-totals-price">${props.totalPrice.toFixed(2)}</h5>
                                <button className="button" onClick={() => handleClickButtonPlaceOrder()}>Place order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;