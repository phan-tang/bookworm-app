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

function App() {
    return (
        <HashRouter>
            <Header></Header>
            <div className='container-fluid p-0'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </div>
            <Footer></Footer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
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