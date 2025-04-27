import React from "react";
import "../../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img01.jpg";
import heroImg02 from "../../assets/images/hero-img02.jpg";
import heroVideo from "../../assets/images/hero-video.mp4";
import worldImg from "../../assets/images/world.png";
import Subtitle from "../../shared/Subtitle";

import SearchBar from "../../shared/SearchBar";
import ServiceList from "../../services/ServiceList";

const Home = () => {
  return (
    <>
      {/* ====== hero section start ===== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Đi để Khám phá"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Tạo nên những khoảnh khắc của riêng mình bằng{" "}
                  <span className="highlight">những chuyến đi</span>
                </h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Animi cum neque numquam sequi, earum quam soluta deleniti
                  possimus eveniet sapiente ipsam similique corrupti ea quas
                  incidunt quasi consequatur reiciendis itaque.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services_subtitle">Dịch vụ của chúng tôi</h5>
              <h2 className="services_title">
                Chúng tôi luôn cung cấp dịch vụ tốt nhất
              </h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
