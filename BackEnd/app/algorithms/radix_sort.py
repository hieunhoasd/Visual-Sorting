from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("radix_lsd_sort")
def radix_lsd_sort(arr: list) -> list:
    steps = []
    if not arr:
        return steps

    arr_copy = arr.copy()
    n = len(arr_copy)

    # Xử lý trường hợp có số âm bằng cách tìm min và dịch chuyển toàn bộ mảng về miền dương
    min_val = min(arr_copy)
    offset = abs(min_val) if min_val < 0 else 0
    
    if offset > 0:
        for i in range(n):
            arr_copy[i] += offset

    max_val = max(arr_copy) if arr_copy else 0
    exp = 1

    while max_val // exp > 0:
        output = [0] * n
        count = [0] * 10

        # 1. Đếm tần suất chữ số
        for i in range(n):
            digit = (arr_copy[i] // exp) % 10
            count[digit] += 1
            steps.append(SortStep(type="compare", indices=[i, i]))

        # 2. Tính vị trí tích lũy
        for i in range(1, 10):
            count[i] += count[i - 1]

        # 3. Đưa vào mảng tạm (duyệt ngược để giữ tính ổn định - stability)
        for i in range(n - 1, -1, -1):
            digit = (arr_copy[i] // exp) % 10
            idx = count[digit] - 1
            output[idx] = arr_copy[i]
            count[digit] -= 1
            steps.append(SortStep(type="compare", indices=[i, i]))

        # 4. Ghi đè lại mảng chính và trả lại giá trị thực (trừ offset nếu có)
        for i in range(n):
            arr_copy[i] = output[i]
            actual_val = output[i] - offset
            steps.append(SortStep(type="overwrite", index=i, value=actual_val))

        exp *= 10

    # Nếu có offset, khôi phục lại mảng gốc ban đầu trong bộ nhớ đệm hiển thị
    if offset > 0:
        for i in range(n):
            arr_copy[i] -= offset

    # Đánh dấu hoàn tất sắp xếp
    for i in range(n):
        steps.append(SortStep(type="sorted", index=i))

    return steps