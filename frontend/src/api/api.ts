// src/api/api.ts
const API_URL = "http://localhost:5000/api";

export const loginUser = async (username: string, password: string, roomNo?: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, roomNo }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Login failed");
  }

  return res.json();
};
