import { useState, useCallback, useRef, useEffect } from 'react';
import { ERROR_MESSAGES } from '../config/constants';

// Reglas de validación predefinidas
const validationRules = {
    required: (value) => value.trim() === '' ? ERROR_MESSAGES.validation.required : '',
    email: (value) => {
        if (!value) return '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? ERROR_MESSAGES.validation.email : '';
    },
    phone: (value) => {
        if (!value) return '';
        const phoneRegex = /^(\+595|595)?[0-9]{8,9}$/;
        return !phoneRegex.test(value) ? ERROR_MESSAGES.validation.phone : '';
    },
    minLength: (min) => (value) => {
        if (!value) return '';
        return value.trim().length < min ? ERROR_MESSAGES.validation.minLength(min) : '';
    },
    maxLength: (max) => (value) => {
        if (!value) return '';
        return value.length > max ? ERROR_MESSAGES.validation.maxLength(max) : '';
    },
    pattern: (regex, message) => (value) => {
        if (!value) return '';
        return !regex.test(value) ? message : '';
    },
    custom: (validator) => validator
};

export const useFormValidation = (initialValues = {}, validationSchema = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const debounceRef = useRef(null);

    // Validar un campo específico
    const validateField = useCallback((name, value) => {
        if (!validationSchema[name]) return '';

        const fieldRules = validationSchema[name];
        let error = '';

        for (const rule of fieldRules) {
            if (typeof rule === 'string') {
                // Regla predefinida
                error = validationRules[rule](value);
            } else if (typeof rule === 'function') {
                // Regla personalizada
                error = rule(value, values);
            } else if (rule.type && validationRules[rule.type]) {
                // Regla con parámetros
                const validator = validationRules[rule.type](rule.value);
                error = validator(value);
            }

            if (error) break;
        }

        return error;
    }, [validationSchema, values]);

    // Validación con debounce
    const debouncedValidation = useCallback((name, value) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (validationSchema[name]) {
                const error = validateField(name, value);
                setErrors(prev => ({
                    ...prev,
                    [name]: error
                }));
            }
        }, 300);
    }, [validationSchema, validateField]);

    // Validar todo el formulario
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationSchema).forEach(fieldName => {
            const error = validateField(fieldName, values[fieldName] || '');
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [values, validationSchema, validateField]);

    // Manejar cambios en los campos
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Validación en tiempo real si el campo ha sido tocado
        if (touched[name]) {
            debouncedValidation(name, value);
        }
    }, [touched, debouncedValidation]);

    // Manejar blur (cuando el campo pierde el foco)
    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validación inmediata en blur
        if (validationSchema[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }, [validationSchema, validateField]);

    // Manejar envío del formulario
    const handleSubmit = useCallback(async (submitFunction) => {
        if (!validateForm()) {
            return false;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await submitFunction(values);
            setSubmitStatus('success');
            return true;
        } catch (error) {
            setSubmitStatus('error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [values, validateForm]);

    // Resetear el formulario
    const resetForm = useCallback((newValues = initialValues) => {
        setValues(newValues);
        setErrors({});
        setTouched({});
        setSubmitStatus(null);
    }, [initialValues]);

    // Establecer un valor específico
    const setValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Establecer un error específico
    const setError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, []);

    // Verificar si el formulario es válido
    const isValid = Object.keys(errors).length === 0 && 
                   Object.keys(validationSchema).every(field => 
                       values[field] && values[field].toString().trim() !== ''
                   );

    // Limpiar debounce al desmontar
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return {
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        submitStatus,
        handleChange,
        handleBlur,
        handleSubmit,
        validateForm,
        resetForm,
        setValue,
        setError,
        setValues,
        setErrors
    };
};

// Esquemas de validación predefinidos
export const validationSchemas = {
    contact: {
        nombre: ['required', { type: 'minLength', value: 2 }, { type: 'pattern', value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo puede contener letras' }],
        email: ['required', 'email'],
        telefono: ['phone'],
        asunto: ['required'],
        mensaje: ['required', { type: 'minLength', value: 10 }]
    },
    login: {
        email: ['required', 'email'],
        password: ['required', { type: 'minLength', value: 6 }]
    },
    register: {
        nombre: ['required', { type: 'minLength', value: 2 }],
        email: ['required', 'email'],
        password: ['required', { type: 'minLength', value: 8 }],
        confirmPassword: ['required', (value, allValues) => 
            value !== allValues.password ? 'Las contraseñas no coinciden' : ''
        ]
    }
};

export default useFormValidation; 