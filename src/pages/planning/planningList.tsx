import "../../app.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import PlanningTable from "../../Components/table/planningTable";
import Planning from "../../models/planning";

function PlanningList() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/v1/planningList`,
    headers
  );

  if (loaded) {
    if (error)
      return (
        <div className="validationError">
          Erro ao tentar realizar a consulta, tente mais tarde!
        </div>
      );
    else return <PlanningTable arrayPlanning={data as unknown as Planning[]} />;
  } else return <Loading />;
}

export default PlanningList;
