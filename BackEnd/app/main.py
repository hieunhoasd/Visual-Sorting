from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.sort_models import SortRequest, SortResponse
from app.registry import get_algorithm

# Import tất cả file thuật toán để decorator @register_algorithm chạy
from app.algorithms import (
    
    heap_sort,
    insertion_sort,
   
    merge_sort,
    
    quick_sort,
    radix_sort,
    radix_msd_sort,
    selection_sort,
    
    
    
    
    shell_sort,
    
    bubble_sort,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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