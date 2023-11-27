"use client"

export default function Input({className, id, name, type, placeholder, minLength, maxLength, onChange = (e) => {}, required, readOnly}) {
    return (
        <input
            className={className}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            onChange={(e) => onChange(e.currentTarget.value)}
            required={required}
            readOnly={readOnly}
        />
    )
}
