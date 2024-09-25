import {useRef, useEffect} from 'react';
import PropTypes from "prop-types";
import style from "./InputWithLabel.module.css";

// Reusable input field with label component
function InputWithLabel({ id, type, name, value, onChange, children }) {
    // creating a ref to the input element
    const inputRef = useRef();

    // focusing the input field
    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor={id} className={style.label}>{children}</label>
            <input
                className={style.inputField}
                ref={inputRef}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

InputWithLabel.propTypes = {
    children: PropTypes.object,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default InputWithLabel;