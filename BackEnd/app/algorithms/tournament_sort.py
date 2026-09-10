from app.registry import register_algorithm

@register_algorithm("tournament_sort")
def tournament_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    tree_size = 2 ** ((n - 1).bit_length() + 1)
    tree = [float('inf')] * tree_size
    leaf_offset = tree_size // 2

    # Đưa các phần tử vào nút lá
    for i in range(n):
        tree[leaf_offset + i] = arr[i]

    # Xây dựng cây giải đấu ban đầu
    for i in range(leaf_offset - 1, 0, -1):
        left = 2 * i
        right = 2 * i + 1
        tree[i] = min(tree[left], tree[right])

    # Lần lượt chọn phần tử chiến thắng (nhỏ nhất)
    for step_idx in range(n):
        winner = tree[1]

        # Tìm vị trí lá của phần tử chiến thắng
        idx = 1
        while idx < leaf_offset:
            left = 2 * idx
            right = 2 * idx + 1
            steps.append({
                "type": "compare",
                "indices": [min(left - leaf_offset, n - 1), min(right - leaf_offset, n - 1)],
                "array": arr.copy()
            })
            if tree[left] == winner:
                idx = left
            else:
                idx = right

        tree[idx] = float('inf')

        # Cập nhật ngược lên gốc
        idx //= 2
        while idx > 0:
            left = 2 * idx
            right = 2 * idx + 1
            tree[idx] = min(tree[left], tree[right])
            idx //= 2

        arr[step_idx] = winner
        steps.append({
            "type": "overwrite",
            "indices": [step_idx, step_idx],
            "array": arr.copy()
        })

    return steps