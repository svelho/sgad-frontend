import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import "./policies.css";
import PolicyBasicTabs from "../../Components/basicTabs/policyBasicTabs";

function Policies() {
  return (
    <div>
      <Header />
      <div className="content poli">
        <h2 style={{ marginTop: 10 }}>Política Ambiental</h2>
        <PolicyBasicTabs />
      </div>
      <Footer />
    </div>
  );
}

export default Policies;
