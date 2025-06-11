import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

//phần đăng ký mail để nhận thông tin
const Newsletter = () => {
  return (
    <section>
      <Container className="newsletter">
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Đăng ký ngay để nhận thông tin du lịch hữu ích.</h2>
              <div className="newsletter_input">
                <input type="email" placeholder="Enter your email " />
                <button className="btn newsletter_btn">Subscribe</button>
              </div>
              <p>
                Bằng cách đăng ký, bạn sẽ nhận được thông tin cập nhật về các
                tour du lịch mới nhất, ưu đãi độc quyền và những bí quyết du
                lịch hữu ích để biến mỗi chuyến đi thành một kỷ niệm đáng nhớ.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter_img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
