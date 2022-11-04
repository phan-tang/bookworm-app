import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

function CreateReviewForm(props) {
    const inputTitle = useRef();
    const inputDetail = useRef();
    const inputStar = useRef();

    const handleSubmitForm = (event) => {
        let review = { 'book_id': props.book_id, 'review_title': inputTitle.current.value, 'review_details': inputDetail.current.value, 'rating_start': inputStar.current.value };
        if (review.review_title != "") {
            axios.post('api/create_review', review)
                .then((response) => {
                    console.log(response);
                    toast.success("Thanks for your review!");
                    setTimeout(() => { window.location.reload(false) }, 5000);
                }, (error) => {
                    console.log(error);
                });
        }
        else {
            toast.error("You need to enter review title!");
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="add-title-review" className="form-label">Add a title</label>
                <input type="text" className="form-control" id="add-title-review" required="required" placeholder="" ref={inputTitle} />
            </div>
            <div className="mb-3">
                <label htmlFor="detail-review" className="form-label">Details please! Your review helps other
                    shoppers</label>
                <textarea className="form-control" id="detail-review" rows="3" ref={inputDetail}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="star-review" className="form-label">Select a rating star</label>
                <select className="form-select" defaultValue={"5"} id="star-review" ref={inputStar}>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <button className="button" onClick={() => handleSubmitForm()}>Submit Review</button>
        </>
    );
}

export default CreateReviewForm;