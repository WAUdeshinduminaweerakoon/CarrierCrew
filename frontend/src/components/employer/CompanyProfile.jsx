import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CompanyProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get employerId from location state or localStorage
    const employerId = location.state?.employerId || localStorage.getItem("userId");

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!employerId) {
            setError("Employer ID not found.");
            setLoading(false);
            return;
        }

        const fetchCompany = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/employers/${employerId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch company");
                }
                const data = await res.json();
                setCompany(data.company || data); // adjust depending on response shape
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, [employerId]);

    const handleBack = () => {
        navigate("/employer/profile");
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-md pb-4 bg-white border border-green-200 shadow-xl rounded-2xl">
                <div className="py-2 text-lg font-semibold text-center text-white bg-green-400 rounded-t-2xl">
                    Company Profile
                </div>
                <div className="p-4 mx-4 mt-4 border border-green-300 rounded-xl">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white bg-green-300 rounded-full">
                            <span>👤</span>
                        </div>
                        <h2 className="mt-2 text-xl font-semibold">{company.name || "N/A"}</h2>
                        <p className="text-sm text-gray-500">{company.email || "No email provided"}</p>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Name</strong> : {company.name || "N/A"}</p>
                        <p><strong>Contact</strong> : {company.telephone || "N/A"}</p>
                        <p><strong>Address</strong> : {company.address || "N/A"}</p>
                        <p><strong>Nearest City</strong> : {company.nearestCity || "N/A"}</p>

                        <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                            <p className="text-sm text-justify">
                                <strong>Description</strong> : {company.description || "No description provided"}
                            </p>
                        </div>

                   <div className="flex items-center mt-2">
                      <strong className="mr-2">Rating</strong>:
                      <div className="flex space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => {
                          const isFilled = i < (company.rating || 0);
                          return (
                            <Star
                              key={i}
                              size={16}
                              fill={isFilled ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth={isFilled ? 1 : 1.5}
                              className={isFilled ? "" : "text-gray-300"}
                            />
                          );
                        })}
                      </div>
                    </div>

                        <p><strong>Authorized Person</strong> : {company.company?.authorizedPerson || "N/A"}</p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            className="px-4 py-1 text-green-700 border border-green-600 rounded hover:bg-green-200"
                            type="button"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700">Edit</button>
                        <button className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
