import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";

import "../../app.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import StakeholderTable from "../../Components/table/stakeholderTable";

function Stakeholders() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/v1/users`,
    headers
  );

  // const stringifiedData = useMemo(() => {
  //   return JSON.stringify(data || {});
  // }, [data]);

  if (loaded)
    return (
      <div>
        <Header />
        <div className="content">
          <h2 style={{ marginTop: 10, textAlign: "left" }}>Stakeholders</h2>
          <StakeholderTable users={data as unknown as Credentials[]} />
        </div>
        <Footer />
      </div>
    );
  else
    return (
      <div>
        <Header />
        <h2 style={{ marginTop: 10 }}>Stakeholders</h2>
        <div className="content">
          <Loading />
        </div>
        <Footer />
      </div>
    );
}

export default Stakeholders;
