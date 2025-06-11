import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

// Mô tả dữ liệu dịch vụ

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Dự báo thời tiết",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    imgUrl: guideImg,
    title: "Hướng dẫn viên du lịch",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    imgUrl: customizationImg,
    title: "Lựa chọn cá nhân",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
];
const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
