import { useEffect, useState } from 'react';

type TUseFetchResult<T> = {
  data: T | null;
  error: Error | null;
};

export default function useFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
): TUseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchHeaders = {
          'Content-Type': 'application/json',
          // 추후 로그인 인증 추가할 것
        };

        const response = await fetch(`${APIKEY}/${url}`, {
          method,
          headers: fetchHeaders,
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
}
