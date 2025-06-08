// RenewStatus.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RenewStatus = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processRenew = async () => {
      if (!state) return navigate("/subscription-plans");

      if (state.success) {
        try {
          await axios.post(API_ROUTES.SUBSCRIPTIONS+"/renew", {
            activeSubscriptionId: state.activeSubscriptionId,
          });
          toast.success("Subscription renewed successfully!");
          setTimeout(() => navigate("/employer/subs-plans"), 2000);
        } catch (err) {
          toast.error("Renewal API failed.");
        }
      } else {
        toast.error("Payment was not successful.");
      }
    };

    processRenew();
  }, [state, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <p className="text-lg font-semibold text-gray-700">Processing...</p>
    </div>
  );
};

export default RenewStatus;
