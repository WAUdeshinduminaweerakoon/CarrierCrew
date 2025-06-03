// Enhanced GeneralSettings.js UI with left navigation and dynamic right content
import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import API_ROUTES from "../configs/config";

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const GeneralSettings = () => {
  const [activeTab, setActiveTab] = useState("adminAccounts");

  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");

  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlanFormVisible, setNewPlanFormVisible] = useState(false);

  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfAddsPerMonth, setNumberOfAddsPerMonth] = useState("");
  const [additionalCharacteristics, setAdditionalCharacteristics] = useState([""]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch(API_ROUTES.SUBSCRIPTIONS+"/subscription-plans");
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans", err);
    }
  };

  const resetLocationForm = () => {
    setDistrict("");
    setArea("");
  };

  const handleAddLocation = async () => {
    if (!district || !area) {
      alert("Please fill in both district and area");
      return;
    }
    try {
      const response = await fetch(API_ROUTES.LOCATIONS+"/add-area", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district, area }),
      });
      const data = await response.json();
      if (!response.ok) alert(`Error: ${data.error}`);
      else {
        alert("Area added successfully!");
        resetLocationForm();
      }
    } catch (error) {
      alert("Something went wrong while adding the area");
      console.error(error);
    }
  };

  const resetPlanForm = () => {
    setPlanName("");
    setPrice("");
    setNumberOfAddsPerMonth("");
    setAdditionalCharacteristics([""]);
    setEditingPlan(null);
  };

  const handleSavePlan = async () => {
    if (!planName || !price || !numberOfAddsPerMonth) {
      alert("Please fill in all required fields");
      return;
    }
    const payload = {
      planName,
      price: parseFloat(price),
      numberOfAddsPerMonth: parseInt(numberOfAddsPerMonth),
      additionalCharacteristics: additionalCharacteristics.filter((c) => c.trim() !== ""),
    };
    const url = editingPlan
      ? `${API_ROUTES.SUBSCRIPTIONS}/subscription-plan/${editingPlan._id}`
      : (API_ROUTES.SUBSCRIPTIONS+"/add-subscription-plans");
    const method = editingPlan ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) alert(`Error: ${data.error}`);
      else {
        alert(`Plan ${editingPlan ? "updated" : "created"} successfully`);
        resetPlanForm();
        setNewPlanFormVisible(false);
        fetchPlans();
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800">CareerCrew.LK</h1>
        </div>
        <button
          className="text-gray-600 hover:text-blue-600 flex items-center"
          onClick={() => window.location.href = "/admin"}
        >
          <HomeIcon className="h-5 w-5 mr-1" /> Home
        </button>
      </header>

      <div className="flex flex-grow">
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Settings</h2>
          <ul className="space-y-2">
            <li><button className={`block w-full text-left ${activeTab === 'adminAccounts' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('adminAccounts')}>Manage Admin Accounts</button></li>
            <li><button className={`block w-full text-left ${activeTab === 'subscriptionPlans' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('subscriptionPlans')}>Manage Subscription Plans</button></li>
            <li><button className={`block w-full text-left ${activeTab === 'locations' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`} onClick={() => setActiveTab('locations')}>Manage Locations</button></li>
          </ul>
        </aside>

        <main className="flex-grow p-8 bg-gray-100">
          {activeTab === 'adminAccounts' && <div className="text-gray-700">Admin account management content goes here.</div>}

          {activeTab === 'locations' && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Add New Location</h2>
              <label className="block mb-2">District
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="block w-full p-2 border rounded">
                  <option value="">Select a district</option>
                  {districts.map((dist) => <option key={dist} value={dist}>{dist}</option>)}
                </select>
              </label>
              <label className="block mb-4">Area
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="block w-full p-2 border rounded" placeholder="Enter area/subarea" />
              </label>
              <div className="flex gap-4">
                <button onClick={handleAddLocation} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                <button onClick={resetLocationForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Reset</button>
              </div>
            </div>
          )}

          {activeTab === 'subscriptionPlans' && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
              {plans.length === 0 ? (
                <p>No plans available.</p>
              ) : (
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan._id} className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">{plan.planName}</h3>
                      <p>Price: Rs. {plan.price}</p>
                      <p>Ads/Month: {plan.numberOfAddsPerMonth}</p>
                      <ul className="list-disc ml-6">
                        {plan.additionalCharacteristics.map((char, i) => <li key={i}>{char}</li>)}
                      </ul>
                      <button onClick={() => {
                        setEditingPlan(plan);
                        setPlanName(plan.planName);
                        setPrice(plan.price);
                        setNumberOfAddsPerMonth(plan.numberOfAddsPerMonth);
                        setAdditionalCharacteristics(plan.additionalCharacteristics);
                        setNewPlanFormVisible(true);
                      }} className="text-blue-600 underline mt-2 block">Edit</button>
                    </div>
                  ))}
                </div>
              )}

              {!newPlanFormVisible && <button onClick={() => { resetPlanForm(); setNewPlanFormVisible(true); }} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Add New Plan</button>}

              {newPlanFormVisible && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">{editingPlan ? "Edit Plan" : "Add New Plan"}</h3>
                  <input className="block w-full mb-2 p-2 border rounded" placeholder="Plan Name" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                  <input className="block w-full mb-2 p-2 border rounded" type="number" placeholder="Price (LKR)" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <input className="block w-full mb-2 p-2 border rounded" type="number" placeholder="Ads/Month" value={numberOfAddsPerMonth} onChange={(e) => setNumberOfAddsPerMonth(e.target.value)} />
                  {additionalCharacteristics.map((char, i) => (
                    <input key={i} className="block w-full mb-2 p-2 border rounded" value={char} onChange={(e) => {
                      const updated = [...additionalCharacteristics];
                      updated[i] = e.target.value;
                      setAdditionalCharacteristics(updated);
                    }} placeholder={`Characteristic ${i + 1}`} />
                  ))}
                  <button onClick={() => setAdditionalCharacteristics([...additionalCharacteristics, ""])} className="text-sm text-blue-600 mb-4 block">+ Add More</button>
                  <div className="flex gap-4">
                    <button onClick={handleSavePlan} className="bg-blue-600 text-white px-4 py-2 rounded">{editingPlan ? "Update" : "Create"}</button>
                    <button onClick={() => { resetPlanForm(); setNewPlanFormVisible(false); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GeneralSettings;

