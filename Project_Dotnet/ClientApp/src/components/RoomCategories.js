import React, { useState } from 'react';
import './RoomCategories.css';
import RoomCategoryItem from './RoomCategoryItem';
import RoomList from './RoomList';

function RoomCategories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (categoryId) => {
        console.log('Selected category:', categoryId);
        setSelectedCategory(categoryId);
    };

    // If a category is selected, render the RoomList component
    if (selectedCategory) {
        return <RoomList category={selectedCategory} />;
    }

    // If no category is selected, render the RoomCategories component
    return (
        <div className='cards'>
            <h1>Choose Your Room Category</h1>
            <div className='cards__container' id="servicesSection">
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <RoomCategoryItem
                            src='images/category-img-2.jpg'
                            text='Standard Room'
                            label='2 guests'
                            path={`/standard-room/${selectedCategory}`}
                            onSelect={() => handleCategorySelect(1)}
                        />
                        <RoomCategoryItem
                            src='images/category-img-1.jpg'
                            text='Deluxe Room'
                            label='3 guests'
                            path={`/deluxe-room/${selectedCategory}`}
                            onSelect={() => handleCategorySelect(2)}
                        />
                        <RoomCategoryItem
                            src='images/category-img-2.jpg'
                            text='Suite'
                            label='4 guests'
                            path={`/suite-room/${selectedCategory}`}
                            onSelect={() => handleCategorySelect(3)}
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RoomCategories;
