import { useState, useCallback, useRef, useEffect } from 'react';
import { useErrorHandler } from '../utils/errorHandler';
import { VALIDATION_CONFIG } from '../config/constants';

export const useOptimizedForm = (initialValues = {}, validationSchema = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const { validateField } = useErrorHandler();
    const debounceRef = useRef(null);

    // Validación con debounce
    const debouncedValidation = useCallback((name, value) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (validationSchema[name]) {
                const error = validateField(name, value, validationSchema[name]);
                setErrors(prev => ({
                    ...prev,
                    [name]: error
                }));
            }
        }, 300);
    }, [validationSchema, validateField]);

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
            const error = validateField(name, value, validationSchema[name]);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }, [validationSchema, validateField]);

    // Validar todo el formulario
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationSchema).forEach(fieldName => {
            const error = validateField(fieldName, values[fieldName] || '', validationSchema[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [values, validationSchema, validateField]);

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
export const formSchemas = {
    contact: {
        nombre: VALIDATION_CONFIG.contact.nombre,
        email: VALIDATION_CONFIG.contact.email,
        telefono: VALIDATION_CONFIG.contact.telefono,
        asunto: { required: true },
        mensaje: VALIDATION_CONFIG.contact.mensaje
    },
    search: {
        query: { 
            required: true, 
            minLength: 2,
            maxLength: 100
        }
    }
};

export default useOptimizedForm; 