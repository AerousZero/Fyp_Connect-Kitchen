import React from 'react';
import Navbar from '../../../components/NavBar';
import Banner from '../../../components/Banner/Banner';
import TabList from '../TabList/Tablist';
import Footer from '../../../components/Footer';


function ChefHome() {
  return (
    <div className="mt-5"> 
      <Navbar />
      <main className='container mx-auto mt-10'>
        <Banner />
        <TabList />
        
      </main>
      <Footer />
    
    </div>
  );
}

export default ChefHome;
