import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import DenseTable from "../../Components/denseTable/denseTable";
import "../../app.css";
import "./policies.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import BasicTabs from "../../Components/basicTabs/basicTabs";

function Policies() {
  //   const cont1 = new Credentials();
  //   cont1.name = "Saulo";
  //   cont1.email = "sauloinfotec@gmail.com";
  //   var users = [cont1, cont1];

  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  //console.log(credential.token);

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/index`,
    headers
  );

  // const stringifiedData = useMemo(() => {
  //   return JSON.stringify(data || {});
  // }, [data]);

  if (true)
    return (
      <div>
        <Header />
        <div className="content poli">
          <BasicTabs />
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

export default Policies;
