from app.registry import register_algorithm

class TreeNode:
    def __init__(self, val: int, original_idx: int):
        self.val = val
        self.idx = original_idx
        self.left = None
        self.right = None

@register_algorithm("tree_sort")
def tree_sort(arr: list[int]) -> list[dict]:
    steps = []
    if not arr:
        return steps

    arr = arr.copy()
    n = len(arr)

    root = None

    def insert(node, val, orig_idx):
        if node is None:
            return TreeNode(val, orig_idx)

        steps.append({
            "type": "compare",
            "indices": [orig_idx, node.idx],
            "array": arr.copy()
        })

        if val < node.val:
            node.left = insert(node.left, val, orig_idx)
        else:
            node.right = insert(node.right, val, orig_idx)
        return node

    # Xây dựng BST
    for i in range(n):
        root = insert(root, arr[i], i)

    # Duyệt In-order để trích xuất mảng đã sắp xếp
    sorted_pos = [0]

    def in_order(node):
        if node is None:
            return
        in_order(node.left)

        curr_i = sorted_pos[0]
        arr[curr_i] = node.val
        steps.append({
            "type": "overwrite",
            "indices": [curr_i, curr_i],
            "array": arr.copy()
        })
        sorted_pos[0] += 1

        in_order(node.right)

    in_order(root)

    return steps