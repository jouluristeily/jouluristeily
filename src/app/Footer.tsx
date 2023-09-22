import React from 'react';

const Footer = () => (
  <div
    className="bg-white text-center"
    style={{
      outline: '5px dashed yellow',
      boxShadow: '0 0 0 5px red',
    }}
  >
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0">
        <div className="md:flex-grow">
          <a
            href="https://www.facebook.com/jouluristeily"
            className="text-base text-gray-700 hover:underline mx-2"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/jouluristeily/"
            className="text-base text-gray-700 hover:underline mx-2"
          >
            Instagram
          </a>
        </div>
      </div>
      <p className="text-base text-gray-700">Jouluristeily 2023</p>
    </div>
  </div>
);

export default Footer;
