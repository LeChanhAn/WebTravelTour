// Trang quản lý booking dành cho admin

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Alert,
  Spinner,
  Input,
} from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import CommonSection from "../shared/CommonSection";
import { Navigate } from "react-router-dom";
import "../styles/admin-bookings.css";

const AdminBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy danh sách booking khi user là admin
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAllBookings();
    }
    // eslint-disable-next-line
  }, [user]);

  // Lấy tất cả booking từ backend
  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/admin/bookings`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const result = await res.json();
      setBookings(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa booking
  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const res = await fetch(`${BASE_URL}/admin/booking/${bookingId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to delete booking");
        }
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        alert("Booking deleted successfully");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Lọc booking theo searchTerm
  const filteredBookings = bookings.filter((booking) => {
    const tourName =
      typeof booking.tourId === "object" && booking.tourId?.title
        ? booking.tourId.title
        : "";
    return (
      (booking.fullName &&
        booking.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tourName && tourName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.userEmail &&
        booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.phone && booking.phone.toString().includes(searchTerm))
    );
  });

  // Format ngày
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Thống kê
  const totalRevenue = filteredBookings.reduce(
    (total, b) => total + (b.totalPrice || 0),
    0
  );
  const totalGuests = filteredBookings.reduce(
    (total, b) => total + (b.guestSize || 0),
    0
  );
  const avgPerBooking =
    filteredBookings.length > 0
      ? Math.round(totalRevenue / filteredBookings.length)
      : 0;

  // Chỉ cho admin truy cập
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;

  return (
    <>
      <CommonSection title="Manage Bookings" />
      <section className="admin-bookings-section">
        <Container>
          <Row>
            <Col lg="12">
              <div className="booking-header">
                <h2>All Bookings</h2>
                <p>Manage all customer tour bookings</p>
              </div>
              {/* Thống kê nhanh */}
              <Row className="mb-4">
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>{filteredBookings.length}</h4>
                    <p>Total Bookings</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>${totalRevenue.toLocaleString()}</h4>
                    <p>Total Revenue</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>{totalGuests}</h4>
                    <p>Total Guests</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>${avgPerBooking}</h4>
                    <p>Avg per Booking</p>
                  </div>
                </Col>
              </Row>
              {/* Tìm kiếm */}
              <Row className="mb-4">
                <Col md="8">
                  <Input
                    type="text"
                    placeholder="Search by customer name, tour, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </Col>
                <Col md="4" className="d-flex align-items-center">
                  <div className="results-summary">
                    <p className="mb-0">
                      <strong>
                        {filteredBookings.length === bookings.length
                          ? `Total: ${bookings.length} bookings`
                          : `Showing: ${filteredBookings.length} of ${bookings.length} bookings`}
                      </strong>
                    </p>
                    {searchTerm && (
                      <Button
                        color="secondary"
                        size="sm"
                        outline
                        onClick={() => setSearchTerm("")}
                        className="mt-2"
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
              {/* Loading */}
              {loading && (
                <div className="text-center">
                  <Spinner color="primary" />
                  <p>Loading bookings...</p>
                </div>
              )}
              {/* Error */}
              {error && <Alert color="danger">{error}</Alert>}
              {/* Bảng bookings */}
              {!loading && !error && filteredBookings.length > 0 && (
                <div className="bookings-table-container">
                  <Table responsive striped className="bookings-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Tour Information</th>
                        <th>Guests size</th>
                        <th>Phone number</th>
                        <th>Travel Date</th>
                        <th className="text-center">Total Amount</th>
                        <th>Booking Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <strong>{booking.fullName}</strong>
                          </td>
                          <td>
                            <div className="tour-info">
                              <strong>
                                {typeof booking.tourId === "object" &&
                                booking.tourId?.title
                                  ? booking.tourId.title
                                  : `Tour ID: ${booking.tourId}`}
                              </strong>
                              <br />
                              <small className="text-muted">
                                $
                                {typeof booking.tourId === "object"
                                  ? booking.tourId.price || 0
                                  : 0}{" "}
                                per person
                              </small>
                            </div>
                          </td>
                          <td>
                            <span className="guest-size-badge">
                              {booking.guestSize}{" "}
                              {booking.guestSize === 1 ? "guest" : "guests"}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`tel:${booking.phone}`}
                              className="phone-link"
                            >
                              {booking.phone}
                            </a>
                          </td>
                          <td>
                            <strong>{formatDate(booking.bookAt)}</strong>
                          </td>
                          <td className="text-center">
                            <strong className="total-price">
                              ${(booking.totalPrice || 0).toLocaleString()}
                            </strong>
                          </td>
                          <td>
                            <small>{formatDate(booking.createdAt)}</small>
                          </td>
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDeleteBooking(booking._id)}
                              title="Delete booking"
                              className="cancel-btn"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              {/* Không có booking */}
              {!loading && !error && filteredBookings.length === 0 && (
                <Alert color="info" className="text-center">
                  {searchTerm
                    ? "No bookings found matching your search criteria."
                    : "No bookings found."}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminBookings;
