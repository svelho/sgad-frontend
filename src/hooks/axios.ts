import axios from "axios";
import { useEffect, useState } from "react";
import Credentials from "../models/credentials";

const UseAxiosPost = async (
  url: string,
  payload: any,
  headers: any
): Promise<boolean> => {
  const returned = await axios
    .post(url, payload, { headers })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return returned;
};

const UseAxiosDelete = async (url: string, headers: any): Promise<boolean> => {
  const returned = await axios
    .delete(url, { headers })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return returned;
};

const UseAxiosGetWithParameter = async (
  url: string,
  headers: any
): Promise<any> => {
  const returned = await axios
    .get(url, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return returned;
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
export { UseAxiosGet, UseAxiosPost, UseAxiosDelete, UseAxiosGetWithParameter };
