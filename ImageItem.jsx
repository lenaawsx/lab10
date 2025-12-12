import React, { useState } from 'react';

export default function ImageItem({ image }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="image-card" onClick={() => setIsOpen(true)}>
                <img src={image.url} alt="cat" />
            </div>

            {isOpen && (
                <div className="modal active" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setIsOpen(false)}>&times;</span>
                        <img src={image.url} alt="cat" />
                    </div>
                </div>
            )}
        </>
    );
}
