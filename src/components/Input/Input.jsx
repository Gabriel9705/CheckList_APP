import { useState } from "react";

const Input = ({ type, placeholder, name, className, register, value: initialValue, }) => {
    const [value, setValue] = useState(initialValue);

    let inputProps = {
        type, placeholder, ...register(name),
        onChange: (e) => setValue(e.target.value),
    };

    return (
        <input className={className} {...inputProps} />
    )
};

export default Input;
