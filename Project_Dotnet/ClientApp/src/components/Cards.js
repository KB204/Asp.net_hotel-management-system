import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out these EPIC services!</h1>
            <div className='cards__container' id="servicesSection">
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src='images/img-9.jpg'
                            text='Revitalize Your Essence, Renew Your Soul.'
                            label='SPA'
                            path='/services'
                        />
                        <CardItem
                            src='images/img-2.jpg'
                            text='Room with luxury view.'
                            label='Luxury rooms'
                            path='/services'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src='images/img-3.jpg'
                            text='Dive into Luxury, Make a Splash in Style.'
                            label='Pools'
                            path='/services'
                        />
                        <CardItem
                            src='images/img-4.jpg'
                            text='Savor the Moment, Sip the Experience.'
                            label='Restaurant'
                            path='/products'
                        />
                        <CardItem
                            src='images/img-8.jpg'
                            text='Explore the Beauty.'
                            label='Adrenaline'
                            path='/sign-up'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;