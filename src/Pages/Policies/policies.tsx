import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import "./policies.css";
import Credentials from "../../models/credentials";
import Loading from "../../Components/loading/loading";
import { UseAxiosGet } from "../../hooks/axios";
import BasicTabs from "../../Components/basicTabs/basicTabs";

function Policies() {
  return (
    <div>
      <Header />
      <div className="content poli">
        <BasicTabs />
      </div>
      <Footer note="Footer Note" />
    </div>
  );
}

export default Policies;
