async function fetchSortSteps(algorithm, array) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                algorithm: algorithm,
                array: array
            })
        });

        const data = await response.json();
        return data.steps || [];
    } catch (error) {
        console.error('Lỗi kết nối BackEnd:', error);
        return [];
    }
}