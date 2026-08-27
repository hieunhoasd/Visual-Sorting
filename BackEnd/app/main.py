from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(debug=True)

# Cấu hình CORS để cho phép Frontend (cổng 5500) gọi API xuống Backend (cổng 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn gọi vào
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép mọi phương thức (GET, POST,...)
    allow_headers=["*"],  # Cho phép mọi header
)

# Khung dữ liệu đầu vào từ Frontend gửi lên
class SortRequest(BaseModel):
    algorithm: str
    array: List[int]

# 1. Hàm sinh bước chạy cho Selection Sort
def selection_sort_steps(arr: List[int]) -> List[List[int]]:
    steps = []
    a = list(arr)
    n = len(a)
    steps.append(list(a))
    
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        a[i], a[min_idx] = a[min_idx], a[i]
        steps.append(list(a))
        
    return steps
# 2. Hàm sinh bước chạy cho Radix MSD Sort (giữ lại kết quả trong bucket ở bước cuối)
def radix_msd_steps(arr: List[int]) -> List[dict]:
    steps = []
    a = list(arr)
    
    # Bước 1: Trạng thái ban đầu
    steps.append({
        "array": list(a),
        "buckets": {},
        "comparing": []
    })
    
    # Bước 2: Phân loại vào các bucket theo chữ số hàng chục (MSD)
    buckets = {i: [] for i in range(10)}
    for val in a:
        digit = (val // 10) % 10
        buckets[digit].append(val)
        
    steps.append({
        "array": list(a),
        "buckets": buckets,
        "comparing": []
    })
    
    # Bước 3: Sắp xếp hoàn thành và gom kết quả vào đúng bucket tương ứng để hiển thị lại
    a.sort()
    final_buckets = {i: [] for i in range(10)}
    for val in a:
        digit = (val // 10) % 10
        final_buckets[digit].append(val)

    steps.append({
        "array": list(a),
        "buckets": final_buckets,  # Giữ lại dữ liệu trong bucket ở bước cuối
        "comparing": []
    })
    
    return steps

@app.post("/api/sort")
def run_sort(data: SortRequest):
    # Kiểm tra đúng tên thuật toán, nếu không khớp trả về lỗi 400 chuẩn chỉnh
    if data.algorithm == "selection_sort":
        steps = selection_sort_steps(data.array)
        return {"steps": steps}
    elif data.algorithm == "radix_msd" or data.algorithm == "radix_sort":
        steps = radix_msd_steps(data.array)
        return {"steps": steps}
    else:
        raise HTTPException(status_code=400, detail=f"Thuật toán '{data.algorithm}' chưa được hỗ trợ!")

@app.get("/")
def root():
    return {"message": "FastAPI Server đang chạy mượt mà!"}