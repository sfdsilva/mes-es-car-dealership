import { useState } from 'react';

const useFetch = (api, url) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return {
    response,
    loading,
    error,
    fetchRequest: async (method, params) => {
      await fetch(`${api}/${url}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
        .then((res) => {
          const data = res.json();
          setLoading(false);
          setResponse(data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.toString());
        });
    },
  };
};

export default useFetch;
