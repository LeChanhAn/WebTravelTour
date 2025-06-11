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
    desc: "Cập nhật thông tin thời tiết mới nhất giúp bạn chuẩn bị tốt cho chuyến đi. Nhớ để ý nhé!",
  },
  {
    imgUrl: guideImg,
    title: "Hướng dẫn viên du lịch",
    desc: "Đội ngũ hướng dẫn viên chuyên nghiệp, nhiệt tình đồng hành cùng bạn trên mọi hành trình.",
  },
  {
    imgUrl: customizationImg,
    title: "Lựa chọn cá nhân",
    desc: "Dịch vụ linh hoạt, cho phép bạn tùy chỉnh lịch trình và trải nghiệm theo sở thích cá nhân.",
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
