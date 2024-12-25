import React from 'react';
import { Link } from 'react-router-dom';
import gheeJarImage from '../assets/ghee-jar.png';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pure & Traditional Ghee
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Experience the authentic taste of traditionally made ghee, crafted with care and premium ingredients.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Shop Now
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
            <img
              src={gheeJarImage}
              alt="Premium Ghee Jar"
              className="max-w-md w-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Pure & Natural
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Made from the finest quality milk, with no additives or preservatives.
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Traditional Process
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Crafted using time-tested traditional methods for authentic taste.
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Health Benefits
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Rich in nutrients and beneficial properties for overall wellness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 