import { useState } from 'react';

const useFetch = () => {
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return {
    response,
    loading,
    error,
    fetchRequest: async (method, url, params) => {
      setLoading(true);
      await fetch(url, { method, body: JSON.stringify(params) })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setResponse(JSON.parse(res.body));
        })
        .catch((err) => {
          setLoading(false);
          setError(err.toString());
        });
    },
  };
};

export default useFetch;
