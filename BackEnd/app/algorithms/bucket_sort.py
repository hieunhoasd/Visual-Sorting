from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("bucket_sort")
def bucket_sort(arr: list) -> list:
    steps = []
    arr_copy = arr.copy()
    n = len(arr_copy)
    if n <= 1:
        return steps

    # Tìm Min & Max
    min_val = arr_copy[0]
    max_val = arr_copy[0]
    
    for i in range(1, n):
        steps.append(SortStep(type="compare", indices=[0, i]))
        if arr_copy[i] < min_val:
            min_val = arr_copy[i]
        if arr_copy[i] > max_val:
            max_val = arr_copy[i]

    if min_val == max_val:
        for i in range(n):
            steps.append(SortStep(type="sorted", index=i))
        return steps

    # Phân phối vào các xô
    bucket_count = max(1, int(n ** 0.5))
    buckets = [[] for _ in range(bucket_count)]
    bucket_range = (max_val - min_val) / bucket_count

    for i, val in enumerate(arr_copy):
        idx = int((val - min_val) / bucket_range)
        if idx >= bucket_count:
            idx = bucket_count - 1
        buckets[idx].append(val)
        steps.append(SortStep(type="compare", indices=[i]))

    # Sắp xếp các xô và gộp kết quả
    sorted_arr = []
    for bucket in buckets:
        bucket.sort()
        sorted_arr.extend(bucket)

    # Cập nhật mảng gốc và ghi nhận bước hoán đổi / hoàn thành
    for i in range(n):
        arr_copy[i] = sorted_arr[i]
        steps.append(SortStep(type="swap", indices=[i]))
        steps.append(SortStep(type="sorted", index=i))

    return steps