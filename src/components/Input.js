const Input = ({name,label,value,error,onChange,placeholder,type}) => {
  return (
    <>
        <div className="mb-3">
                <label htmlFor={name}>{label}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={name} 
                    name={name}
                    placeholder = {placeholder} 
                    value = {value}
                    onChange = {onChange}
                />
            {error && <p className="text-danger error">{error}</p>}
        </div>
     
    </>
  )
}

export default Input