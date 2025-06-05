import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import API_ROUTES from "../../configs/config"; 

export default function EditJobForm() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vacancies, setVacancies] = useState(1);
  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    duration: "",
    payment: "",
    description: "",
  });

  const [employerId, setEmployerId] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if (userType === "Employer" && storedUserId) {
      setEmployerId(storedUserId);
    } else {
      toast.warn("You must be logged in as an Employer to post a job.");
      setTimeout(() => navigate("/"), 3000);
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_ROUTES.LOCATIONS}/all`);
        const data = await response.json();
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to load location data.");
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_ROUTES.CATEGORY}/all`);
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const increaseVacancies = () => setVacancies(vacancies + 1);
  const decreaseVacancies = () => vacancies > 1 && setVacancies(vacancies - 1);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!selectedDistrict) newErrors.district = "District is required";
    if (!selectedArea) newErrors.area = "Area is required";
    if (!formData.dateFrom) newErrors.dateFrom = "Start date is required";
    if (!formData.dateTo) newErrors.dateTo = "End date is required";
    if (!formData.timeFrom) newErrors.timeFrom = "Start time is required";
    if (!formData.timeTo) newErrors.timeTo = "End time is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.payment) newErrors.payment = "Payment is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${API_ROUTES.JOBS}/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            location: selectedArea,
            district: selectedDistrict,
            vacancies,
            employerId,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Job posted successfully!");
          setTimeout(() => navigate("/employer/my-posts"), 1500);
        } else {
          toast.error(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error occurred while submitting the form.");
      }
    }
  };

  const handleCancel = () => navigate("/employer/my-posts");

  const availableAreas = locations.find((d) => d.name === selectedDistrict)?.areas || [];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <header className="bg-green-800 text-white w-full py-4 shadow-md">
        <div className="w-full max-w-screen-sm px-4 flex justify-between items-center text-sm">
          <button className="text-white" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="font-semibold truncate">CareerCrew.LK</h1>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 rounded-2xl shadow-lg bg-white border border-green-200"
      >
        <div className="flex justify-center items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-green-700">Edit Job</h2>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-green-800">Job Title</label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2 mb-2"
          />
          {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
        </div>

        {/* District & Area */}
        <div>
          <label className="block text-sm font-medium text-green-800">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedArea("");
            }}
            className="w-full border border-green-400 rounded px-3 py-2 mb-2"
          >
            <option value="">Select a district</option>
            {locations.map((d) => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">Area</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 mb-2"
          >
            <option value="">Select an area</option>
            {availableAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>

        {/* Date, Time, Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-green-800">Date From</label>
            <input type="date" name="dateFrom" value={formData.dateFrom} onChange={handleChange}
              className="w-full border border-green-400 rounded px-2 py-1" />
            {errors.dateFrom && <p className="text-red-500 text-sm">{errors.dateFrom}</p>}
          </div>
          <div>
            <label className="block text-sm text-green-800">Date To</label>
            <input type="date" name="dateTo" value={formData.dateTo} onChange={handleChange}
              className="w-full border border-green-400 rounded px-2 py-1" />
            {errors.dateTo && <p className="text-red-500 text-sm">{errors.dateTo}</p>}
          </div>
          <div>
            <label className="block text-sm text-green-800">Time From</label>
            <input type="time" name="timeFrom" value={formData.timeFrom} onChange={handleChange}
              className="w-full border border-green-400 rounded px-2 py-1" />
            {errors.timeFrom && <p className="text-red-500 text-sm">{errors.timeFrom}</p>}
          </div>
          <div>
            <label className="block text-sm text-green-800">Time To</label>
            <input type="time" name="timeTo" value={formData.timeTo} onChange={handleChange}
              className="w-full border border-green-400 rounded px-2 py-1" />
            {errors.timeTo && <p className="text-red-500 text-sm">{errors.timeTo}</p>}
          </div>
        </div>

        {/* Duration */}
        <div className="mt-2">
          <label className="block text-sm text-green-800">Duration</label>
          <input name="duration" value={formData.duration} onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2" />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>

        {/* Payment */}
        <div>
          <label className="block text-sm font-medium text-green-800">Payment</label>
          <input
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2"
          />
          {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
        </div>

        {/* Vacancies */}
        <div>
          <label className="block text-sm font-medium text-green-800">No of Vacancies</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={decreaseVacancies}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              -
            </button>
            <input
              type="number"
              value={vacancies}
              onChange={(e) => setVacancies(parseInt(e.target.value) || 1)}
              min={1}
              className="w-16 text-center border border-green-400 rounded px-2 py-1"
            />
            <button
              type="button"
              onClick={increaseVacancies}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-green-800">Job Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-green-400 rounded px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

