import React from "react";
import Banner from "./Banner";
import View from "./View";

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <View />
        </div>
      </div>
    </div>
  );
};

export default Home;
