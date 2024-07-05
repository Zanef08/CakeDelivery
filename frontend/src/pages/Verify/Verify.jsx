import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`/api/order/verify`, {
          success,
          orderId,
        });
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate, success, orderId]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
