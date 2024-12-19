import { useEffect, useState } from 'react';

type TUseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  fetchData?: () => Promise<void>;
};

export default function useFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: Record<string, any>
): TUseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        const response = await fetch(`${APIKEY}/${url}`, {
          method,
          headers: fetchHeaders,
          credentials: 'include',
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const fetchHeaders = {
//         'Content-Type': 'application/json',
//         withCredentials: true,
//       };

//       const response = await fetch(`${APIKEY}/${url}`, {
//         method,
//         headers: fetchHeaders,
//       });
//       const data = await response.json();
//       setData(data);
//     } catch (err) {
//       setError(err as Error);
//     }
//   };
//   fetchData();
// }, [url]);

// return { data, error };
