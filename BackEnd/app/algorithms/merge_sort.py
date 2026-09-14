from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("merge_sort")
def merge_sort(arr: list) -> list:
    steps = []
    _merge_sort(arr, 0, len(arr) - 1, steps)
    return steps

def _merge_sort(arr, left, right, steps):
    if left >= right:
        return
    mid = (left + right) // 2
    _merge_sort(arr, left, mid, steps)
    _merge_sort(arr, mid + 1, right, steps)
    _merge(arr, left, mid, right, steps)

def _merge(arr, left, mid, right, steps):
    left_part = arr[left:mid + 1]
    right_part = arr[mid + 1:right + 1]
    i = j = 0
    k = left

    while i < len(left_part) and j < len(right_part):
        steps.append(SortStep(type="compare", indices=[left + i, mid + 1 + j]))
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        steps.append(SortStep(type="overwrite", index=k, value=arr[k]))
        k += 1

    while i < len(left_part):
        arr[k] = left_part[i]
        steps.append(SortStep(type="overwrite", index=k, value=arr[k]))
        i += 1
        k += 1

    while j < len(right_part):
        arr[k] = right_part[j]
        steps.append(SortStep(type="overwrite", index=k, value=arr[k]))
        j += 1
        k += 1