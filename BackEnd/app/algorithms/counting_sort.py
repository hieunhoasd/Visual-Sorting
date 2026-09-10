from app.registry import register_algorithm

@register_algorithm("counting_sort")
def counting_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    max_val = max(arr)
    min_val = min(arr)
    range_of_elements = max_val - min_val + 1

    count = [0] * range_of_elements

    # Bước 1: Đếm số lần xuất hiện của từng phần tử
    for i in range(n):
        count[arr[i] - min_val] += 1
        steps.append({
            "type": "compare",
            "indices": [i, i],
            "array": arr.copy()
        })

    # Bước 2: Điền các giá trị đã sắp xếp trở lại mảng
    idx = 0
    for val_offset in range(range_of_elements):
        while count[val_offset] > 0:
            arr[idx] = val_offset + min_val
            count[val_offset] -= 1
            steps.append({
                "type": "overwrite",
                "indices": [idx, idx],
                "array": arr.copy()
            })
            idx += 1

    return steps