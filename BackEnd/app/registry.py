from typing import Callable, Dict

# Nơi lưu tất cả thuật toán đã "đăng ký"
ALGORITHM_REGISTRY: Dict[str, Callable] = {}

def register_algorithm(name: str):
    """Decorator để mỗi file thuật toán tự đăng ký vào hệ thống."""
    def decorator(func: Callable):
        ALGORITHM_REGISTRY[name] = func
        return func
    return decorator

def get_algorithm(name: str) -> Callable:
    if name not in ALGORITHM_REGISTRY:
        raise ValueError(f"Algorithm '{name}' not found")
    return ALGORITHM_REGISTRY[name]