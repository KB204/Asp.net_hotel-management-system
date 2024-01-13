import React, { Component } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Cards from './components/Cards';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <NavBar />
                <HeroSection />
                <Cards />
            </>
        );
    }
}
