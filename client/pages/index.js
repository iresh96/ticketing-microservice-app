import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return <h1>You are signed In</h1>;
};

Landing.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default Landing;
