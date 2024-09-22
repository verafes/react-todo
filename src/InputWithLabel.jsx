import {useRef, useEffect} from 'react';
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

export default InputWithLabel;