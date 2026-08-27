from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("radix_msd_sort")
def radix_msd_sort(arr: list) -> list:
    a = arr.copy()
    steps = []
    
    if not a:
        return steps

    # Tìm số lớn nhất để biết số lượng chữ số tối đa
    max_val = max(a)
    # Xử lý trường hợp mảng toàn số 0
    max_digits = len(str(abs(max_val))) if max_val != 0 else 1

    def get_digit(number: int, digit_place: int) -> int:
        """Lấy chữ số tại vị trí digit_place (0 là hàng đơn vị, 1 là hàng chục...)"""
        return (abs(number) // (10 ** digit_place)) % 10

    def msd(left: int, right: int, digit_place: int):
        if left >= right or digit_place < 0:
            if left == right:
                # Nếu chỉ còn 1 phần tử, nó đã ở đúng vị trí
                steps.append(SortStep(type="sorted", index=left))
            return

        # Khởi tạo 10 bucket cho các chữ số từ 0 -> 9
        buckets = [[] for _ in range(10)]
        
        # 1. Phân bổ các phần tử vào bucket dựa trên chữ số hiện tại
        for i in range(left, right + 1):
            val = a[i]
            digit = get_digit(val, digit_place)
            buckets[digit].append(val)
            
            # Ghi log: Di chuyển giá trị vào bucket
            steps.append(SortStep(type="bucket_move", value=val, bucket=digit))

        # 2. Ghi đè các phần tử từ bucket trở lại mảng chính
        idx = left
        bucket_boundaries = [] # Lưu trữ phạm vi (start, end) của từng bucket
        
        for b_idx in range(10):
            start_idx = idx
            for val in buckets[b_idx]:
                a[idx] = val
                # Ghi log: Ghi đè giá trị từ bucket vào mảng
                steps.append(SortStep(type="overwrite", index=idx, value=val))
                idx += 1
            
            end_idx = idx - 1
            if start_idx <= end_idx:
                bucket_boundaries.append((start_idx, end_idx))
                
        # 3. Đệ quy phân rã tiếp hoặc đánh dấu đã sắp xếp xong
        if digit_place == 0:
            # Nếu đã xét xong đến hàng đơn vị, tất cả phần tử trong đoạn này đã chuẩn
            for i in range(left, right + 1):
                steps.append(SortStep(type="sorted", index=i))
        else:
            # Tiếp tục đệ quy cho chữ số thấp hơn (hàng nhỏ hơn) với từng bucket
            for start, end in bucket_boundaries:
                msd(start, end, digit_place - 1)

    # Gọi hàm đệ quy MSD bắt đầu từ chữ số lớn nhất (max_digits - 1)
    msd(0, len(a) - 1, max_digits - 1)
    
    return steps