import { useEffect, useState } from 'react';

type TFetchOptionsProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

type TUseFetchProps<T> = {
  data: T | null;
  error: Error | null;
};

export default function useFetch<T>(
  url: string,
  options?: TFetchOptionsProps,
  token?: string
): TUseFetchProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchHeaders = {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(options?.headers || {}),
        };

        const response = await fetch(`${APIKEY}/${url}`, {
          method: options?.method || 'GET',
          headers: fetchHeaders,
          body: options?.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
          throw new Error(`${response.status} 오류 발생`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, [url, JSON.stringify(options), token]);

  return { data, error };
}
