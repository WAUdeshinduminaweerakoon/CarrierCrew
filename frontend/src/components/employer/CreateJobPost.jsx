import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewJobForm() {
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState(1);
  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

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
      alert("You must be logged in as an Employer to post a job.");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locations/all");
        const data = await response.json();
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          console.error("Unexpected location data structure", data);
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
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
        const location = `${selectedDistrict} - ${selectedArea}`;
        const response = await fetch("http://localhost:5000/api/jobs/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            location,
            vacancies,
            employerId,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Job posted successfully!");
          navigate("/employer/home");
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error(err);
        alert("Error occurred while submitting the form.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      jobTitle: "",
      dateFrom: "",
      dateTo: "",
      timeFrom: "",
      timeTo: "",
      duration: "",
      payment: "",
      description: "",
    });
    setVacancies(1);
    setSelectedDistrict("");
    setSelectedArea("");
    setErrors({});
  };

  const handleBack = () => navigate("/employer/home");

  const availableAreas =
    locations.find((d) => d.name === selectedDistrict)?.areas || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 rounded-2xl shadow-lg bg-white border border-green-200"
    >
      <div className="flex justify-center items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-green-700">New Job</h2>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center cursor-pointer border border-green-400">
          <span className="text-green-600 text-sm">Image +</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-green-800">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedArea("");
            }}
            className="w-full border border-green-400 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a district</option>
            {locations.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">Area</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            disabled={!selectedDistrict}
            className="w-full border border-green-400 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select an area</option>
            {availableAreas.map((area) => (
              <option key={area._id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
          {errors.area && <p className="text-red-500 text-xs">{errors.area}</p>}
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-green-800">Date From</label>
            <input
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.dateFrom && <p className="text-red-500 text-xs">{errors.dateFrom}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-green-800">Date To</label>
            <input
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.dateTo && <p className="text-red-500 text-xs">{errors.dateTo}</p>}
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-green-800">Time From</label>
            <input
              type="time"
              name="timeFrom"
              value={formData.timeFrom}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.timeFrom && <p className="text-red-500 text-xs">{errors.timeFrom}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-green-800">Time To</label>
            <input
              type="time"
              name="timeTo"
              value={formData.timeTo}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.timeTo && <p className="text-red-500 text-xs">{errors.timeTo}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">Time Duration (Hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">Payment Amount (Rs.)</label>
          <input
            type="number"
            name="payment"
            placeholder="Rs.00000.00"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.payment && <p className="text-red-500 text-xs">{errors.payment}</p>}
        </div>

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
              readOnly
              className="w-20 text-center border border-green-400 rounded px-2 py-1"
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

        <div>
          <label className="block text-sm font-medium text-green-800">More Description</label>
          <textarea
            name="description"
            placeholder="Other Information"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          ></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-green-300 text-green-900 px-4 py-2 rounded font-bold hover:bg-green-400"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-green-400 text-white px-4 py-2 rounded font-bold hover:bg-green-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700"
          >
            Publish
          </button>
        </div>
      </div>
    </form>
  );
}