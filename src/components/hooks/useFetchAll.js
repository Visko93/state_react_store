import { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFecth(urls) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    // eslint-disable-next-line
  }, []);

  return { data, error, loading };
}
