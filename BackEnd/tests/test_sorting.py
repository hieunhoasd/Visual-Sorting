from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    """Kiểm tra xem server backend có đang hoạt động ổn định không"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "FastAPI Server đang chạy mượt mà!"}

def test_selection_sort_api():
    """Kiểm tra API thuật toán Selection Sort"""
    payload = {
        "algorithm": "selection_sort",
        "array": [29, 10, 14, 37]
    }
    response = client.post("/api/sort", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "steps" in data
    # Kiểm tra bước cuối cùng mảng phải được sắp xếp tăng dần
    final_array = data["steps"][-1]
    assert final_array == [10, 14, 29, 37]

def test_radix_msd_sort_api():
    """Kiểm tra API thuật toán Radix MSD Sort"""
    payload = {
        "algorithm": "radix_msd",
        "array": [30, 78, 94, 67]
    }
    response = client.post("/api/sort", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "steps" in data
    # Kiểm tra bước cuối cùng trả về mảng và bucket hợp lệ
    last_step = data["steps"][-1]
    assert "array" in last_step
    assert last_step["array"] == [30, 67, 78, 94]
    assert "buckets" in last_step

def test_invalid_algorithm():
    """Kiểm tra trường hợp gửi tên thuật toán tào lao xem có báo lỗi 400 không"""
    payload = {
        "algorithm": "thuat_toan_ma_hoa",
        "array": [5, 2, 9]
    }
    response = client.post("/api/sort", json=payload)
    assert response.status_code == 400