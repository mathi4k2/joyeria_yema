import { renderHook, act } from '@testing-library/react';
import { useFormValidation, validationSchemas } from './useFormValidation';

describe('useFormValidation', () => {
    const mockValidationSchema = {
        email: ['required', 'email'],
        password: ['required', { type: 'minLength', value: 6 }]
    };

    beforeEach(() => {
        // Limpiar localStorage antes de cada test
        localStorage.clear();
    });

    test('should initialize with default values', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: '', password: '' }, mockValidationSchema)
        );

        expect(result.current.values).toEqual({ email: '', password: '' });
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.isValid).toBe(false);
    });

    test('should validate required fields', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: '', password: '' }, mockValidationSchema)
        );

        act(() => {
            result.current.validateForm();
        });

        expect(result.current.errors.email).toBe('Este campo es requerido');
        expect(result.current.errors.password).toBe('Este campo es requerido');
    });

    test('should validate email format', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: 'invalid-email', password: '123456' }, mockValidationSchema)
        );

        act(() => {
            result.current.handleChange({ target: { name: 'email', value: 'invalid-email' } });
            result.current.handleBlur({ target: { name: 'email', value: 'invalid-email' } });
        });

        expect(result.current.errors.email).toBe('Ingresa un email válido');
    });

    test('should validate minLength', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: 'test@test.com', password: '123' }, mockValidationSchema)
        );

        act(() => {
            result.current.handleChange({ target: { name: 'password', value: '123' } });
            result.current.handleBlur({ target: { name: 'password', value: '123' } });
        });

        expect(result.current.errors.password).toBe('Debe tener al menos 6 caracteres');
    });

    test('should handle valid input', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: 'test@test.com', password: '123456' }, mockValidationSchema)
        );

        act(() => {
            result.current.handleChange({ target: { name: 'email', value: 'test@test.com' } });
            result.current.handleBlur({ target: { name: 'email', value: 'test@test.com' } });
            result.current.handleChange({ target: { name: 'password', value: '123456' } });
            result.current.handleBlur({ target: { name: 'password', value: '123456' } });
        });

        expect(result.current.errors.email).toBe('');
        expect(result.current.errors.password).toBe('');
        expect(result.current.isValid).toBe(true);
    });

    test('should reset form', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: 'test@test.com', password: '123456' }, mockValidationSchema)
        );

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.values).toEqual({ email: 'test@test.com', password: '123456' });
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
    });

    test('should set specific value', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: '', password: '' }, mockValidationSchema)
        );

        act(() => {
            result.current.setValue('email', 'new@email.com');
        });

        expect(result.current.values.email).toBe('new@email.com');
    });

    test('should set specific error', () => {
        const { result } = renderHook(() => 
            useFormValidation({ email: '', password: '' }, mockValidationSchema)
        );

        act(() => {
            result.current.setError('email', 'Custom error message');
        });

        expect(result.current.errors.email).toBe('Custom error message');
    });
});

describe('validationSchemas', () => {
    test('should have contact schema', () => {
        expect(validationSchemas.contact).toBeDefined();
        expect(validationSchemas.contact.nombre).toBeDefined();
        expect(validationSchemas.contact.email).toBeDefined();
        expect(validationSchemas.contact.telefono).toBeDefined();
        expect(validationSchemas.contact.asunto).toBeDefined();
        expect(validationSchemas.contact.mensaje).toBeDefined();
    });

    test('should have login schema', () => {
        expect(validationSchemas.login).toBeDefined();
        expect(validationSchemas.login.email).toBeDefined();
        expect(validationSchemas.login.password).toBeDefined();
    });

    test('should have register schema', () => {
        expect(validationSchemas.register).toBeDefined();
        expect(validationSchemas.register.nombre).toBeDefined();
        expect(validationSchemas.register.email).toBeDefined();
        expect(validationSchemas.register.password).toBeDefined();
        expect(validationSchemas.register.confirmPassword).toBeDefined();
    });
}); 