let currentArray = [29, 10, 14, 37, 14, 20, 7];

// Hàm vẽ các cột mảng lên màn hình
function renderArray(arr, comparingIndices = []) {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    // Tìm giá trị lớn nhất trong mảng hiện tại để làm tỷ lệ chuẩn
    const maxVal = Math.max(...arr);

    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        
        // TÍNH TOÁN LẠI CHIỀU CAO (SỬA LẠI DÒNG NÀY)
        // Thay vì fixed px, ta dùng % dựa trên maxVal, và trừ đi một khoảng padding
        const heightPercent = maxVal > 0 ? (value / maxVal) * 90 : 0; 
        bar.style.height = `${heightPercent}%`; 
        
        bar.innerText = value;

        if (comparingIndices.includes(index)) {
            bar.classList.add("comparing");
        }

        container.appendChild(bar);
    });
}
// Hàm render dữ liệu vào các bucket từ 0 đến 9 (đã fix lỗi hiển thị)
function renderBuckets(bucketData) {
    for (let i = 0; i <= 9; i++) {
        const itemsContainer = document.querySelector(`#bucket-${i} .bucket-items`);
        if (itemsContainer) {
            itemsContainer.innerHTML = ""; 
            
            // Hứng cả key dạng số (i) lẫn dạng chuỗi (String(i)) từ Python gửi lên
            const values = bucketData[i] || bucketData[String(i)];
            
            if (values && Array.isArray(values)) {
                values.forEach(val => {
                    const pill = document.createElement("div");
                    pill.className = "bucket-item-pill";
                    pill.innerText = val;
                    itemsContainer.appendChild(pill);
                });
            }
        }
    }
}

// Load trang lần đầu
document.addEventListener("DOMContentLoaded", () => {
    renderArray(currentArray);
});

// Nút tạo mảng ngẫu nhiên
document.getElementById("btn-generate-msd").addEventListener("click", () => {
    currentArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    renderArray(currentArray);
    // Xóa sạch các bucket cũ khi tạo mảng mới
    renderBuckets({});
});

// Nút bấm chạy thuật toán Radix MSD Sort gọi xuống Backend
document.getElementById("btn-run-msd").addEventListener("click", async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/sort", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                algorithm: "radix_msd",
                array: currentArray
            }),
        });

        if (!response.ok) {
            throw new Error("Không thể kết nối đến Backend!");
        }

        const data = await response.json();
        const steps = data.steps;

        // Vòng lặp chạy mô phỏng từng bước
        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            
            const step = steps[i];
            
            if (step.array) {
                renderArray(step.array, step.comparing || []);
            }
            
            if (step.buckets) {
                renderBuckets(step.buckets);
            }
        }

        // Đổi màu hoàn thành
        setTimeout(() => {
            const bars = document.querySelectorAll(".array-bar");
            bars.forEach(bar => bar.classList.add("sorted"));
        }, 600);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Hãy đảm bảo Backend FastAPI đang chạy ở cổng 8000!");
    }
});