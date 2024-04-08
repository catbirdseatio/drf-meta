import React from "react"

type InputFieldProps = {
    name: string;
    label: string;
    type?: string;
    error?: string;
    placeholder?: string;
    fieldRef: React.MutableRefObject<HTMLInputElement | null>
}

const InputField = ({
    name, label, type, placeholder, error, fieldRef
}: InputFieldProps) => <div>
    <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input type={type || 'text'} 
        placeholder={placeholder}
        ref={fieldRef}
        name={name}
        />
        <span style={{color: 'red', fontSize: '.75rem'}}>{error}</span>
    </div>
</div>


export default InputField