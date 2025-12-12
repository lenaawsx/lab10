

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_iA9VPuQxzIyYq885ouWgAF4vAjO8lOCBgAu41RLnxINY6wsiLySoFkaXVSBkbCWU';

export const fetchImages = async (limit = 12, page = 1, category_id = null) => {
    let url = `${API_URL}?limit=${limit}&page=${page}`;
    if (category_id) url += `&category_ids=${category_id}`;

    const response = await fetch(url, {
        headers: { 'x-api-key': API_KEY }
    });
    if (!response.ok) throw new Error('Ошибка загрузки');
    return await response.json();
};

export const fetchCategories = async () => {
    const res = await fetch('https://api.thecatapi.com/v1/categories', {
        headers: { 'x-api-key': API_KEY }
    });
    if (!res.ok) throw new Error('Ошибка загрузки категорий');
    return await res.json();
};

