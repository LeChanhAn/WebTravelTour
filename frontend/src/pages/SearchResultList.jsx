import React, { useState } from "react";

import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();
  // ...existing code...
  const [data] = useState(location.state);

  if (!Array.isArray(data)) {
    return <h4 className="text-center">Không có dữ liệu tìm kiếm</h4>;
  }

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4 className="text-center">No tour found</h4>
            ) : (
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
  // ...existing code...
};

export default SearchResultList;
