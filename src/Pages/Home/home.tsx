import { Container } from "@material-ui/core";
import ButtonAppBar from "../Components/appbar/appbar";
import Header from "../Components/header/header";
import "./home.css";

function Home2() {
  return (
    <div className="main">
      <header>
        <ButtonAppBar />
      </header>
      <div className="back" />
    </div>
  );
}

export default Home2;
