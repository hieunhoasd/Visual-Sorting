import math
from app.registry import register_algorithm

@register_algorithm("intro_sort")
def intro_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    if n <= 1:
        return steps

    max_depth = 2 * math.floor(math.log2(n))

    def heapify(low: int, count: int, i: int):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < count:
            steps.append({
                "type": "compare",
                "indices": [low + left, low + largest],
                "array": arr.copy()
            })
            if arr[low + left] > arr[low + largest]:
                largest = left

        if right < count:
            steps.append({
                "type": "compare",
                "indices": [low + right, low + largest],
                "array": arr.copy()
            })
            if arr[low + right] > arr[low + largest]:
                largest = right

        if largest != i:
            arr[low + i], arr[low + largest] = arr[low + largest], arr[low + i]
            steps.append({
                "type": "swap",
                "indices": [low + i, low + largest],
                "array": arr.copy()
            })
            heapify(low, count, largest)

    def heap_sort_sub(low: int, high: int):
        count = high - low + 1
        for i in range(count // 2 - 1, -1, -1):
            heapify(low, count, i)
        for i in range(count - 1, 0, -1):
            arr[low], arr[low + i] = arr[low + i], arr[low]
            steps.append({
                "type": "swap",
                "indices": [low, low + i],
                "array": arr.copy()
            })
            heapify(low, i, 0)

    def insertion_sort_sub(low: int, high: int):
        for i in range(low + 1, high + 1):
            key = arr[i]
            j = i - 1
            while j >= low:
                steps.append({
                    "type": "compare",
                    "indices": [j, j + 1],
                    "array": arr.copy()
                })
                if arr[j] > key:
                    arr[j + 1] = arr[j]
                    steps.append({
                        "type": "overwrite",
                        "indices": [j + 1, j + 1],
                        "array": arr.copy()
                    })
                    j -= 1
                else:
                    break
            arr[j + 1] = key
            steps.append({
                "type": "overwrite",
                "indices": [j + 1, j + 1],
                "array": arr.copy()
            })

    def partition(low: int, high: int) -> int:
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            steps.append({
                "type": "compare",
                "indices": [j, high],
                "array": arr.copy()
            })
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                steps.append({
                    "type": "swap",
                    "indices": [i, j],
                    "array": arr.copy()
                })
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        steps.append({
            "type": "swap",
            "indices": [i + 1, high],
            "array": arr.copy()
        })
        return i + 1

    def introsort_util(low: int, high: int, depth_limit: int):
        size = high - low + 1
        if size < 16:
            insertion_sort_sub(low, high)
            return
        if depth_limit == 0:
            heap_sort_sub(low, high)
            return

        p = partition(low, high)
        introsort_util(low, p - 1, depth_limit - 1)
        introsort_util(p + 1, high, depth_limit - 1)

    introsort_util(0, n - 1, max_depth)
    return steps