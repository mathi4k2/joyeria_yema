import React from 'react';
import './Button.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    onClick,
    className = '',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...props
}) => {
    const handleClick = (e) => {
        if (!disabled && !loading && onClick) {
            onClick(e);
        }
    };

    const buttonClasses = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        loading ? 'loading' : '',
        disabled ? 'disabled' : '',
        className
    ].filter(Boolean).join(' ');

    const renderIcon = () => {
        if (!icon) return null;
        
        const iconElement = typeof icon === 'string' ? (
            <i className={icon} aria-hidden="true"></i>
        ) : icon;

        return (
            <span className={`btn-icon btn-icon-${iconPosition}`}>
                {iconElement}
            </span>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <span className="sr-only">Cargando</span>
                    <span className="btn-spinner" aria-hidden="true"></span>
                    {children}
                </>
            );
        }

        return (
            <>
                {icon && iconPosition === 'left' && renderIcon()}
                <span className="btn-text">{children}</span>
                {icon && iconPosition === 'right' && renderIcon()}
            </>
        );
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={handleClick}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-busy={loading}
            {...props}
        >
            {renderContent()}
        </button>
    );
};

export default Button; 