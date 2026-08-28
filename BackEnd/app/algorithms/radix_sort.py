from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("radix_lsd_sort")
def radix_lsd_sort(arr: list) -> list:
    steps = []
    if not arr:
        return steps

    arr_copy = arr.copy()
    max_val = max(arr_copy)
    n = len(arr_copy)
    exp = 1

    while max_val // exp > 0:
        output = [0] * n
        count = [0] * 10

        # 1. Đếm tần suất chữ số ở hàng hiện tại
        for i in range(n):
            digit = (arr_copy[i] // exp) % 10
            count[digit] += 1
            steps.append(SortStep(type="compare", indices=[i, i]))

        # 2. Tính vị trí tích lũy
        for i in range(1, 10):
            count[i] += count[i - 1]

        # 3. Đưa phần tử vào mảng tạm output
        for i in range(n - 1, -1, -1):
            digit = (arr_copy[i] // exp) % 10
            idx = count[digit] - 1
            output[idx] = arr_copy[i]
            count[digit] -= 1
            steps.append(SortStep(type="compare", indices=[i, i]))

        # 4. Ghi đè dữ liệu lại mảng gốc để hiển thị animation
        for i in range(n):
            arr_copy[i] = output[i]
            steps.append(SortStep(type="overwrite", index=i, value=output[i]))

        exp *= 10

    # Đánh dấu tất cả phần tử đã hoàn thành sắp xếp
    for i in range(n):
        steps.append(SortStep(type="sorted", index=i))

    return steps