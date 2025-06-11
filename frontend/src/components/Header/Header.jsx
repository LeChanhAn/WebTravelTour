import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext";

const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

// Danh sách các link menu chính
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // Hàm logout: xóa user khỏi context và chuyển về trang chủ
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  // Hàm xử lý sticky header khi cuộn trang
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add("sticky_header");
        } else {
          headerRef.current.classList.remove("sticky_header");
        }
      }
    });
  };

  // Kích hoạt sticky header khi component mount
  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  // Hàm toggle menu mobile
  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ===== logo ===== */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/* ===== end logo ===== */}
            {/* === menu === */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-3">
                {/* Các link menu chính */}
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}{" "}
                {/*Liên kết đặt phòng có điều kiện dựa trên vai trò của người dùng*/}
                {user && (
                  <>
                    {user.role === "admin" ? (
                      <li className="nav_item">
                        <NavLink
                          to="/admin/bookings"
                          className={(navClass) =>
                            navClass.isActive ? "active_link" : ""
                          }
                        >
                          Bookings
                        </NavLink>
                      </li>
                    ) : (
                      <li className="nav_item">
                        <NavLink
                          to="/my-bookings"
                          className={(navClass) =>
                            navClass.isActive ? "active_link" : ""
                          }
                        >
                          My Bookings
                        </NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
            {/* === menu end === */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile_menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
