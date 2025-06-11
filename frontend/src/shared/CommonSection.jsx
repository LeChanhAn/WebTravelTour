import React from "react";
import "./common-section.css";
import { Container, Row, Col } from "reactstrap";

// dùng để hiển thị tiêu đề của các phần khác nhau trong ứng dụng
const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12">
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommonSection;
