from app.registry import register_algorithm

@register_algorithm("circle_sort")
def circle_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    if n <= 1:
        return steps

    def circle_sort_recursive(low: int, high: int) -> int:
        swaps = 0
        if low >= high:
            return swaps

        l = low
        h = high

        while l < h:
            # Ghi nhận bước so sánh
            steps.append({
                "type": "compare",
                "indices": [l, h],
                "array": arr.copy()
            })

            if arr[l] > arr[h]:
                arr[l], arr[h] = arr[h], arr[l]
                swaps += 1
                # Ghi nhận bước hoán đổi
                steps.append({
                    "type": "swap",
                    "indices": [l, h],
                    "array": arr.copy()
                })
            l += 1
            h -= 1

        # Trường hợp mảng có số lượng phần tử lẻ ở phân đoạn hiện tại
        if l == h:
            steps.append({
                "type": "compare",
                "indices": [l, h + 1],
                "array": arr.copy()
            })
            if arr[l] > arr[h + 1]:
                arr[l], arr[h + 1] = arr[h + 1], arr[l]
                swaps += 1
                steps.append({
                    "type": "swap",
                    "indices": [l, h + 1],
                    "array": arr.copy()
                })

        mid = (high - low) // 2
        swaps += circle_sort_recursive(low, low + mid)
        swaps += circle_sort_recursive(low + mid + 1, high)

        return swaps

    # Lặp lại giải thuật cho đến khi không còn lượt hoán đổi nào
    while True:
        swaps = circle_sort_recursive(0, n - 1)
        if swaps == 0:
            break

    return steps