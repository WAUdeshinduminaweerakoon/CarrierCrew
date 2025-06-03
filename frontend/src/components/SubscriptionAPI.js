import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/subscription'; // adjust based on your server

export async function getPlanByName(name) {
  const res = await fetch(`${BASE_URL}/subscription-plan/${name}`);
  if (!res.ok) throw new Error("Plan not found");
  return await res.json();
}



