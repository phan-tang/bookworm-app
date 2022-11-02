import { React, useState } from "react";
import './filterFields.scss';

function FilterFields(props) {

    const [filterValue, setFilterValue] = useState({});

    //Function to getField
    const getField = (field) => {
        if (field == "star") {
            return field;
        }
        return field + "_id";
    }

    //Function to display text
    const displayText = (text) => {
        return text.split(" ").map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    //Function to get class name of item
    const getClassName = (id, field) => {
        let filterField = getField(field);
        let name = "button-in-list";
        if (id == filterValue[filterField]) {
            name += " active";
        }
        return name;
    }

    //Function to display delete field button
    const displayDeleteButton = (name, field) => {
        if (name.includes("active")) {
            return (<button className="col-2 button delete-select-value" onClick={() => handleClickButtonDelete(field)}>X</button >);
        }
        return (<></>);
    }

    //Function to handle click button delete filter field for list of books
    const handleClickButtonClearAll = () => {

        //Call function to apply filter with params
        let params = new Object();
        Object.keys(filterValue).map((key) => {
            params[key] = null
        })
        props.handleParams(params);

        //Set filterValue
        setFilterValue({});
        console.log(params)
    }

    //Function to handle click button delete filter field for list of books
    const handleClickButtonDelete = (field) => {
        let filterField = getField(field);

        //Set filterValue
        let tempFilterValue = filterValue;
        tempFilterValue[filterField] = null;
        setFilterValue(tempFilterValue);
        console.log(filterValue)

        //Call function to apply filter with params
        let params = new Object();
        params[filterField] = null
        props.handleParams(params);
    }

    //Function to handle click button apply filter for list of books
    const handleClickButtonItem = (id, field) => {
        let filterField = getField(field);

        //Set filterValue
        let tempFilterValue = filterValue;
        tempFilterValue[filterField] = id;
        setFilterValue(tempFilterValue);
        console.log(filterValue)

        //Call function to apply filter with params
        let params = new Object();
        params[filterField] = id
        props.handleParams(params);
    }

    return (
        <>
            <div className="row filter-by-header">
                <h6 className="col-6">Filter By</h6>
                <div className="col-6 clear-all">
                    <button className="button" onClick={() => handleClickButtonClearAll()}>Clear all</button>
                </div>
            </div>
            <div className="row">
                {
                    Object.keys(props.fields).map((field) => {
                        return (
                            <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 card" key={"field_" + field}>
                                <div className="card-body">
                                    <h5 className="card-title">{displayText(field)}</h5>
                                    {props.fields[field].map((item) => {
                                        let name = getClassName(item.id, field);
                                        return (
                                            <div className="row filter-item" key={field + "_" + item.id}>
                                                <button className={"col-10 " + name} onClick={() => handleClickButtonItem(item.id, field)}>{displayText(item[field + "_name"])}</button>
                                                {displayDeleteButton(name, field)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default FilterFields;