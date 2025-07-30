import { renderHook, act, waitFor } from '@testing-library/react';
import { useDataLoader } from './useDataLoader';

// Mock del error handler
jest.mock('../utils/errorHandler', () => ({
    useErrorHandler: () => ({
        handleError: jest.fn((error) => error.message)
    })
}));

describe('useDataLoader', () => {
    const mockFetchFunction = jest.fn();

    beforeEach(() => {
        mockFetchFunction.mockClear();
    });

    test('should initialize with loading state', () => {
        mockFetchFunction.mockResolvedValue('test data');

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
    });

    test('should load data successfully', async () => {
        const testData = { id: 1, name: 'Test' };
        mockFetchFunction.mockResolvedValue(testData);

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toEqual(testData);
        expect(result.current.error).toBe(null);
        expect(mockFetchFunction).toHaveBeenCalledWith(false);
    });

    test('should handle errors', async () => {
        const testError = new Error('Test error');
        mockFetchFunction.mockRejectedValue(testError);

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe('Test error');
    });

    test('should retry loading data', async () => {
        const testData = { id: 1, name: 'Test' };
        mockFetchFunction.mockResolvedValue(testData);

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.retry();
        });

        expect(result.current.loading).toBe(true);
        expect(mockFetchFunction).toHaveBeenCalledWith(true);
    });

    test('should refetch data', async () => {
        const testData = { id: 1, name: 'Test' };
        mockFetchFunction.mockResolvedValue(testData);

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.refetch();
        });

        expect(result.current.loading).toBe(true);
        expect(mockFetchFunction).toHaveBeenCalledWith(false);
    });

    test('should handle dependencies change', async () => {
        const testData = { id: 1, name: 'Test' };
        mockFetchFunction.mockResolvedValue(testData);

        const { result, rerender } = renderHook(
            ({ deps }) => useDataLoader(mockFetchFunction, deps),
            { initialProps: { deps: [1] } }
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Cambiar dependencias
        rerender({ deps: [2] });

        expect(result.current.loading).toBe(true);
        expect(mockFetchFunction).toHaveBeenCalledTimes(2);
    });

    test('should handle force refresh', async () => {
        const testData = { id: 1, name: 'Test' };
        mockFetchFunction.mockResolvedValue(testData);

        const { result } = renderHook(() => useDataLoader(mockFetchFunction));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.refetch(true);
        });

        expect(result.current.loading).toBe(true);
        expect(mockFetchFunction).toHaveBeenCalledWith(true);
    });
}); 