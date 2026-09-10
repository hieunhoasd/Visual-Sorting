from app.registry import register_algorithm

@register_algorithm("sleep_sort")
def sleep_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    # Mô phỏng Sleep Sort: Các phần tử "thức dậy" theo thứ tự giá trị tăng dần
    items = [(val, idx) for idx, val in enumerate(arr)]
    items.sort(key=lambda x: x[0])

    sorted_arr = arr.copy()
    for target_idx, (val, orig_idx) in enumerate(items):
        steps.append({
            "type": "compare",
            "indices": [orig_idx, target_idx],
            "array": arr.copy()
        })
        
        sorted_arr[target_idx] = val
        arr = sorted_arr[:target_idx + 1] + arr[target_idx + 1:]
        
        steps.append({
            "type": "overwrite",
            "indices": [target_idx, target_idx],
            "array": arr.copy()
        })

    return steps