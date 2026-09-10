from app.registry import register_algorithm

@register_algorithm("strand_sort")
def strand_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    remaining = arr.copy()
    sorted_res = []

    while remaining:
        sub = [remaining.pop(0)]
        i = 0
        while i < len(remaining):
            steps.append({
                "type": "compare",
                "indices": [i, len(sub) - 1],
                "array": arr.copy()
            })
            if remaining[i] >= sub[-1]:
                sub.append(remaining.pop(i))
            else:
                i += 1

        # Trộn chuỗi (strand) mới rút ra vào kết quả đã sắp xếp
        new_sorted = []
        p1 = p2 = 0
        while p1 < len(sorted_res) and p2 < len(sub):
            if sorted_res[p1] <= sub[p2]:
                new_sorted.append(sorted_res[p1])
                p1 += 1
            else:
                new_sorted.append(sub[p2])
                p2 += 1
        new_sorted.extend(sorted_res[p1:])
        new_sorted.extend(sub[p2:])
        sorted_res = new_sorted

        # Ghi nhận trạng thái mảng hiện tại
        cur_arr = sorted_res + remaining
        for k in range(len(cur_arr)):
            arr[k] = cur_arr[k]
            steps.append({
                "type": "overwrite",
                "indices": [k, k],
                "array": arr.copy()
            })

    return steps