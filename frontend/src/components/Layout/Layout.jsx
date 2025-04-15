import React from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Routers from "./../router/Routers";
const Layout = () => {
  return (
    <>
      <Header></Header>
      <Routers></Routers>
      <Footer></Footer>
    </>
  );
};

export default Layout;
