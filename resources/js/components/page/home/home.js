import { React, useState, useEffect } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import Carousel from '../../element/carousel/carousel';
import BookRow from '../../element/bookRow/bookRow';
import { Tabs, Tab } from 'react-bootstrap';

function Home() {

    const [perRow, setPerRow] = useState([]);
    const [key, setKey] = useState('recommended-books');
    const [onSaleBooks, setOnSaleBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);

    const fetchOnSaleBooksData = async () => {
        await axios.get('api/books?sort=on-sale&limit=10')
            .then(({ data }) => {
                setOnSaleBooks(data.data);
            })
            .catch(error => console.log(error));
    }

    const fetchRecommendedBooksData = async () => {
        await axios.get('api/books?sort=recommended&limit=8')
            .then(({ data }) => {
                setRecommendedBooks(data.data);
            })
            .catch(error => console.log(error));
    }

    const fetchPopularBooksData = async () => {
        await axios.get('api/books?sort=popular&limit=8')
            .then(({ data }) => {
                setPopularBooks(data.data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const abort = new AbortController();
        setPerRow(4);
        fetchOnSaleBooksData();
        fetchRecommendedBooksData();
        fetchPopularBooksData();
        return () => abort.abort();
    }, []);

    return (
        <>
            {/* <!-- On Sale --> */}

            <div className="container on-sale">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="col part-title">
                        <p>On Sale</p>
                    </div>
                    <div className="col view-all">
                        <Link className="button" to='/shop'>View all <i
                            className="fa fa-caret-right"></i></Link>
                    </div>
                </div>
                {/* <!-- Books Show --> */}
                <div className="row books-show">
                    <Carousel books={onSaleBooks} perRow={perRow}></Carousel>
                </div>
            </div>

            {/* <!-- Featured Books --> */}

            <div className="container featured-books">
                {/* <!-- Part Title --> */}
                <div className="row part-title">
                    <p>Featured Books</p>
                </div>
                {/* <!-- Tabs --> */}
                <div className="row">
                    <Tabs className="tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                        {/* <!-- Tab content --> */}
                        <Tab id="recommended-books" className="tab-link" eventKey={"recommended-books"} title="Recommended">
                            {/* <!-- Books Show --> */}
                            <div className="row books-show">
                                <div className="row page-padding-content books-show-content">
                                    <BookRow books={recommendedBooks} perRow={perRow}></BookRow>
                                </div>
                            </div>
                        </Tab>
                        <Tab id="popular-books" className="tab-link" eventKey={"popular-books"} title="Popular">
                            {/* <!-- Books Show --> */}
                            <div className="row books-show">
                                <div className="row page-padding-content books-show-content">
                                    <BookRow books={popularBooks} perRow={perRow}></BookRow>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Home;