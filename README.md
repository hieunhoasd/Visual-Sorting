# Sorting Visualizer

Công cụ trực quan hóa 9 thuật toán sắp xếp: Bubble, Selection, Insertion, 
Shell, Merge, Quick, Heap, Radix LSD, Radix MSD.

## Kiến trúc
- Backend (Python): tính toán thuật toán, ghi lại từng bước, trả về JSON
- Frontend (HTML/CSS/JS): nhận JSON, phát lại animation

## Cài đặt
### Backend
cd backend
pip install -r requirements.txt
python app/main.py

### Frontend
Mở frontend/index.html bằng Live Server (hoặc build tool nếu dùng)

## Cấu trúc thư mục

```text
SORTING-VISUALIZER/
├── README.md
├── .gitignore
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── schemas.py
│   │   ├── algorithms/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── bubble_sort.py
│   │   │   ├── selection_sort.py
│   │   │   ├── insertion_sort.py
│   │   │   ├── merge_sort.py
│   │   │   ├── quick_sort.py
│   │   │   ├── shell_sort.py
│   │   │   ├── heap_sort.py
│   │   │   ├── radix_lsd_sort.py
│   │   │   └── radix_msd_sort.py
│   │   └── routes/
│   │       └── sort_routes.py
│   ├── requirements.txt
│   └── tests/
│       └── test_algorithms.py
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── animation.css
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── renderer.js
│   │   ├── player.js
│   │   └── controls.js
│   └── assets/
└── docs/
    └── json-schema.md

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
