import React from "react";
import './filterFields.scss';

function FilterFields(props) {

    const displayText = (text) => {
        return text.split(" ").map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    return (
        <>
            <h6>Filter By</h6>
            {
                Object.keys(props.fields).map((key) => {
                    return (
                        <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 card" key={"field_" + key}>
                            <div className="card-body">
                                <h5 className="card-title">{displayText(key)}</h5>
                                {props.fields[key].map((item) => {
                                    return (
                                        <div key={key + "_" + item.id}><button className="button-in-list">{displayText(item[key + "_name"])}</button></div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default FilterFields;