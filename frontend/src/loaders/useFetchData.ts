/**
 * A wrapper for API calls in blogs and posts.
 * Everything in the 'dependencies' must be non-null/non-undefined before a query will be made
 * 
 * If a parameter does not need to be specified before triggering the query, it can be set to undefined.
 * If a parameter needs to be specified, it can be set to null.
 */
import React, { useState, useEffect } from 'react';

// Define a type for the fetch function
type FetchFunction<T> = (...args: any[]) => Promise<T>;

// Define a type for the parameters of the fetch function
type FetchParams = any[];

// Define a type for the dependencies array
type Dependencies = any[];

// Define a type for the return value of useFetchData hook
type UseFetchDataResult<T> = {
    loading: boolean;
    data: T | null;
    error: Error | null;
};

export function useFetchData<T>(
    fetchFunction: FetchFunction<T>,
    fetchParams: FetchParams,
    dependencies: Dependencies
): UseFetchDataResult<T> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const isQueryReady = dependencies.every((dep) => dep != null);
        if (isQueryReady) {
            setLoading(true);
            fetchFunction(...fetchParams)
                .then((responseData: T) => {
                    setData(responseData);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, dependencies);

    return { loading, data, error };
}