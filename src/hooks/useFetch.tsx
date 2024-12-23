import { useEffect, useState } from 'react';

type TUseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  fetchData: (
    overrideBody?: Record<string, any>,
    queryParams?: Record<string, any>
  ) => Promise<void>;
};

export default function useFetch<T>(
  url: string | null,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  initialBody?: Record<string, any>
): TUseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  const appendQueryParams = (
    url: string,
    queryParams?: Record<string, any>
  ) => {
    if (!queryParams) return url;
    const queryString = new URLSearchParams(queryParams).toString();
    return `${url}?${queryString}`;
  };

  const fetchData = async (
    overrideBody?: Record<string, any>,
    queryParams?: Record<string, any>
  ) => {
    if (!url) return;

    try {
      const fetchHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const fullUrl = appendQueryParams(`${APIKEY}${url}`, queryParams);
      const response = await fetch(fullUrl, {
        method,
        headers: fetchHeaders,
        credentials: 'include',
        body:
          method !== 'GET'
            ? JSON.stringify(overrideBody || initialBody)
            : undefined,
      });

      // 302 리디렉션 처리
      if (response.status === 302) {
        throw new Error('302: Redirect error');
      }

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
  if (!url) return { data, error, fetchData };

  useEffect(() => {
    if (method === 'GET' && url) {
      fetchData();
    }
  }, [url, method, initialBody]);

  return { data, error, fetchData };
}
