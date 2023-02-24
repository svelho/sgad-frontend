import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import DenseTable from "../../Components/denseTable/denseTable";
import "../../app.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";

function Stakeholders() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  console.log(credential.token);

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/users`,
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
          <DenseTable users={data as unknown as Credentials[]} />
        </div>
        <Footer note="Footer Note" />
      </div>
    );
  else
    return (
      <div>
        <Header />
        <div className="content">
          <Loading />
        </div>
        <Footer note="Footer Note" />
      </div>
    );
}

export default Stakeholders;
