import React from 'react';
import { Button } from '../Button/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='./../videos/video-2.mp4' autoPlay loop muted />
      <h1>Un momento para</h1>
      <br/>
      <br/>
      <br/>
      <h1> asegurar el valor</h1>
      <p>¿Qué estas esperando?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          INICIA YA
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
