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
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAllBookings();
    }
  }, [user]);
  useEffect(() => {
    // Filter bookings based on search term
    if (searchTerm) {
      const filtered = bookings.filter(
        (booking) =>
          (booking.fullName &&
            booking.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          getTourName(booking)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (booking.userEmail &&
            booking.userEmail
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (booking.phone && booking.phone.toString().includes(searchTerm))
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchTerm, bookings]);

  // Admin protection - redirect if not admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/admin/bookings`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const result = await res.json();
      console.log("Raw backend response:", result);
      console.log("Bookings data:", result.data);
      setBookings(result.data || []);
      setFilteredBookings(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        // Remove the deleted booking from the state
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        alert("Booking deleted successfully");
      } catch (err) {
        alert(err.message);
      }
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Helper function to get tour name from booking
  const getTourName = (booking) => {
    // Get tour name from populated tourId
    if (
      booking.tourId &&
      typeof booking.tourId === "object" &&
      booking.tourId.title
    ) {
      return booking.tourId.title;
    }

    // Fallback for unpopulated tourId
    if (booking.tourId && typeof booking.tourId === "string") {
      return `Tour ID: ${booking.tourId}`;
    }

    return "N/A";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTotalRevenue = () => {
    return filteredBookings.reduce(
      (total, booking) => total + (booking.totalPrice || 0),
      0
    );
  };

  return (
    <>
      <CommonSection title="All Bookings" />
      <section className="admin-bookings-section">
        <Container>
          <Row>
            <Col lg="12">
              {" "}
              <div className="booking-header">
                <h2>All Bookings</h2>
                <p>Manage all customer tour bookings</p>
              </div>
              {/* Summary Stats */}
              <Row className="mb-4">
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>{filteredBookings.length}</h4>
                    <p>Total Bookings</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>${calculateTotalRevenue().toLocaleString()}</h4>
                    <p>Total Revenue</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>
                      {filteredBookings.reduce(
                        (total, booking) => total + booking.guestSize,
                        0
                      )}
                    </h4>
                    <p>Total Guests</p>
                  </div>
                </Col>
                <Col md="3" className="mb-3">
                  <div className="stat-card">
                    <h4>
                      $
                      {filteredBookings.length > 0
                        ? Math.round(
                            calculateTotalRevenue() / filteredBookings.length
                          )
                        : 0}
                    </h4>
                    <p>Avg per Booking</p>
                  </div>
                </Col>
              </Row>
              {/* Search Section */}
              <Row className="mb-4">
                <Col md="8">
                  <Input
                    type="text"
                    placeholder="Search by customer name, tour, email, or phone..."
                    value={searchTerm}
                    onChange={handleSearchChange}
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
              {/* Loading State */}
              {loading && (
                <div className="text-center">
                  <Spinner color="primary" />
                  <p>Loading bookings...</p>
                </div>
              )}
              {/* Error State */}
              {error && <Alert color="danger">{error}</Alert>}
              {/* Bookings Table */}
              {!loading && !error && filteredBookings.length > 0 && (
                <div className="bookings-table-container">
                  <Table responsive striped className="bookings-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Tour Information</th>
                        <th>Guests size</th> <th>Phone number</th>
                        <th>Travel Date</th>
                        <th className="text-center">Total Amount</th>
                        <th>Booking Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>{" "}
                    <tbody>
                      {filteredBookings.map((booking) => {
                        console.log("Individual booking:", booking);
                        return (
                          <tr key={booking._id}>
                            {" "}
                            <td>
                              <strong>{booking.fullName}</strong>
                            </td>{" "}
                            <td>
                              <div className="tour-info">
                                <strong>{getTourName(booking)}</strong>
                                <br />{" "}
                                <small className="text-muted">
                                  ${booking.tourId?.price || 0} per person
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
                            </td>{" "}
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
                                Delete{" "}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
              {/* Empty State */}
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
