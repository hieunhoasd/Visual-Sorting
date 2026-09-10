from app.registry import register_algorithm

@register_algorithm("pigeonhole_sort")
def pigeonhole_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    min_val = min(arr)
    max_val = max(arr)
    size = max_val - min_val + 1

    holes = [[] for _ in range(size)]

    # Phân loại các phần tử vào tổ cò (pigeonholes)
    for i in range(n):
        steps.append({
            "type": "compare",
            "indices": [i, i],
            "array": arr.copy()
        })
        holes[arr[i] - min_val].append(arr[i])

    # Ghi nhận giá trị đã sắp xếp trở lại mảng
    idx = 0
    for hole in holes:
        for val in hole:
            arr[idx] = val
            steps.append({
                "type": "overwrite",
                "indices": [idx, idx],
                "array": arr.copy()
            })
            idx += 1

    return steps