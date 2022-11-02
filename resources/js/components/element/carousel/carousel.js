import React from 'react';
import './carousel.scss';
import BookRow from '../bookRow/bookRow';

function Carousel(props) {

    //Function used to display carousel slides
    const displayCarouselItems = (books, perRow) => {
        if (books.length != 0) {
            let items = _.chunk(books, perRow);
            return items.map((booksPerRow, index) => {
                let carouselItemClass = index == 0 ? "carousel-item active" : "carousel-item";
                return (
                    <div className={carouselItemClass} key={index}>
                        <div className="row">
                            <BookRow books={booksPerRow}></BookRow>
                        </div>
                    </div>
                );
            });
        }
    }

    return (
        <>
            {/* <!-- Carousel --> */}
            <div id="carousel-control" className="carousel slide" data-bs-ride="carousel">
                {/* <!-- Carousel Slides--> */}
                <div className="carousel-inner page-padding-content books-show-content">
                    {displayCarouselItems(props.books, props.perRow)}
                </div>
                {/* <!-- Carousel Buttons--> */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel-control" data-bs-slide="prev">
                    <span className="prev-icon" aria-hidden="false"><i className="fa fa-caret-left"></i></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel-control" data-bs-slide="next">
                    <span className="next-icon" aria-hidden="false"><i className="fa fa-caret-right"></i></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}

export default Carousel;