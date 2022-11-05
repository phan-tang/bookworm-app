import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../element/pagination/pagination";
import Dropdown from "../../element/dropdown/dropdown";
import CreateReviewForm from "../../element/reviewForm/reviewForm";
import './product.scss';
import { toast } from "react-toastify";

function Product(props) {

    const { id } = useParams();
    const [book, setBook] = useState();
    const [reviews, setReviews] = useState(null);
    const [filterFields, setFilterFields] = useState([]);
    const [countReviews, setCountReviews] = useState([]);
    const [averageStar, setAverageStar] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [params, setParams] = useState({ "sort": "date", "order": "desc" });

    const sortFields = {
        "show": "Sort by date newest to oldest",
        "values": [
            { "display": "Sort by date newest to oldest", "params": { "sort": "date", "order": "desc" } },
            { "display": "Sort by price oldest to newest", "params": { "sort": "date", "order": "asc" } },
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

    //Function used to get params apply for api to get list of reviews
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

    //Function used to get api to get list of reviews
    const getAPI = () => {
        let api = "api/reviews?id=" + id;
        Object.keys(params).forEach(key => {
            if (params[key] != null) {
                api += "&" + key + "=" + params[key];
            }
        });
        return api;
    }

    //Function used to get date string
    const getDateString = (reviewDate) => {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let date = new Date(reviewDate);
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    //Function used to get filter fields
    const fetchFilterFields = async () => {
        await axios.get('api/filter_fields')
            .then(({ data }) => {
                setFilterFields(data.star);
            })
            .catch(error => console.log(error));
    }

    //Function used to get book by ID
    const fetchBookData = async () => {
        await axios.get('api/book/' + id)
            .then(({ data }) => {
                setBook(data.data);
            })
            .catch(error => console.log(error));
    }

    //Function used to get reviews, count reivews
    const fetchReviews = async (api, fetchCountReviews) => {
        await axios.get(api)
            .then(({ data }) => {
                setReviews(data);
                if (fetchCountReviews == true) {
                    setCountReviews(data.count_reviews);
                    setAverageStar(data.average_rating_star);
                }
            })
            .catch(error => console.log(error));
    }

    //Function used to display part title
    const displayPartTitle = () => {
        if (book != null) {
            return (
                <p>{displayText(book.category.category_name)}</p>
            );
        }
        return (<></>);
    }

    //Function used to display book cover photo
    const displayBookCoverImage = (book) => {
        if (book.book_cover_photo != null) {
            return (<img className="product-image card-img-top" src={'images/' + book.book_cover_photo + '.jpg'} />);
        }
        return (
            <div className='product-image default-book-cover-photo'></div>
        );
    }

    //Function used to display describe book information
    const displayBookInformation = () => {
        if (book != null) {
            return (
                <div className="card">
                    <div className="row product-information">
                        <div className="col-4 product-image-author">
                            {displayBookCoverImage(book)}
                            <p className="produc-author">By (author) | {book.author.author_name}</p>
                        </div>
                        <div className="col-8 product-describe">
                            <h5 className="card-title">{book.book_title}</h5>
                            <p className="card-text">{book.book_summary}</p>
                        </div>
                    </div>
                </div>
            );
        }
        return (<></>);
    }

    //Function used to display text
    const displayText = (text) => {
        return text.split(" ").map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    //Function used to display previous price
    const displayPreviousPrice = () => {
        if (book.discount_amount != 0) {
            return (<span className="previous-price">${book.book_price}</span>);
        }
        return (<></>);
    }

    //Function used to display book price
    const displayBookPrice = () => {
        if (book != null) {
            return (
                <div className="card product-price">
                    <div className="card-header">
                        <h5>{displayPreviousPrice()} <span className="card-title">${book.final_price}</span></h5>
                    </div>
                    <div className="card-body">
                        <div className="row plus-minus-number-input">
                            <div className="col-2">
                                <button onClick={() => handleChangeQuantity("subtract")}>-</button>
                            </div>
                            <span className="col-8 product-quantity">{quantity}</span>
                            <div className="col-2">
                                <button onClick={() => handleChangeQuantity("add")}>+</button>
                            </div>
                        </div>
                        <button className="button" onClick={() => handleClickButtonAddToCart()}>Add to cart</button>
                    </div>
                </div>
            );
        }
        return (<></>);
    }

    //Function used to display average rating star
    const displayAverageStar = () => {
        if (averageStar != 0) {
            return (
                <h4>{averageStar} Star</h4>
            );
        }
        return (<></>);
    }

    //Function used to display reviews show content
    const displayReviewsShowContent = () => {
        if (reviews != null) {
            return (
                <>{
                    reviews.reviews.data.map((review) => {
                        return (
                            <div className="customer-review" key={"review_" + review.id}>
                                <h5>{review.review_title}</h5>
                                <p>{review.review_detail}</p>
                                <p>{getDateString(review.review_date)}</p>
                                <div className="line"></div>
                            </div>
                        );
                    })
                }
                </>
            );
        }
        return (<></>);
    }

    //Function used to display filter fields
    const displayFilterFields = () => {
        if (filterFields != null && countReviews != null) {
            return (
                <>
                    <div className="col-2">
                        <button className="filter-field-review" onClick={() => handleChangeParams({ "star": null })}>{"(" + countReviews[0] + ")"}</button>
                    </div>
                    <div className="col-10">
                        {filterFields.map((field) => {
                            let name = "filter-field-review";
                            if (field.id == params["star"]) {
                                name += " active";
                            }
                            return (<button className={name} key={"filter_field_review_" + field.id} onClick={() => handleChangeParams({ "star": field.id })}>{field.star_name + " (" + countReviews[field.id] + ")"}</button>);
                        })}
                    </div>
                </>
            );
        }
        return (<></>);
    }

    //Function used to display describe reviews show content
    const displayDescribeReviewsShowContent = () => {
        if (reviews != null) {
            if (reviews.reviews.total != 0) {
                return (
                    <h6>Showing {reviews.reviews.from}-{reviews.reviews.to} of {reviews.reviews.total} reviews</h6>
                );
            }
            return (
                <h6>Showing 0 reviews</h6>
            );
        }
        return (<></>);
    }

    //Function used to display pagination
    const displayReviewsPagination = () => {
        if (reviews != null) {
            return (
                <Pagination links={reviews.reviews.links} current={reviews.reviews.current_page} handleParams={handleChangeParams}></Pagination>
            );
        }
        return (<></>);
    }

    //Function used to add book to cart
    const handleClickButtonAddToCart = () => {
        let cart = props.cart;
        const bookInCart = cart.find(({ book_id }) => book_id == id);
        if (bookInCart == undefined) {
            cart.push({ "book_id": id, "title": book.book_title, "author": book.author.author_name, "book_cover_photo": book.book_cover_photo, "quantity": quantity, "final_price": book.final_price, "previous_price": book.book_price });
        }
        else {
            bookInCart.quantity += quantity;
        }
        toast.success("Added to cart!")
        props.setNumberOfBooks();
        props.setCart(cart);
    }

    //Function used to apply sort and filter for list of books
    const handleChangeQuantity = (action) => {
        if (action == "subtract" && quantity != 1) {
            setQuantity(quantity - 1);
        }
        if (action == "add" && quantity != 8) {
            setQuantity(quantity + 1);
        }
    }

    //Function used to apply sort and filter for list of reviews
    const handleChangeParams = (addParams) => {
        getParams(addParams);
        let api = getAPI(params);
        console.log(api);
        fetchReviews(api, false);
    }

    //ComponentDidMount
    useEffect(() => {
        const abort = new AbortController();
        fetchFilterFields();
        fetchBookData();
        fetchReviews("api/reviews?id=" + id + "&sort=date&order=desc", true);
        return () => abort.abort();
    }, []);

    return (
        <>
            {/* <!-- Product --> */}

            <div className="container product">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="part-title">
                        {displayPartTitle()}
                    </div>
                </div>
                <div className="line"></div>
                <div className="product-overview">
                    <div className="row">
                        {/* <!-- Product Information --> */}
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            {displayBookInformation()}
                        </div>
                        {/* <!-- Product Price --> */}
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            {displayBookPrice()}
                        </div>
                    </div>
                    <div className="row">
                        {/* <!-- Product Review --> */}
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Customer Reviews</h5>
                                    {displayAverageStar()}
                                    <div className="row filter-review">
                                        {displayFilterFields()}
                                    </div>
                                    <div className="row">
                                        <div className="col-4 describe-reviews-show-content">
                                            {displayDescribeReviewsShowContent()}
                                        </div>
                                        <div className="col-8 edit-reviews-show-content">
                                            <Dropdown fields={sortFields} handleParams={handleChangeParams}></Dropdown>
                                            <Dropdown fields={showFields} handleParams={handleChangeParams}></Dropdown>
                                        </div>
                                    </div>
                                    <div className="row reviews-show">
                                        {displayReviewsShowContent()}
                                    </div>
                                    <div className="row reviews-pagination">
                                        {displayReviewsPagination()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Product Write Review --> */}
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Write a Review</h5>
                                    <CreateReviewForm book_id={id}></CreateReviewForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;