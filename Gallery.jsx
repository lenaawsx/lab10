import React, { useState, useEffect, useCallback } from 'react';
import ImageItem from './ImageItem';
import SearchBar from './SearchBar';
import { fetchImages } from '../api/thecatapi';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(null);
    const [order, setOrder] = useState('RANDOM');

    const IMAGES_PER_PAGE = 12;

    const loadImages = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            let newImages = await fetchImages(IMAGES_PER_PAGE, page, category);
            // сортировка вручную
            if (order === 'ASC') newImages.sort((a,b) => a.id.localeCompare(b.id));
            else if (order === 'DESC') newImages.sort((a,b) => b.id.localeCompare(a.id));

            setImages(prev => [...prev, ...newImages]);
            setPage(prev => prev + 1);
        } catch (err) {
            setError('Ошибка загрузки');
        } finally {
            setLoading(false);
        }
    }, [page, category, order, loading]);

    useInfiniteScroll(loadImages);

    useEffect(() => {
        setImages([]);
        setPage(1);
        loadImages();
    }, [category, query, order]);

    return (
        <div className="app-container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Галерея котиков 🐱</h1>
            <SearchBar setQuery={setQuery} setCategory={setCategory} setOrder={setOrder} />
            {error && <p>{error}</p>}

            <div className="gallery-grid">
                {images.map(img => (
                    <ImageItem key={img.id} image={img} />
                ))}
            </div>

            {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Загрузка...</p>}
        </div>
    );
}
