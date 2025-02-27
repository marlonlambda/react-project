import { useState, useEffect, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

export const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setdata(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};


