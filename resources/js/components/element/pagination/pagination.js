import { React } from "react";
import './pagination.scss';

function Pagination(props) {

    //Function used to change page
    const handleClickButtonPage = (id) => {
        props.handleParams({ "page": id });
    }

    //Function used to get id page for item
    const getPage = (label) => {
        if (label.includes("Previous")) {
            return props.current - 1;
        }
        if (label.includes("Next")) {
            return props.current + 1;
        }
        return label;
    }

    //Function used to get class name for item
    const getClassName = (link) => {
        let name = "page-item";
        if (link.active == true) {
            name += " active";
        }
        if (link.url == null) {
            name += " disabled";
        }
        return name;
    }

    //Function used to get label show for item
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
                        <button className="page-link" onClick={() => handleClickButtonPage(getPage(link.label))}>{getLabel(link.label)}</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Pagination;