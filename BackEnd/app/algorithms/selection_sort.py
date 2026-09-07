from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("selection_sort")
def selection_sort(arr: list) -> list:
    a = arr.copy()
    steps = []
    n = len(a)

    for i in range(n):
        min_idx = i

        # Đánh dấu phần tử min ban đầu của vòng lặp
        steps.append(SortStep(type="pivot", index=min_idx, value=a[min_idx]))

        for j in range(i + 1, n):
            # So sánh phần tử hiện tại với phần tử min đang xét
            steps.append(SortStep(type="compare", indices=[min_idx, j]))

            if a[j] < a[min_idx]:
                min_idx = j
                # Cập nhật lại vị trí min mới nếu tìm thấy nhỏ hơn
                steps.append(SortStep(type="pivot", index=min_idx, value=a[min_idx]))

        # Tiến hành đổi chỗ nếu min_idx thay đổi
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            steps.append(SortStep(type="swap", indices=[i, min_idx]))

        # Cố định vị trí đã sắp xếp xong
        steps.append(SortStep(type="sorted", index=i))

    # Đánh dấu nốt phần tử cuối cùng nếu chưa được đánh dấu cố định
    if n > 0 and n - 1 not in [s.index for s in steps if s.type == "sorted"]:
        steps.append(SortStep(type="sorted", index=n - 1))

    return steps