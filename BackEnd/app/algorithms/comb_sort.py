from app.registry import register_algorithm

@register_algorithm("comb_sort")
def comb_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    gap = n
    shrink = 1.3
    sorted_flag = False

    while not sorted_flag:
        # Cập nhật khoảng cách gap theo hệ số thu nhỏ 1.3
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted_flag = True

        i = 0
        while i + gap < n:
            # Ghi nhận bước so sánh
            steps.append({
                "type": "compare",
                "indices": [i, i + gap],
                "array": arr.copy()
            })

            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted_flag = False
                
                # Ghi nhận bước hoán đổi
                steps.append({
                    "type": "swap",
                    "indices": [i, i + gap],
                    "array": arr.copy()
                })

            i += 1

    return steps