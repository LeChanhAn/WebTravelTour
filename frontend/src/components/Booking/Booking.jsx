import React, { useContext, useState, useEffect, useRef } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const BANK_ID = "Vietcombank";
const ACCOUNT_NO = "1029043839";
const TEMPLATE = "compact2";
const PAYMENT_CHECK_URL = "https://script.google.com/macros/s/AKfycbyIRdgoehgU5HSZCUX3mnCSt3JtP-RLBfaOaSv-385gqq5PNDEGYz3zQv_J2MjazmE5kQ/exec";
const CONVERSION_RATE = 26000; // tỷ giá

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title, _id } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id,
    userEmail: user?.email,
    tourId: _id,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    totalPrice: 0,
  });
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const pollingRef = useRef(null);
  const thresholdRef = useRef(null);
  const submittedRef = useRef(false); // guard to prevent multiple submissions

  useEffect(() => {
    setBooking(prev => ({ ...prev, tourId: _id }));
  }, [_id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking(prev => ({ ...prev, [id]: value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee; // USD
  const amountVND = totalAmount * CONVERSION_RATE;

  const startPaymentCheck = () => {
    thresholdRef.current = new Date();
    setChecking(true);
    submittedRef.current = false;
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(PAYMENT_CHECK_URL);
        const json = await res.json();
        const data = json.data;
        if (!data?.length) return;
        const last = data[data.length - 1];
        const txnAmount = Number(last["Giá trị"]);
        const desc = last["Mô tả"] || "";
        const txnTime = new Date(last["Ngày diễn ra"]);
        if (
          !submittedRef.current &&
          txnAmount === amountVND &&
          desc.includes(user._id) &&
          txnTime > thresholdRef.current
        ) {
          submittedRef.current = true;        
          clearInterval(pollingRef.current);
          setChecking(false);
          submitBooking();
        }
      } catch (err) {
        console.error("Payment check error:", err);
      }
    }, 1000);
  };

  const submitBooking = async () => {
    try {
      const bookingData = { ...booking, totalPrice: totalAmount };
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      } else {
        navigate("/thank-you");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in");
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${amountVND}&addInfo=${user._id}`;
    setQrUrl(qr);
    setShowPaymentInfo(true);
    startPaymentCheck();
  };

  useEffect(() => () => clearInterval(pollingRef.current), []);

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating > 0 && avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={booking.fullName}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              value={booking.phone}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              value={booking.bookAt}
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              min="1"
              value={booking.guestSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <div className="booking_bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  ${price} <i className="ri-close-line"></i> {booking.guestSize} {booking.guestSize > 1 ? "persons" : "person"}
                </h5>
                <span>${price * booking.guestSize}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0">
                <h5>Service charge</h5>
                <span>${serviceFee}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0 total">
                <h5>Total</h5>
                <span>${totalAmount}</span>
              </ListGroupItem>
            </ListGroup>
            <Button type="submit" className="btn primary_btn w-100 mt-4" disabled={checking}>
              {checking ? <><Spinner size="sm" /> Checking payment...</> : "Book Now"}
            </Button>
          </div>
        </Form>
      </div>

      {showPaymentInfo && (
        <div className="payment_info mt-4 text-center">
          <p><strong>Nội dung chuyển khoản:</strong> {user._id}</p>
          <p><strong>Tổng tiền (VND):</strong> {amountVND.toLocaleString()}</p>
          <img src={qrUrl} alt="QR Payment" className="qr_code img-fluid" />
        </div>
      )}
    </div>
  );
};

export default Booking;
