from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("quick_sort")
def quick_sort(arr: list) -> list:
    a = arr.copy()
    steps = []

    def partition(low: int, high: int) -> int:
        pivot = a[high]
        # Đánh dấu phần tử Pivot
        steps.append(SortStep(type="pivot", index=high, value=pivot))

        i = low - 1
        for j in range(low, high):
            # So sánh phần tử đang duyệt với Pivot
            steps.append(SortStep(type="compare", indices=[j, high]))

            if a[j] < pivot:
                i += 1
                if i != j:
                    a[i], a[j] = a[j], a[i]
                    steps.append(SortStep(type="swap", indices=[i, j]))

        if (i + 1) != high:
            a[i + 1], a[high] = a[high], a[i + 1]
            steps.append(SortStep(type="swap", indices=[i + 1, high]))

        # Pivot đã về đúng vị trí cố định
        steps.append(SortStep(type="sorted", index=i + 1))
        return i + 1

    def solve(low: int, high: int):
        if low < high:
            pi = partition(low, high)
            solve(low, pi - 1)
            solve(pi + 1, high)
        elif low == high:
            steps.append(SortStep(type="sorted", index=low))

    solve(0, len(a) - 1)
    return steps