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
