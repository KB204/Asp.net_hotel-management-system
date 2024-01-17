// RoomCategoryItem.js
import React from 'react';

function RoomCategoryItem({ src, text, label, path, onSelect }) {
    const handleClick = () => {
        onSelect(); // Call the onSelect function provided by the parent component
    };

    return (
        <li className='cards__item'>
            <div className='cards__item__link' onClick={handleClick}>
                <figure className='cards__item__pic-wrap' data-category={label}>
                    <img className='cards__item__img' alt='Travel Image' src={src} />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{text}</h5>
                </div>
            </div>
        </li>
    );
}

export default RoomCategoryItem;
