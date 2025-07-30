import React from 'react';
import './FormField.css';

const FormField = ({
    type = 'text',
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    placeholder,
    options = [],
    rows,
    className = '',
    ...props
}) => {
    const fieldId = id || name;
    const errorId = `${fieldId}-error`;
    const hasError = error && touched;

    const renderField = () => {
        const commonProps = {
            id: fieldId,
            name,
            value,
            onChange,
            onBlur,
            placeholder,
            'aria-describedby': hasError ? errorId : undefined,
            'aria-invalid': !!hasError,
            className: `form-field ${hasError ? 'error' : ''} ${className}`,
            ...props
        };

        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows={rows || 4}
                    />
                );
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">{placeholder || 'Selecciona una opción'}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            default:
                return (
                    <input
                        type={type}
                        {...commonProps}
                    />
                );
        }
    };

    return (
        <div className="form-field-container">
            <label htmlFor={fieldId} className="form-label">
                {label}
                {required && <span aria-label="requerido" className="required-mark">*</span>}
            </label>
            {renderField()}
            {hasError && (
                <div id={errorId} className="error-message" role="alert">
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormField; 