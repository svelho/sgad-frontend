import Credentials from "../models/credentials";

const GetHeader = (token: string = "") => {
  if (token === "") {
    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;
    token = credential.token ?? "";
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  return headers;
};

export default GetHeader;
