from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("insertion_sort")
def insertion_sort(arr: list[int]) -> list:
    steps = []
    arr_copy = arr.copy()
    n = len(arr_copy)

    for i in range(1, n):
        key = arr_copy[i]
        j = i - 1

        while j >= 0:
            steps.append(SortStep(type="compare", indices=[j, j + 1]))
            if arr_copy[j] > key:
                arr_copy[j + 1] = arr_copy[j]
                steps.append(SortStep(type="overwrite", index=j + 1, value=arr_copy[j + 1]))
                j -= 1
            else:
                break

        arr_copy[j + 1] = key
        steps.append(SortStep(type="overwrite", index=j + 1, value=key))

    # Đánh dấu hoàn tất
    for i in range(n):
        steps.append(SortStep(type="sorted", index=i))

    return steps