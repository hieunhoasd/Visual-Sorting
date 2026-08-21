from pydantic import BaseModel
from typing import List, Optional, Literal

# Một "step" là 1 hành động trong quá trình sắp xếp
class SortStep(BaseModel):
    # THÊM "pivot" VÀO DANH SÁCH LITERAL DƯỚI ĐÂY:
    type: Literal["compare", "swap", "overwrite", "bucket_move", "sorted", "pivot"]
    indices: Optional[List[int]] = None       # dùng cho compare, swap
    index: Optional[int] = None               # dùng cho overwrite, sorted, pivot
    value: Optional[int] = None               # dùng cho overwrite, bucket_move, pivot
    bucket: Optional[int] = None              # dùng riêng cho bucket_move

# Request từ Frontend gửi lên
class SortRequest(BaseModel):
    algorithm: str
    array: List[int]

# Response trả về cho Frontend
class SortResponse(BaseModel):
    algorithm: str
    original_array: List[int]
    steps: List[SortStep]