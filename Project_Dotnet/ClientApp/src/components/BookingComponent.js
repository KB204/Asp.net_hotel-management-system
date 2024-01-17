import React, { useState } from 'react';
import './BookingComponent.css';

function BookingComponent({ bookingCallback }) {
    


    return (
        <div className="container-fluid booking pb-5 wow fadeIn position-absolute" data-wow-delay="0.1s" style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeIn' }}>
            <div className="container">
                <div className="bg-white shadow" style={{ padding: '35px' }}>
                   
                    <div className="animate-charcter" >
                        <h1>Riad Royale</h1>
                    </div> 
                </div>
            </div>

        </div>
    );
}

export default BookingComponent;
