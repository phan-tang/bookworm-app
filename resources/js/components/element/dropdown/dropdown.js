import { React, useState } from "react";
function Dropdown(props) {

    const [show, setShow] = useState(props.fields.show);

    //Function to handle click button apply sort or show for list of books
    const handleClickButtonItem = (field) => {
        setShow(field.display);
        props.handleParams(field.params);
    }

    return (
        <span className="dropdown">
            <button className="dropdown-button button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {show} <i className="fa fa-caret-down"></i>
            </button>
            <ul className="dropdown-menu">
                {props.fields.values.map((field) => {
                    return (<li key={field.display.toLowerCase().replace(" ", "_")}><button className="button-in-list" onClick={() => handleClickButtonItem(field)}>{field.display}</button></li>);
                })}
            </ul>
        </span>
    );
}

export default Dropdown;