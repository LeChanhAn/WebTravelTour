import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button, Alert, Spinner } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import CommonSection from "../shared/CommonSection";
import { Navigate } from "react-router-dom";
import "../styles/my-bookings.css";

// Trang "MyBookings" cho phép người dùng xem, quản lý và hủy các booking tour của chính mình
const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy danh sách booking của user khi component mount
  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  // User protection - chuyển hướng nếu chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Hàm lấy danh sách booking của user từ backend
  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/booking/user`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const result = await res.json();
      setBookings(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý hủy booking
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const res = await fetch(`${BASE_URL}/booking/${bookingId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to cancel booking");
        }

        // Xóa booking khỏi state sau khi hủy thành công
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        alert("Booking cancelled successfully");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Nếu chưa đăng nhập, hiển thị cảnh báo
  if (!user) {
    return (
      <div className="text-center mt-5">
        <Alert color="warning">Please log in to view your bookings.</Alert>
      </div>
    );
  }

  return (
    <>
      <CommonSection title="My Bookings" />
      <section className="my-bookings-section">
        <Container>
          <Row>
            <Col lg="12">
              <div className="booking-header">
                <h2>My Tour Bookings</h2>
                <p>Manage your tour reservations</p>
              </div>

              {/* Hiển thị trạng thái loading */}
              {loading && (
                <div className="text-center">
                  <Spinner color="primary" />
                  <p>Loading your bookings...</p>
                </div>
              )}

              {/* Hiển thị lỗi nếu có */}
              {error && (
                <Alert color="danger">
                  <strong>Error:</strong> {error}
                </Alert>
              )}

              {/* Hiển thị khi không có booking */}
              {!loading && !error && bookings.length === 0 && (
                <Alert color="info">
                  <strong>No bookings found.</strong> You haven't made any tour
                  bookings yet.
                </Alert>
              )}

              {/* Hiển thị bảng booking nếu có */}
              {!loading && !error && bookings.length > 0 && (
                <div className="bookings-table-container">
                  <Table responsive striped hover className="bookings-table">
                    <thead className="table-dark">
                      <tr>
                        <th>Tour Name</th>
                        <th>Full Name</th>
                        <th>Guest Size</th>
                        <th>Phone</th>
                        <th>Booked At</th>
                        <th>Total Price</th>
                        <th>Booking Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <div className="tour-info">
                              <strong>{booking.tourId?.title || "N/A"}</strong>
                              <br />
                              <small className="text-muted">
                                ${booking.tourId?.price || 0}/person
                              </small>
                            </div>
                          </td>
                          <td>{booking.fullName}</td>
                          <td>
                            <span className="guest-size-badge">
                              {booking.guestSize}{" "}
                              {booking.guestSize === 1 ? "person" : "people"}
                            </span>
                          </td>
                          <td>{booking.phone}</td>
                          <td>{formatDate(booking.bookAt)}</td>
                          <td>
                            <strong className="total-price">
                              ${booking.totalPrice}
                            </strong>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(booking.createdAt)}
                            </small>
                          </td>
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleCancelBooking(booking._id)}
                              className="cancel-btn"
                            >
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyBookings;
