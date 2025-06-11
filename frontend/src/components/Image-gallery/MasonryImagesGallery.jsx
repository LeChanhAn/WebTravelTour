import React from "react";
import galleryImages from "./galleryImages";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// Component MasonryImagesGallery
// - Hiển thị bộ sưu tập ảnh dạng lưới Masonry (masonry gallery)
// - Sử dụng thư viện react-responsive-masonry để tự động chia cột theo kích thước màn hình
// - Lấy danh sách ảnh từ file galleryImages.js và render từng ảnh với style bo góc

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
            className="masonry_img"
            src={item}
            key={index}
            alt=""
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;
