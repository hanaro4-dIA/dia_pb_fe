import { useEffect, useState } from 'react';

type TUseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  fetchData: (overrideBody?: Record<string, any>) => Promise<void>;
};

export default function useFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  initialBody?: Record<string, any>
): TUseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  const fetchData = async (overrideBody?: Record<string, any>) => {
    try {
      const fetchHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${APIKEY}/${url}`, {
        method,
        headers: fetchHeaders,
        credentials: 'include',
        body:
          method !== 'GET'
            ? JSON.stringify(overrideBody || initialBody)
            : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    if (method === 'GET') {
      fetchData();
    }
  }, [url, method, initialBody]);

  return { data, error, fetchData };
}
