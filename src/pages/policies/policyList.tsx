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
    `${process.env.REACT_APP_BACKEND}/v1/policies`,
    headers
  );

  if (loaded) {
    if (error)
      return (
        <div className="validationError">
          Erro ao tentar realizar a consulta, tente mais tarde!
        </div>
      );
    else return <PolicyTable policies={data as unknown as Policy[]} />;
  } else return <Loading />;
}

export default PolicyList;
