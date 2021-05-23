// TBC
import { useEffect, useState } from "react";

const useFetch = (api, url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return {
    data,
    loading,
    error,
    fetchRequest: async () => {
      await fetch(`${api}/${url}`).then((response) => {
        setLoading(true);
        setData(response);
      });
    },
  };
};
