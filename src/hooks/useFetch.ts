import { useState} from "react";

export const useFetch = <T, >() => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);

    const fetchData = async (input: RequestInfo | URL, init?: RequestInit) => {
        try {
            const response = await fetch(input, init);
            const json = await response.json();
            setData(json.data);
            return json.data
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {isLoading, data, error, fetchData};
};