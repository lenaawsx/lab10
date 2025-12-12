import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api/thecatapi';

export default function SearchBar({ setQuery, setCategory, setOrder }) {
    const [categories, setCategories] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchCategories()
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(input);

        const found = categories.find(cat =>
            cat.name.toLowerCase().includes(input.toLowerCase())
        );
        setCategory(found ? found.id : null);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Введите текст для поиска"
                value={input}
                onChange={handleInput}
            />
            <button type="submit">Поиск</button>

            <select onChange={e => setCategory(e.target.value || null)}>
                <option value="">Все категории</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            <select onChange={e => setOrder(e.target.value)}>
                <option value="RANDOM">Случайно</option>
                <option value="ASC">Старые → новые</option>
                <option value="DESC">Новые → старые</option>
            </select>
        </form>
    );
}
