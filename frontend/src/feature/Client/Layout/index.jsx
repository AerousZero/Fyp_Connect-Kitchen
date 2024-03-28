import React from 'react';
import Navbar from '../../../components/NavBar';
import Footer from '../../../components/Footer';


function ClientLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default ClientLayout;
