import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import ActivityTable from "../../Components/table/activityTable";
import Activity from "../../models/activity";

function ActivityList() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/v1/activities`,
    headers
  );

  if (loaded) {
    if (error)
      return (
        <div className="validationError">
          Erro ao tentar realizar a consulta, tente mais tarde!
        </div>
      );
    else return <ActivityTable activities={data as unknown as Activity[]} />;
    //if (loaded) return <ActivityTable />;
  } else return <Loading />;
}

export default ActivityList;
