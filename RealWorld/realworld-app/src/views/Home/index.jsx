import React from "react";
import Banner from "./Banner";
import View from "./View";
import SlideBar from "../../components/SlideBar";

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <View />

          <SlideBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
