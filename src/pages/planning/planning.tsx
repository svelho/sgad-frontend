import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import "./planning.css";
import BasicTabs from "../../Components/basicTabs/planningBasicTabs";

function PlanningPage() {
  return (
    <div>
      <Header />
      <div className="content poli">
        <h2 style={{ marginTop: 10 }}>Planejamento</h2>
        <BasicTabs />
      </div>
      <Footer />
    </div>
  );
}

export default PlanningPage;
