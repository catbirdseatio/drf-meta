const InputField = ({
    // eslint-disable-next-line react/prop-types
    name, label, type, placholder, error, fieldRef
}) => <div>
    <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input type={type || 'text'} 
        placeholder={placholder}
        ref={fieldRef}
        name={name}
        />
        <span style={{color: 'red', fontSize: '.75rem'}}>{error}</span>
    </div>
</div>


export default InputField