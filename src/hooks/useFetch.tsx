import { useEffect, useState } from 'react';

type TUseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  fetchData: (overrideBody?: Record<string, any>, queryParams?: Record<string, any>) => Promise<void>;
};

export default function useFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  initialBody?: Record<string, any>
): TUseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  // -- (추가) URL에 쿼리 파라미터를 추가하는 함수
  const appendQueryParams = (url: string, queryParams?: Record<string, any>) => {
    if (!queryParams) return url;
    const queryString = new URLSearchParams(queryParams).toString();
    return `${url}?${queryString}`;
  };
  // --

  // -- (추가) queryParams 추가
  const fetchData = async (overrideBody?: Record<string, any>, queryParams?: Record<string, any>) => {
  // -- 
    try {
      const fetchHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // -- (추가) 쿼리 파라미터가 있으면 URL에 추가
      const fullUrl = appendQueryParams(`${APIKEY}/${url}`, queryParams);
      // --
      const response = await fetch(fullUrl, {
        method,
        headers: fetchHeaders,
        credentials: 'include',
        body: method !== 'GET' ? JSON.stringify(overrideBody || initialBody) : undefined,
      });

      // 302 리디렉션 처리
      if (response.status === 302) {
        throw new Error('Redirect error! The resource has moved.');
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

  useEffect(() => {
    if (method === 'GET') {
      fetchData();
    }
  }, [url, method, initialBody]);

  return { data, error, fetchData };
}