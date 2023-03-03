import Header from "../../Components/layout/header";
import Footer from "../../Components/layout/footer";
import "../../app.css";
import "./activities.css";
import ActivityBasicTabs from "../../Components/basicTabs/activityBasicTabs";

function Activities() {
  return (
    <div>
      <Header />
      <div className="content poli">
        <h2 style={{ marginTop: 10 }}>Atividades de Risco</h2>
        <ActivityBasicTabs />
      </div>
      <Footer />
    </div>
  );
}

export default Activities;
