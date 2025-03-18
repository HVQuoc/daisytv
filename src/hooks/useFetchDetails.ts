import React, { useEffect } from 'react'
import apiClient from '../api/tmdbApi';

interface FetchProps {
    endpoint: string
}
const useFetchDetails = ({endpoint}: FetchProps) => {
    const [data, setData] = React.useState<any>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get(endpoint);
                setData(response.data);
            } catch (err: any) {
                setError(err?.response?.data?.message || err.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

  return {data, isLoading, error};
}

export default useFetchDetails;
