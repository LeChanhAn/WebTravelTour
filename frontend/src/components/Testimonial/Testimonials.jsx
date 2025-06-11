import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava01.jpg";
import ava02 from "../../assets/images/ava02.jpg";
import ava03 from "../../assets/images/ava03.jpg";

const Testimonials = () => {
  // Cấu hình cho slider react-slick
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit,
          explicabo provident hic distinctio molestias voluptates nobis alias
          placeat suscipit earum debitis recusandae voluptate illum expedita
          corrupti aliquid doloribus delectus?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Tong Dai</h5>
            <p className="customer">Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit,
          explicabo provident hic distinctio molestias voluptates nobis alias
          placeat suscipit earum debitis recusandae voluptate illum expedita
          corrupti aliquid doloribus delectus?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Chanh An danh dan</h5>
            <p className="customer">Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit,
          explicabo provident hic distinctio molestias voluptates nobis alias
          placeat suscipit earum debitis recusandae voluptate illum expedita
          corrupti aliquid doloribus delectus?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Viet Nam </h5>
            <p className="customer">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit,
          explicabo provident hic distinctio molestias voluptates nobis alias
          placeat suscipit earum debitis recusandae voluptate illum expedita
          corrupti aliquid doloribus delectus?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Chanh An danh dan</h5>
            <p className="customer">Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit,
          explicabo provident hic distinctio molestias voluptates nobis alias
          placeat suscipit earum debitis recusandae voluptate illum expedita
          corrupti aliquid doloribus delectus?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Viet Nam </h5>
            <p className="customer">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
