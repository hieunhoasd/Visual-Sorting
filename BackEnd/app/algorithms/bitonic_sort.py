from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("bitonic_sort")
def bitonic_sort(arr: list[int]) -> list:
    steps = []
    n_orig = len(arr)
    if n_orig <= 1:
        for i in range(n_orig):
            steps.append(SortStep(type="sorted", index=i))
        return steps

    # Tìm số k là lũy thừa của 2 nhỏ nhất sao cho k >= n_orig
    k = 1
    while k < n_orig:
        k *= 2

    # Padding mảng bằng cách lặp lại phần tử cuối hoặc dùng giá trị lớn
    max_val = max(arr) if arr else 0
    arr_copy = arr + [max_val + 999999] * (k - n_orig)
    n = k

    def comp_and_swap(i, j, dir):
        if i < n_orig and j < n_orig:
            steps.append(SortStep(type="compare", indices=[i, j]))
        
        if (arr_copy[i] > arr_copy[j]) == dir:
            arr_copy[i], arr_copy[j] = arr_copy[j], arr_copy[i]
            
            # Đảm bảo chỉ ghi nhận overwrite khi thuộc mảng gốc và không dính giá trị độn
            if i < n_orig and arr_copy[i] <= max_val:
                steps.append(SortStep(type="overwrite", index=i, value=arr_copy[i]))
            if j < n_orig and arr_copy[j] <= max_val:
                steps.append(SortStep(type="overwrite", index=j, value=arr_copy[j]))
                
    def bitonic_merge(low, cnt, dir):
        if cnt > 1:
            mid = cnt // 2
            for i in range(low, low + mid):
                comp_and_swap(i, i + mid, dir)
            bitonic_merge(low, mid, dir)
            bitonic_merge(low + mid, mid, dir)

    def bitonic_sort_rec(low, cnt, dir):
        if cnt > 1:
            mid = cnt // 2
            bitonic_sort_rec(low, mid, True)   # Nửa đầu tăng dần
            bitonic_sort_rec(low + mid, mid, False) # Nửa sau giảm dần
            bitonic_merge(low, cnt, dir)

    # Chạy thuật toán trên mảng đã được độn kích thước lũy thừa của 2
    bitonic_sort_rec(0, n, True)

    # Đánh dấu hoàn tất sắp xếp cho các phần tử gốc
    for i in range(n_orig):
        steps.append(SortStep(type="sorted", index=i))

    return steps