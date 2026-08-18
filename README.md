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

```text

sorting-visualizer/
├── .gitignore
├── README.md
├── docs/
│   └── json-schema.md
│
├── backend/
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── schemas.py
│   │   ├── routes/
│   │   │   └── sort_routes.py
│   │   └── algorithms/
│   │       ├── __init__.py
│   │       ├── base.py                
│   │       ├── bubble_sort.py         
│   │       ├── radix_lsd_sort.py      
│   │       ├── selection_sort.py      
│   │       ├── radix_msd_sort.py      
│   │       ├── insertion_sort.py      
│   │       ├── bitonic_sort.py        
│   │       ├── shell_sort.py          
│   │       ├── quick_sort.py          
│   │       ├── merge_sort.py          
│   │       └── heap_sort.py           
│   └── tests/
│       └── test_algorithms.py         
│
└── frontend/
    ├── index.html
    ├── assets/
    ├── css/
    │   ├── style.css                  
    │   ├── animation.css              
    │   └── algorithms/
    │       ├── bubble.css             
    │       ├── radix.css              
    │       ├── bitonic.css            
    │       └── ...
    └── js/
        ├── main.js                    
        ├── api.js                     
        ├── controls.js                
        ├── renderer.js                
        ├── player.js                  
        └── algorithms/
            ├── bubble_sort_ui.js      
            ├── radix_lsd_ui.js        
            ├── selection_sort_ui.js   
            ├── radix_msd_ui.js        
            ├── insertion_sort_ui.js   
            ├── bitonic_ui.js          
            ├── shell_sort_ui.js       
            ├── quick_sort_ui.js       
            ├── merge_sort_ui.js       
            └── heap_sort_ui.js        

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
