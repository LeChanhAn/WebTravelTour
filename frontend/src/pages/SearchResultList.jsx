import React, { useState } from "react";

import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";

// Trang hiển thị kết quả tìm kiếm tour du lịch

const SearchResultList = () => {
  const location = useLocation();
  // Lưu dữ liệu kết quả tìm kiếm vào state
  const [data] = useState(location.state);

  // Nếu không có dữ liệu (không phải mảng), hiển thị thông báo
  if (!Array.isArray(data)) {
    return <h4 className="text-center">Không có dữ liệu tìm kiếm</h4>;
  }

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {/* Nếu không có tour nào, hiển thị thông báo */}
            {data.length === 0 ? (
              <h4 className="text-center">No tour found</h4>
            ) : (
              // Nếu có tour, hiển thị danh sách tour
              data.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
