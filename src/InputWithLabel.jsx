import {useRef, useEffect} from 'react';

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
            <label htmlFor={id}>{children}</label>
            <input
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