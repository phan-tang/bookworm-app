import React from 'react';
import BookCard from '../BookCard/BookCard';

function BookRow(props) {
    return (
        <> {
            props.books && props.books.map((book) => {
                return (<BookCard bookCard={book} key={"book_" + book.id}></BookCard>);
            })
        }
        </>
    );
}

export default BookRow;