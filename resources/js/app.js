/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
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
import Header from './components/element/header/header';
import Footer from './components/element/footer/footer';
import 'font-awesome/css/font-awesome.min.css';

function App() {
    return (
        <Router>
            <Header></Header>
            <div className='container-fluid p-0'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
            <Footer></Footer>
        </Router>
    );
}

export default App;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);