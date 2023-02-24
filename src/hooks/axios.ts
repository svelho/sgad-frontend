import axios from "axios";
import { useEffect, useState } from "react";

const UseAxiosPost = (url: string, payload: any, headers: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post(url, payload, { headers })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);

  return { data, error, loaded };
};

const UseAxiosGet = (url: string, headers: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(url, { headers })
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);

  return { data, error, loaded };
};

// eslint-disable-next-line import/no-anonymous-default-export
export { UseAxiosGet, UseAxiosPost };
