import React from 'react';

const Select = ( {name, label, options, error, ...rest} ) =>{
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} {...rest} className="form-control">
                <option value=""/>
                  {options.map(option => (
                      <option key={option._id} value={option._id}>
                          {option.name}
                      </option>
                  ))}
            </select>
            {error && <dib className="alert alert-danger">{error}</dib>}
        </div>
    )
}

export default Select