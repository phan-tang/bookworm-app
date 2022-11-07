/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import '../css/app.scss';
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Home from './components/page/home/home';
import Shop from './components/page/shop/shop';
import About from './components/page/about/about';
import Cart from './components/page/cart/cart';
import Product from './components/page/product/product';
import Header from './components/element/header/header';
import Footer from './components/element/footer/footer';
import Login from './components/element/login/login';
import book1 from '../assets/bookcover/book1.jpg';
import book2 from '../assets/bookcover/book2.jpg';
import book3 from '../assets/bookcover/book3.jpg';
import book4 from '../assets/bookcover/book4.jpg';
import book5 from '../assets/bookcover/book5.jpg';
import book6 from '../assets/bookcover/book6.jpg';
import book7 from '../assets/bookcover/book7.jpg';
import book8 from '../assets/bookcover/book8.jpg';
import book9 from '../assets/bookcover/book9.jpg';
import book10 from '../assets/bookcover/book10.jpg';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function App() {

    const [bookCart, setBookCart] = useState([]);
    const [numberBooks, setNumberBooks] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [user, setUser] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    //Function used to set number of books in cart
    const setNumberOfBooks = () => {
        let numberOfBooks = 0;
        if (bookCart != []) {
            bookCart.forEach((book) => {
                numberOfBooks += book.quantity;
            })
        }
        setNumberBooks(numberOfBooks);
    }

    //Function used to get cart total
    const setCartTotalPrice = () => {
        let total = 0;
        if (bookCart != []) {
            bookCart.forEach(bookInCart => {
                total += bookInCart.final_price * bookInCart.quantity;
            });
        }
        setCartTotal(total);
    }

    //Function used to handle change books in cart
    const handleChangeBooksInCart = (cart, quantity, final_price) => {
        setBookCart(cart);
        setCartTotal(cartTotal + final_price);
        setNumberBooks(numberBooks + quantity);
    }

    //ComponentDidMount
    useEffect(() => {
        const abort = new AbortController();
        let user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            setUser(user);
        }
        setCartTotalPrice();
        setNumberOfBooks();
        return () => abort.abort();
    }, []);

    return (
        <HashRouter>
            <Header userInformation={user} setUserInformation={setUser} numberOfBooks={numberBooks} setShow={setModalShow}></Header>
            <div className='container-fluid p-0'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart userInformation={user} setShow={setModalShow} cart={bookCart} numberOfBooks={numberBooks} totalPrice={cartTotal} handleChangeBooksInCart={handleChangeBooksInCart} />} />
                    <Route path="/product/:id" element={<Product cart={bookCart} setCart={setBookCart} setCartTotalPrice={setCartTotalPrice} setNumberOfBooks={setNumberOfBooks} />} />
                </Routes>
            </div>
            <Login
                show={modalShow}
                onHide={() => setModalShow(false)}
                setUser={setUser}
            ></Login>
            <Footer></Footer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme='colored'
            />
        </HashRouter>
    );
}

export default App;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);