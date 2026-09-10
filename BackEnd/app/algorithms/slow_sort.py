from app.registry import register_algorithm

@register_algorithm("slow_sort")
def slow_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    def _slow_sort(i: int, j: int):
        if i >= j:
            return

        m = (i + j) // 2
        _slow_sort(i, m)
        _slow_sort(m + 1, j)

        steps.append({
            "type": "compare",
            "indices": [m, j],
            "array": arr.copy()
        })

        if arr[j] < arr[m]:
            arr[j], arr[m] = arr[m], arr[j]
            steps.append({
                "type": "swap",
                "indices": [m, j],
                "array": arr.copy()
            })

        _slow_sort(i, j - 1)

    if n > 1:
        _slow_sort(0, n - 1)

    return steps