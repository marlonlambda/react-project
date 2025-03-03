import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "../api/api";

axios.defaults.baseURL = "http://localhost:8000/api/";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(url);
      setData(res.data);
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

  const refresh = () => {
    fetchData();
  };

  return { data, error, loading, refresh };
};
