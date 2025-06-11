import React from "react";

//một React component dùng để hiển thị phụ đề (subtitle) cho các section/phần trên giao diện.
const Subtitle = ({ subtitle }) => {
  return <h3 className="section_subtitle">{subtitle}</h3>;
};

export default Subtitle;
