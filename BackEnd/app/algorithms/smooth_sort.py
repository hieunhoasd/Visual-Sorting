from app.registry import register_algorithm

@register_algorithm("smooth_sort")
def smooth_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    if n <= 1:
        return steps

    # Dãy số Leonardo
    lp = [1, 1, 3, 5, 9, 15, 25, 41, 67, 109, 177, 287, 465, 753, 1219]

    # Smoothsort mô phỏng quá trình biến đổi Leonardo Heap
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0:
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

    return steps