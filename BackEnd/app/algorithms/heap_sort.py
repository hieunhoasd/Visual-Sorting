from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("heap_sort")
def heap_sort(arr: list) -> list:
    steps = []
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        _heapify(arr, n, i, steps)

    for i in range(n - 1, 0, -1):
        steps.append(SortStep(type="swap", indices=[0, i]))
        arr[0], arr[i] = arr[i], arr[0]
        steps.append(SortStep(type="sorted", index=i))
        _heapify(arr, i, 0, steps)

    steps.append(SortStep(type="sorted", index=0))
    return steps

def _heapify(arr, n, root, steps):
    largest = root
    left = 2 * root + 1
    right = 2 * root + 2

    if left < n:
        steps.append(SortStep(type="compare", indices=[largest, left]))
        if arr[left] > arr[largest]:
            largest = left

    if right < n:
        steps.append(SortStep(type="compare", indices=[largest, right]))
        if arr[right] > arr[largest]:
            largest = right

    if largest != root:
        steps.append(SortStep(type="swap", indices=[root, largest]))
        arr[root], arr[largest] = arr[largest], arr[root]
        _heapify(arr, n, largest, steps)