from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("shell_sort")
def shell_sort(arr: list) -> list:
    a = arr.copy()
    steps = []
    n = len(a)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = a[i]
            j = i

            while j >= gap:
                # Bước so sánh 2 phần tử cách nhau 1 khoảng gap
                steps.append(SortStep(type="compare", indices=[j - gap, j]))

                if a[j - gap] > temp:
                    a[j] = a[j - gap]
                    # Dùng overwrite, index và value theo schema
                    steps.append(SortStep(type="overwrite", index=j, value=a[j]))
                    j -= gap
                else:
                    break

            a[j] = temp
            steps.append(SortStep(type="overwrite", index=j, value=temp))

        gap //= 2

    # Đánh dấu toàn bộ phần tử đã hoàn tất
    for idx in range(n):
        steps.append(SortStep(type="sorted", index=idx))

    return steps