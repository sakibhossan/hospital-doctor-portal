import React from 'react';
import Banner from './Banner/Banner';
import Footer from '../Shared/Footer';
import FormContact from './Banner/FormContact';
import MakeAppoinment from './Banner/MakeAppoinment';
import Testimonial from './Banner/Testimonial';
import Info from './Info/Info';
import SecondBanner from './SecondBanner';
import Services from './Services';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Info></Info>
          <Services></Services>
          <SecondBanner></SecondBanner>
          <MakeAppoinment></MakeAppoinment>
          <Testimonial></Testimonial>
          <FormContact></FormContact>
          <Footer></Footer>
        </div>
    );
};

export default Home;