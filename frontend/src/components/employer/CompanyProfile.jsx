import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import API_ROUTES from "../../configs/config"; // adjust this path as needed

export default function CompanyProfile() {
    const { employerId } = useParams(); // assuming your route has :employerId
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => {
        navigate("/employer/profile");
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`${API_ROUTES.EMPLOYER}/${employerId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resData = await response.json();
                const emp = resData.data || resData; // adjust depending on your API response format
                setCompany(emp.company);
            } catch (error) {
                console.error("Error fetching company data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (employerId) {
            fetchCompanyData();
        }
    }, [employerId]);

    if (loading) return <div className="mt-8 text-center">Loading...</div>;
    if (!company) return <div className="mt-8 text-center text-red-500">No company data found.</div>;

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
                        <h2 className="mt-2 text-xl font-semibold">{company.name}</h2>
                        <p className="text-sm text-gray-500">{company.email}</p>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Name</strong> : {company.name}</p>
                        <p><strong>Contact</strong> : {company.telephone}</p>
                        <p><strong>Address</strong> : {company.address}</p>
                        <p><strong>Nearest City</strong> : {company.nearestCity}</p>

                        <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                            <p className="text-sm text-justify">
                                <strong>Description</strong> : {company.description}
                            </p>
                        </div>

                        <div className="flex items-center mt-2">
                            <strong className="mr-2">Rating</strong> :
                            <div className="flex space-x-1 text-yellow-400">
                                {[...Array(Math.round(company.rating || 0))].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
                                ))}
                            </div>
                        </div>

                        <p><strong>Authorized Person</strong> : {company.authorizedPerson}</p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            className="px-4 py-1 text-green-700 border border-green-600 rounded hover:bg-green-200"
                            type="button"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700">
                            Edit
                        </button>
                        <button className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-700">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
