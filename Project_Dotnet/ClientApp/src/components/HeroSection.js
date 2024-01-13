import React, { useState } from 'react';
import { Button } from './Button';
import './HeroSection.css';
import BookingComponent from './BookingComponent';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function HeroSection() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setShowLogin((prevShowLogin) => !prevShowLogin);
        setShowSignup(false);
    };

    const handleSignupClick = () => {
        setShowSignup((prevShowSignup) => !prevShowSignup);
        setShowLogin(false);
    };
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    return (
        <div className='hero-container position-relative' id="homesection">
            <video src='/videos/video-1.mp4' autoPlay loop muted />

            <h1>ADVENTURE AWAITS</h1>
            <p>What are you waiting for?</p>

            <div className='hero-btns'>
                {isLoggedIn ? (
                    <Button
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >
                        BOOK NOW
                    </Button>
                ) : (
                    <>
                        <Button
                            className='btns'
                            buttonStyle='btn--outline'
                            buttonSize='btn--large'
                            onClick={handleLoginClick}
                        >
                            LOGIN
                        </Button>
                        <Button
                            className='btns'
                            buttonStyle='btn--primary'
                            buttonSize='btn--large'
                            onClick={handleSignupClick}
                        >
                            SIGNUP
                        </Button>
                    </>
                )}
            </div>

            {showLogin && <LoginPage onLoginSuccess={handleLoginSuccess} />}
            {showSignup && <SignupPage />}

            <BookingComponent />
        </div>
    );
}

export default HeroSection;
