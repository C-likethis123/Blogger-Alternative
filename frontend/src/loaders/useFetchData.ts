/**
 * A wrapper for API calls in blogs and posts.
 * Every parameter in the 'dependencies' array must be non-null before a query will be made
 * 
 * If a parameter does not need to be specified before triggering the query, it can be set to undefined.
 * If a parameter needs to be specified, it has to be set to null.
 * 
 * Rationale: majority of parameters to the backend API will be passed directly to the Blogger API.
 * If a value is set to `undefined` in an object, it's implicitly treated as a non-existent value and can be passed directly to the Blogger API to trigger logic when the value is non-existent.
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
    data?: T | null;
    error: Error | null;
};

export function useFetchData<T>(
    fetchFunction: FetchFunction<T>,
    fetchParams: FetchParams,
    dependencies: Dependencies,
    updateData: (data: T) => void // used to update the page if it's ready
): UseFetchDataResult<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const isQueryReady = dependencies.every((dep) => dep !== null);
        if (isQueryReady) {
            setLoading(true);
            fetchFunction(...fetchParams)
                .then((responseData: T) => {
                    updateData(responseData);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, dependencies);

    return { loading, error };
}