const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const PAYMENT_GATEWAY = "http://localhost:5001";

const API_ROUTES = {
  AUTH: `${BASE_URL}/api/auth`,
  REGISTER: `${BASE_URL}/api/auth2`,
  JOBS: `${BASE_URL}/api/jobs`,
  LOCATIONS: `${BASE_URL}/api/locations`,
  OTP: `${BASE_URL}/api/verify`,
  SUBSCRIPTIONS: `${BASE_URL}/api/subscription`,
  CATEGORY : `${BASE_URL}/api/category`,
  PAYMENT : `${PAYMENT_GATEWAY}/api/payment`,
  ACCOUNT :  `${BASE_URL}/api/auth/account`,
};

export default API_ROUTES;


