// Khởi tạo mảng ban đầu ngẫu nhiên
let currentArray = [29, 10, 14, 37, 14, 20, 7];

// Hàm vẽ các cột lên màn hình
function renderArray(arr, comparingIndices = []) {
    const container = document.getElementById("array-container");
    container.innerHTML = ""; // Xóa các cột cũ

    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value * 8}px`; // Nhân hệ thống chiều cao cho vừa khung
        bar.innerText = value;

        // Nếu cột này đang được so sánh thì đổi màu
        if (comparingIndices.includes(index)) {
            bar.classList.add("comparing");
        }

        container.appendChild(bar);
    });
}

// Khi vừa load trang thì vẽ mảng mặc định
document.addEventListener("DOMContentLoaded", () => {
    renderArray(currentArray);
});

// Nút tạo mảng ngẫu nhiên mới
document.getElementById("btn-generate").addEventListener("click", () => {
    currentArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 30) + 5);
    renderArray(currentArray);
});

// Nút bấm chạy Selection Sort
document.getElementById("btn-selection-sort").addEventListener("click", async () => {
    try {
        // Gọi API xuống Backend FastAPI của ông
        const response = await fetch("http://127.0.0.1:8000/api/sort", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                algorithm: "selection_sort", // Khớp chính xác với tên đăng ký backend
                array: currentArray
            }),
        });

        if (!response.ok) {
            throw new Error("Không thể kết nối đến Backend!");
        }

        const data = await response.json();
        const steps = data.steps; // Nhận danh sách các bước từ thuật toán trả về

        // Duyệt qua từng bước để tạo hiệu ứng chạy chậm (Animation)
        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 400)); // Tốc độ chạy mỗi bước (ms)
            renderArray(steps[i]);
        }

        // Đổi màu xanh lá toàn bộ khi hoàn thành
        setTimeout(() => {
            const bars = document.querySelectorAll(".array-bar");
            bars.forEach(bar => bar.classList.add("sorted"));
        }, 400);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Hãy đảm bảo Backend FastAPI đang chạy ở cổng 8000!");
    }
});


// Hàm render dữ liệu vào các bucket tương ứng từ Backend
function renderBuckets(bucketData) {
    // bucketData là mảng chứa 10 mảng con (từ 0 đến 9)
    for (let i = 0; i <= 9; i++) {
        const itemsContainer = document.querySelector(`#bucket-${i} .bucket-items`);
        if (itemsContainer) {
            itemsContainer.innerHTML = ""; // Xóa dữ liệu cũ của từng bucket
            
            if (bucketData && bucketData[i]) {
                bucketData[i].forEach(val => {
                    const pill = document.createElement("div");
                    pill.className = "bucket-item-pill";
                    pill.innerText = val;
                    itemsContainer.appendChild(pill);
                });
            }
        }
    }
}
