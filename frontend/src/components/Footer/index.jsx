import React from 'react';

function Footer() {
  return (
    <footer className="container mx-auto bg-gray-800 text-gray-300 py-6 mt-10 mb-5 rounded">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Connect Kitchen</h2>
          <ul className="list-none">
            <li><a href="#" className="text-sm hover:text-gray-400">About Us</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Careers</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Press</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Blog</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Resources</h2>
          <ul className="list-none">
            <li><a href="#" className="text-sm hover:text-gray-400">Help & Support</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Trust & Safety</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Terms of Service</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Connect</h2>
          <ul className="list-none">
            <li><a href="#" className="text-sm hover:text-gray-400">Facebook</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Twitter</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">LinkedIn</a></li>
            <li><a href="#" className="text-sm hover:text-gray-400">Instagram</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm">Email: ConnectKitchen@example.com</p>
          <p className="text-sm">Phone: +123456789</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
