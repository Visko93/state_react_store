import { useState, useEffect, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFecth(url) {
  const isMountedRef = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMountedRef.current = true;

    async function init() {
      try {
        if (isMountedRef.current) {
          const res = await fetch(baseUrl + url);
          if (res.ok) {
            const json = await res.json();
            setData(json);
          } else {
            throw res;
          }
        }
      } catch (e) {
        if (isMountedRef.current) {
          setError(e);
        }
      } finally {
        if (isMountedRef.current) {
          isMountedRef.current = false;
          setLoading(false);
        }
      }
    }
    init();

    return () => {
      isMountedRef.current = false;
    };
  }, [url]);

  return { data, error, loading };
}
