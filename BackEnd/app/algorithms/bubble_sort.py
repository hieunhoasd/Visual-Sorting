from app.registry import register_algorithm
from app.schemas.sort_models import SortStep

@register_algorithm("bubble_sort")
def bubble_sort(arr: list) -> list:
    steps = []
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            # Ghi nhận bước so sánh (compare)
            steps.append(SortStep(type="compare", indices=[j, j + 1]))
            
            if arr_copy[j] > arr_copy[j + 1]:
                # Đổi chỗ trong mảng tạm
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                # Ghi nhận bước hoán đổi (swap)
                steps.append(SortStep(type="swap", indices=[j, j + 1]))
                swapped = True
                
        # Sau mỗi vòng lặp lớn, phần tử ở n - i - 1 đã vào đúng vị trí hoàn thành
        steps.append(SortStep(type="sorted", index=n - i - 1))
        
        # Nếu không có sự hoán đổi nào ở lượt qua, mảng đã sắp xếp xong
        if not swapped:
            # Đánh dấu nốt các phần tử còn lại là sorted
            for k in range(n - i - 1):
                steps.append(SortStep(type="sorted", index=k))
            break
            
    return steps