const API_BASE_URL = "http://127.0.0.1:8000";

async function fetchSortSteps(algorithm, array) {
  const response = await fetch(`${API_BASE_URL}/api/sort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ algorithm, array }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Lỗi server: ${response.status}`);
  }

  return response.json();
}