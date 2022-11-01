import { React } from "react";

function Dropdown(props) {

    return (
        <span className="dropdown">
            <button className="dropdown-button button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.fields.show} <i className="fa fa-caret-down"></i>
            </button>
            <ul className="dropdown-menu">
                {props.fields.values.map((field) => {
                    return (<li key={field.display.toLowerCase().replace(" ", "_")}><button className="button-in-list">{field.display}</button></li>);
                })}
            </ul>
        </span>
    );
}

export default Dropdown;