import { useState, useEffect } from "react";

const useFetch = (url) => {
  // State lưu dữ liệu trả về từ API
  const [data, setData] = useState([]);
  // State lưu thông báo lỗi nếu có
  const [error, setError] = useState(null);
  // State kiểm soát trạng thái loading
  const [loading, setLoading] = useState(false);

  // useEffect sẽ chạy mỗi khi URL thay đổi
  useEffect(() => {
    // Hàm fetch dữ liệu từ API
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError("failed to fetch");
        }
        const result = await res.json();

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Trả về object chứa data, error, loading để component sử dụng
  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
