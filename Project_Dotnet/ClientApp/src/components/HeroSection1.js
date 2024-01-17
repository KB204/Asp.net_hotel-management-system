import React from 'react';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-scroll';
import BookingComponent from './BookingComponent';


function HeroSection1() {

    const handleBookNow = (e) => {
        // Scroll down to the RoomCategory component
        e.preventDefault();
    };

    return (
        <div className='hero-container position-relative' id="homesection">
            <video src='/videos/video-1.mp4' autoPlay loop muted />

            <h1>ADVENTURE AWAITS</h1>
            <p>Welcome</p>

            <div className='hero-btns'>
                <>
                    <Button
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >
                        <Link
                            to="servicesSection"
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Book Now
                        </Link>
                    </Button>
                </>
            </div>


            <BookingComponent />
        </div>
    );
}

export default HeroSection1;
