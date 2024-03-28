import React from 'react'
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner/Banner';
import ClientNavbar from './SecondaryNavbar';
import JobList from './Jobs';
import ClientLayout from './Layout';

function ClientHome() {
  return (
   <ClientLayout>
    <Banner/>
    <ClientNavbar/>
    <JobList/>
   </ClientLayout>
  );
}

export default ClientHome
