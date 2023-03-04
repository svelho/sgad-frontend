import Footer from "../../Components/layout/footer";
import Header from "../../Components/layout/header";
import BasicTabs from "../../Components/basicTabs/scoreBasicTabs";

// import "./home.css";

function Score() {
  return (
    <div>
      <Header />
      <div className="content poli">
        <h2 style={{ marginTop: 10 }}>Score de Risco</h2>
        <BasicTabs />
      </div>
      <Footer />
    </div>
  );
}

export default Score;
