import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from "react-router-dom"
import HeroSection from '../components/HeroSection/HeroSection';


const Portal=()=> {
  return (
    <>
          <Outlet />
          <Navbar />
          <HeroSection />
    </>
    
  );
}

export default Portal;

