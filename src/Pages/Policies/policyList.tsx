import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import PolicyTable from "../../Components/table/policyTable";
import Policy from "../../models/policy";

function PolicyList() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/policies`,
    headers
  );

  if (loaded) return <PolicyTable policies={data as unknown as Policy[]} />;
  //if (loaded) return <PolicyTable />;
  else return <Loading />;
}

export default PolicyList;
