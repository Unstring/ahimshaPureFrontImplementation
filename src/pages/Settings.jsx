import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/constants';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link 
          to={ROUTES.SETTINGS.BANNERS}
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold">Banner Management</h2>
          <p className="text-gray-600">Manage announcement banners</p>
        </Link>
        {/* Add other settings cards here */}
      </div>
    </div>
  );
};

export default Settings; 