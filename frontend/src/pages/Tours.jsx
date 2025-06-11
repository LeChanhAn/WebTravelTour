import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";

import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

// Trang hiển thị danh sách tất cả các tour du lịch

const Tours = () => {
  // State lưu tổng số trang và trang hiện tại
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  // Lấy danh sách tour theo trang từ backend
  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  // Lấy tổng số tour để tính số trang
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  // Tính số trang mỗi khi dữ liệu thay đổi
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8); // 8 tour mỗi trang
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"}></CommonSection>
      <section>
        <Container>
          <Row>
            {/* Thanh tìm kiếm tour */}
            <SearchBar></SearchBar>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {/* Hiển thị trạng thái loading */}
          {loading && (
            <h4 className="text-center pt-5">Loading...............</h4>
          )}
          {/* Hiển thị lỗi nếu có */}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {/* Hiển thị danh sách tour nếu có dữ liệu */}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  {" "}
                  <TourCard tour={tour}></TourCard>
                </Col>
              ))}

              {/* Phân trang */}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active_page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter></Newsletter>
    </>
  );
};

export default Tours;
