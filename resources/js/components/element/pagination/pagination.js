import React from "react";
import './pagination.scss';

function Pagination(props) {

    const getClassName = (link) => {
        let name = "page-item";
        if (link.active == true) {
            name += " active";
        }
        if (link.url == null) {
            name += " disable";
        }
        return name;
    }

    const getLabel = (label) => {
        if (label.includes("Previous")) {
            label = "Previous";
        }
        if (label.includes("Next")) {
            label = "Next";
        }
        return label;
    }

    return (
        <ul className="pagination">
            {props.links.map((link) => {
                return (
                    <li className={getClassName(link)} key={"page_" + getLabel(link.label)}>
                        <button className="page-link">{getLabel(link.label)}</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Pagination;