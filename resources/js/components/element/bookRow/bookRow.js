import React from 'react';
import BookCard from '../BookCard/BookCard';

function BookRow(props) {
    return (
        <> {
            props.books && props.books.map((book) => {
                return (<BookCard bookCard={book} key={"book_id_" + book.id + "_author_id" + book.author.id}></BookCard>);
            })
        }
        </>
    );
}

export default BookRow;