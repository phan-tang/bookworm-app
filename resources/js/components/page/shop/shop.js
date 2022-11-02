import { React, useEffect, useState } from 'react';
import BookRow from '../../element/bookRow/bookRow';
import FilterFields from '../../element/filterFields/filterFields';
import Pagination from '../../element/pagination/pagination';
import Dropdown from '../../element/dropdown/dropdown';
import './shop.scss';

function Shop() {

    const [filterFields, setFilterFields] = useState([]);
    const [books, setBooks] = useState(null);
    const [params, setParams] = useState({ "sort": "on_sale" });

    //Fields used to sort book
    const sortFields = {
        "show": "Sort by on sale",
        "values": [
            { "display": "Sort by on sale", "params": { "sort": "on_sale" } },
            { "display": "Sort by popularity", "params": { "sort": "popular" } },
            { "display": "Sort by price low to high", "params": { "sort": "price", "order": "asc" } },
            { "display": "Sort by price high to low", "params": { "sort": "price", "order": "desc" } },
        ],
    };

    //Fields used to paginate book
    const showFields = {
        "show": 'Show 15',
        "values": [
            { "display": "Show 25", "params": { "per_page": 25 } },
            { "display": "Show 20", "params": { "per_page": 20 } },
            { "display": "Show 15", "params": { "per_page": 15 } },
            { "display": "Show 5", "params": { "per_page": 5 } },
        ],
    };

    //Function to get filter fields
    const fetchFilterFields = async () => {
        await axios.get('api/filter_fields')
            .then(({ data }) => {
                setFilterFields(data);
            })
            .catch(error => console.log(error));
    }

    //Function to get books
    const fetchBooks = async (api) => {
        await axios.get(api)
            .then(({ data }) => {
                setBooks(data.resource);
                console.log("Fecth");
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const abort = new AbortController();
        fetchFilterFields();
        fetchBooks('api/books?sort=on_sale');
        console.log("render")
        return () => abort.abort();
    }, []);

    //Function to get params apply for api to get list of books
    const getParams = (addParams) => {
        if (addParams != null) {
            let tempParams = params;
            Object.keys(addParams).forEach(key => {
                tempParams[key] = addParams[key];
            });
            setParams(tempParams);
            console.log(params)
            console.log("Change Params");
        }
    }

    //Function to get api to get list of books
    const getAPI = () => {
        let api = 'api/books';
        api += "?";
        Object.keys(params).forEach(key => {
            if (params[key] != null) {
                api += key + "=" + params[key] + "&";
            }
        });
        return api;
    }

    //Function to apply sort and filter for list of books
    const handleChangeParams = (addParams) => {
        getParams(addParams);
        let api = getAPI(params);
        console.log(api);
        fetchBooks(api);
    }

    //Function to display describe books show content
    const displayDescribeBookShowContent = () => {
        if (books != null) {
            return (
                <h6>Showing {books.from}-{books.to} of {books.total} books</h6>
            );
        }
        return (<></>);
    }

    //Function to display books show content
    const displayBooksShowContent = () => {
        if (books != null) {
            return (
                <BookRow books={books.data}></BookRow>
            );
        }
        return (<></>);
    }

    //Function to display pagination
    const displayBooksPagination = () => {
        if (books != null) {
            return (
                <Pagination links={books.links} current={books.current_page}></Pagination>
            );
        }
        return (<></>);
    }

    return (
        <>
            {/* <!-- Shop --> */}

            <div className="container shop">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="part-title">
                        <p>Books</p>
                    </div>
                </div>
                <div className="line"></div>
                {/* <!-- Shop Content --> */}
                <div className="container shop-content">
                    <div className="row">
                        {/* <!-- Filter --> */}
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 filter-book">
                            <FilterFields fields={filterFields} handleParams={handleChangeParams}></FilterFields>
                        </div>
                        {/* <!-- Books Show --> */}
                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 shop-books-show">
                            <div className="row">
                                <div className="col-6 describe-books-show-content">
                                    {displayDescribeBookShowContent()}
                                </div>
                                <div className="col-6 edit-books-show-content">
                                    <Dropdown fields={sortFields} handleParams={handleChangeParams}></Dropdown>
                                    <Dropdown fields={showFields} handleParams={handleChangeParams}></Dropdown>
                                </div>
                            </div>
                            <div className="row books-show">
                                <div className="row books-show-content">
                                    {displayBooksShowContent()}
                                </div>
                                <div className="row books-pagination">
                                    {displayBooksPagination()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;