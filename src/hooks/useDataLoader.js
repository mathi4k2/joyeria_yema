import { useState, useEffect, useCallback } from 'react';
import { useErrorHandler } from '../utils/errorHandler';

export const useDataLoader = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleError } = useErrorHandler();

    const loadData = useCallback(async (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchFunction(forceRefresh);
            setData(result);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error loading data:', err);
            }
            const errorMessage = handleError(err, 'dataLoader');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, handleError]);

    const retry = useCallback(() => {
        loadData(true);
    }, [loadData]);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData, ...dependencies]);

    return {
        data,
        loading,
        error,
        retry,
        refetch: loadData
    };
};

export default useDataLoader; 