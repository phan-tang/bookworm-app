import { React } from "react";
import './pagination.scss';

function Pagination(props) {

    //Function used to change page
    const handleClickButtonPage = (id) => {
        props.handleParams({ "page": id });
    }

    //Function used to get pages for pagination
    const getShowPage = () => {
        if (props.current == 1) {
            return props.links.slice(1, props.links.length - 1).slice(0, 3);
        }
        if (props.current == props.links.length - 2) {
            return props.links.slice(1, props.links.length - 1).slice(props.current - 3, props.curren);
        }
        return props.links.slice(1, props.links.length - 1).slice(props.current - 2, props.current + 1);
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

    return (
        <ul className="pagination">
            <li className={getClassName(props.links[0])} key={"page_previous"}>
                <button className="page-link previous-next" onClick={() => handleClickButtonPage(getPage(props.links[0].label))}>Previous</button>
            </li>
            {getShowPage().map((link) => {
                return (
                    <li className={getClassName(link)} key={"page_" + link.label}>
                        <button className="page-link" onClick={() => handleClickButtonPage(getPage(link.label))}>{link.label}</button>
                    </li>
                );
            })}
            <li className={getClassName(props.links[props.links.length - 1])} key={"page_next"}>
                <button className="page-link previous-next" onClick={() => handleClickButtonPage(getPage(props.links[props.links.length - 1].label))}>Next</button>
            </li>
        </ul>
    );
}

export default Pagination;