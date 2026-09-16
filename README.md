# Sorting Visualizer

Công cụ trực quan hóa 10 thuật toán sắp xếp: Bubble, Selection, Insertion, 
Shell, Merge, Quick, Heap, Radix LSD, Radix MSD, Bitonic

## Kiến trúc
- Backend (Python): tính toán thuật toán, ghi lại từng bước, trả về JSON
- Frontend (HTML/CSS/JS): nhận JSON, phát lại animation

**Backend (Python)**: chịu trách nhiệm toàn bộ logic thuật toán. Với mỗi 
lượt sắp xếp, backend chạy thuật toán thật, ghi lại từng bước hành động 
(so sánh, hoán đổi, di chuyển vào giỏ...) thành một "kịch bản" JSON, rồi 
trả về cho frontend.

**Frontend (HTML/CSS/JavaScript)**: nhận kịch bản JSON từ backend, sau đó 
"phát lại" (playback) từng bước bằng animation — cột đại diện cho phần tử 
mảng sẽ đổi màu/chiều cao theo đúng trình tự thuật toán đã thực hiện.
## Cấu trúc thư mục

```
Visual-Sorting
│   .gitignore
│   README.md
│   
├───BackEnd
│   │   README.md
│   │   requirements.txt
│   │   
│   └───app
│       │   main.py
│       │   registry.py
│       │   __init__.py
│       │   
│       ├───algorithms
│       │   │   bitonic_sort.py
│       │   │   bubble_sort.py
│       │   │   heap_sort.py
│       │   │   insertion_sort.py
│       │   │   merge_sort.py
│       │   │   quick_sort.py
│       │   │   radix_msd_sort.py
│       │   │   radix_sort.py
│       │   │   selection_sort.py
│       │   │   shell_sort.py
│       │   │   
│       │   └───__pycache__
│       │           bitonic_sort.cpython-313.pyc
│       │           bubble_sort.cpython-313.pyc           
│       │           heap_sort.cpython-313.pyc
│       │           insertion_sort.cpython-313.pyc          
│       │           merge_sort.cpython-313.pyc
│       │           quick_sort.cpython-313.pyc
│       │           radix_lsd_sort.cpython-313.pyc
│       │           radix_msd_sort.cpython-313.pyc
│       │           selection_sort.cpython-313.pyc
│       │           shell_sort.cpython-313.pyc         
│       │           __init__.cpython-313.pyc
│       │           
│       ├───schemas
│       │   │   sort_models.py
│       │   │   __init__.py
│       │   │   
│       │   └───__pycache__
│       │           sort_models.cpython-313.pyc
│       │           __init__.cpython-313.pyc
│       │           
│       └───__pycache__
│               main.cpython-313.pyc
│               registry.cpython-313.pyc
│               __init__.cpython-313.pyc
│               
└───FrontEnd
    │   index.html
    │   
    ├───css
    │       animations.css
    │       style.css
    │       
    └───js
            api.js
            app.js
            visualizer.js

        
```

## Thành viên & phân công
| Thành viên | Vai trò |
|---|---|
| 1. Trầm Đồng Khởi | Leader |
| 2. Nguyễn Anh Kiệt | Member |
| 3. Nguyễn Gia Hiếu | Member |
| 4. Nguyễn Nho Hiếu | Member |
| 5. Nguyễn Châu Hải My | Member |


## Công nghệ sử dụng
HTML, CSS, JavaScript, Python (Flask/FastAPI)

## Cài đặt & Chạy dự án

### Yêu cầu
- Python 3.10 trở lên
- Trình duyệt hiện đại (Chrome, Edge, Firefox...)
- VS Code (khuyến nghị, kèm extension **Live Server**)

### 1. Clone dự án

```bash
git clone https://github.com/hieunhoasd/Visual-Sorting.git
cd Visual-Sorting
```

### 2. Chạy Backend (FastAPI)

```bash
cd BackEnd
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Sau khi chạy thành công, server sẽ hoạt động tại: http://127.0.0.1:8000
Kiểm tra API tại: http://127.0.0.1:8000/docs


### 3. Chạy Frontend

Mở thư mục dự án bằng VS Code, chuột phải vào file `FrontEnd/index.html` → chọn **"Open with Live Server"**.

> Lưu ý: Backend (bước 2) phải đang chạy song song thì Frontend mới gọi được API và hiển thị animation.

### 4. Sử dụng

1. Chọn thuật toán muốn xem trong danh sách
2. Điều chỉnh số lượng phần tử và tốc độ mô phỏng bằng thanh trượt
3. Nhấn **Shuffle** để tạo mảng ngẫu nhiên mới
4. Nhấn **Start** để bắt đầu mô phỏng, hoặc **Step** để chạy từng bước thủ công
5. Bật **Compare Mode** để so sánh trực quan hai thuật toán cùng lúc trên cùng một bộ dữ liệu
