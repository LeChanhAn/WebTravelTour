import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";
import experienceImg from "../assets/images/experience.png";

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

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
                  Mỗi chuyến đi là cơ hội để ta khám phá thế giới và chính bản
                  thân mình. Những trải nghiệm mới mẻ sẽ trở thành ký ức quý
                  giá, làm giàu thêm tâm hồn và cuộc sống của ta.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box hero_video-box mt-4">
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
      {/* featured tour section start */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"}></Subtitle>
              <h2 className="featured_tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList></FeaturedTourList>
          </Row>
        </Container>
      </section>
      {/* ===== featured tour section end ===== */}
      {/* ====== experience section start ====== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  Bằng kinh nghiệm của tôi đang có <br /> Chúng tôi sẽ mang đến
                  cho bạn những chuyến đi tuyệt vời
                </h2>
                <p>
                  Chúng tôi đã có hơn 15 năm kinh nghiệm trong ngành du lịch.
                  <br />
                  Dưới đây là các thành tích của chúng tôi trong suốt thời gian
                  qua.
                </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12k+</span>
                  <h6>successful trip</h6>
                </div>
                <div className="counter_box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter_box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience_img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*====== experience section end ======   */}

      {/* ====== gallery section start ====== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"}></Subtitle>
              <h2 className="gallery_title">
                Tham khảo những khoảnh khắc tuyệt vời
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery></MasonryImagesGallery>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ====== gallery section end ====== */}

      {/* ===== testimonial section start ====*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial_title">
                Khách Hàng đã có những trải nghiệm
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials></Testimonials>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===== testimonial section end ====*/}
      <Newsletter></Newsletter>
    </>
  );
};

export default Home;
