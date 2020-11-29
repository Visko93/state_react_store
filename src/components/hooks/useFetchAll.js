import { useState, useEffect, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFecth(urls) {
  const prevUrls = useRef([]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (areEqualsArrays(prevUrls.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { data, error, loading };
}

function areEqualsArrays(arr1: Array, arr2: Array) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}
