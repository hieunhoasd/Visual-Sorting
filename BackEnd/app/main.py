from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.sort_models import SortRequest, SortResponse
from app.registry import get_algorithm

# Import tất cả file thuật toán để decorator @register_algorithm chạy
from app.algorithms import (
    bucket_sort,
    circle_sort,
    comb_sort,
    counting_sort,
    heap_sort,
    insertion_sort,
    intro_sort,
    merge_sort,
    pigeonhole_sort,
    quick_sort,
    radix_sort,
    selection_sort,
    sleep_sort,
    slow_sort,
    smooth_sort,
    strand_sort,
    shell_sort,
    tree_sort,
    bubble_sort,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # để Frontend gọi được, siết lại khi deploy thật
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/sort", response_model=SortResponse)
def sort_array(request: SortRequest):
    try:
        algorithm_func = get_algorithm(request.algorithm)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    steps = algorithm_func(request.array.copy())
    return SortResponse(
        algorithm=request.algorithm,
        original_array=request.array,
        steps=steps
    )