import Credentials from "../../models/credentials";

function Home2() {
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;
  return <div>{credential.email}</div>;
}

export default Home2;
