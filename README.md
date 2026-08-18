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
sorting-visualizer/
├── README.md
├── .gitignore
├── backend/
│   ├── app/
│   │   ├── main.py                # Entry khởi tạo API server
│   │   ├── config.py              # Cấu hình (CORS, port...)
│   │   ├── algorithms/
│   │   │   ├── __init__.py
│   │   │   ├── base.py            # Class/hàm dùng chung: ghi "step log"
│   │   │   ├── bubble_sort.py
│   │   │   ├── selection_sort.py
│   │   │   ├── insertion_sort.py
│   │   │   ├── merge_sort.py
│   │   │   ├── quick_sort.py
│   │   │   ├── shell_sort.py
│   │   │   ├── heap_sort.py
│   │   │   ├── radix_lsd_sort.py
│   │   │   └── radix_msd_sort.py
│   │   ├── routes/
│   │   │   └── sort_routes.py     # API endpoints /api/sort/
│   │   └── schemas.py             # Định nghĩa format JSON (request/response)
│   ├── requirements.txt
│   └── test_algorithms.py         # Unit test từng thuật toán
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css              # Layout tổng thể
│   │   └── animation.css          # Transition, màu sắc theo trạng thái
│   ├── js/
│   │   ├── main.js                # Khởi tạo & gắn event
│   │   ├── api.js                 # Gọi API sang Python backend
│   │   ├── renderer.js            # Vẽ mảng thành cột HTML
│   │   ├── player.js              # Đọc JSON kịch bản, animate từng bước
│   │   └── controls.js            # Xử lý slider, dropdown, nút bấm
│   └── assets/
├── docs/
│   └── json-schema.md             # Định nghĩa format action (compare/swap/bucket_move...)
├── report/                        # Báo cáo đồ án (Word/PDF)
├── slides/                        # Slide thuyết trình
└── demo/
    └── screenshots/
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
