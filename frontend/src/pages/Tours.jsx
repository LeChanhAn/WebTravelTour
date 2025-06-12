import React, { useState, useEffect, useContext } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

// Trang hiển thị danh sách tất cả các tour du lịch, cho phép admin thêm/xóa tour

const Tours = () => {
  const { user } = useContext(AuthContext);

  // State cho phân trang
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  // State cho thêm tour
  const [addModal, setAddModal] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    city: "",
    price: "",
    desc: "",
    distance: "",
    maxGroupSize: "",
    address: "",
    photo: "",
  });

  // Lấy danh sách tour theo trang từ backend
  const {
    data: tours,
    loading,
    error,
    // refetch
  } = useFetch(`${BASE_URL}/tours?page=${page}`);

  // Lấy tổng số tour để tính số trang
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  // Tính số trang mỗi khi dữ liệu thay đổi
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8); // 8 tour mỗi trang
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  // Hàm xóa tour (chỉ admin)
  const handleDeleteTour = async (tourId) => {
    if (!user || user.role !== "admin") return;
    if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      try {
        const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Xóa tour thất bại");
        alert("Đã xóa tour thành công!");
        window.location.reload();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Hàm mở modal thêm tour
  const toggleAddModal = () => setAddModal(!addModal);

  // Hàm xử lý thêm tour (chỉ admin)
  const handleAddTour = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return;
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newTour),
      });
      if (!res.ok) throw new Error("Thêm tour thất bại");
      alert("Đã thêm tour thành công!");
      setAddModal(false);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  // Hàm cập nhật state newTour khi nhập form
  const handleInputChange = (e) => {
    setNewTour({ ...newTour, [e.target.name]: e.target.value });
  };

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
            {/* Nút thêm tour chỉ hiển thị cho admin */}
            {user && user.role === "admin" && (
              <Col lg="12" className="mb-3 d-flex justify-content-end">
                <Button color="primary" onClick={toggleAddModal}>
                  Thêm Tour
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loading...............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                  {/* Nút xóa tour chỉ hiển thị cho admin */}
                  {user && user.role === "admin" && (
                    <Button
                      color="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleDeleteTour(tour._id)}
                    >
                      Xóa
                    </Button>
                  )}
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
      <Newsletter />

      {/* Modal thêm tour */}
      <Modal isOpen={addModal} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>Thêm Tour Mới</ModalHeader>
        <Form onSubmit={handleAddTour}>
          <ModalBody>
            <FormGroup>
              <Label>Tiêu đề</Label>
              <Input
                name="title"
                value={newTour.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Thành phố</Label>
              <Input
                name="city"
                value={newTour.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Giá</Label>
              <Input
                name="price"
                type="number"
                value={newTour.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Mô tả</Label>
              <Input
                name="desc"
                value={newTour.desc}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Khoảng cách (km)</Label>
              <Input
                name="distance"
                type="number"
                value={newTour.distance}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Số lượng nhóm tối đa</Label>
              <Input
                name="maxGroupSize"
                type="number"
                value={newTour.maxGroupSize}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Địa chỉ</Label>
              <Input
                name="address"
                value={newTour.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Ảnh (URL)</Label>
              <Input
                name="photo"
                value={newTour.photo}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Thêm
            </Button>
            <Button color="secondary" onClick={toggleAddModal}>
              Hủy
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Tours;
