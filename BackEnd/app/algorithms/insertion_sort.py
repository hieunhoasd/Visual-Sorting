from app.registry import register_algorithm

@register_algorithm("insertion_sort")
def insertion_sort(arr: list[int]) -> list[dict]:
    steps = []
    arr = arr.copy()
    n = len(arr)

    for i in range(1, n):
        key = arr[i]
        j = i - 1

        while j >= 0:
            steps.append({
                "type": "compare",
                "indices": [j, j + 1],
                "array": arr.copy()
            })

            if arr[j] > key:
                arr[j + 1] = arr[j]
                steps.append({
                    "type": "overwrite",
                    "indices": [j + 1, j + 1],
                    "array": arr.copy()
                })
                j -= 1
            else:
                break

        arr[j + 1] = key
        steps.append({
            "type": "overwrite",
            "indices": [j + 1, j + 1],
            "array": arr.copy()
        })

    return steps