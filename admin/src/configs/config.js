const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const API_ROUTES = {
  AUTH: `${BASE_URL}/api/auth`,
  REGISTER: `${BASE_URL}/api/auth2`,
  JOBS: `${BASE_URL}/api/jobs`,
  LOCATIONS: `${BASE_URL}/api/locations`,
  OTP: `${BASE_URL}/api/verify`,
  SUBSCRIPTIONS: `${BASE_URL}/api/subscription`,
  ADMIN_EMPLOYERS: `${BASE_URL}/api/admin/employers`,
  ADMIN_JOBSEEKERS: `${BASE_URL}/api/admin/jobseekers`,
  ADMIN_JOBS: `${BASE_URL}/api/admin/jobs`,
  ADMIN_APPLICANTS: `${BASE_URL}/api/admin/jobs/applicants`,
};

export default API_ROUTES;


