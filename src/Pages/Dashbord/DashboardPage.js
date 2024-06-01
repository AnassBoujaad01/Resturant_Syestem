import React, { useState } from 'react';
import Navbar from '../Caisse/Navbar';
import Overview from './Overview';
import OrdersSection from './OrdersSection';
import ManagemntProductPage from './ManagementProduct/ManagemntProductPage';
import ManagementEmployeePage from './ManagementEmpoloyee/ManagementEmployeePage';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function DashboardPage() {
  const [currentSection, setCurrentSection] = useState('overview');

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-20 p-4 space-y-4 flex flex-col items-center">
          <nav className="space-y-7 flex-1">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`flex items-center py-2 px-2 rounded relative ${currentSection === 'overview' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <QueryStatsIcon fontSize="large" />
              {currentSection === 'overview' && <span className="absolute left-20 bg-gray-700 bg-opacity-70 font-bold text-white-700 px-2 py-1 rounded z-50">Overview</span>}
            </button>
            <button
              onClick={() => setCurrentSection('ManagementProduct')}
              className={`flex items-center py-2 px-2 rounded relative ${currentSection === 'ManagementProduct' ? 'bg-gray-700' : 'hover:bg-gray-700 '}`}
            >
              <ShoppingCartIcon fontSize="large" />
              {currentSection === 'ManagementProduct' && <span className="absolute left-20 bg-gray-700 bg-opacity-70 font-bold text-white-700 px-2 py-1 rounded z-50">Management Product</span>}
            </button>
            <button
              onClick={() => setCurrentSection('orders')}
              className={`flex items-center py-2 px-2 rounded relative ${currentSection === 'orders' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <ReceiptLongIcon fontSize="large" />
              {currentSection === 'orders' && <span className="absolute left-20 bg-gray-700 bg-opacity-70 font-bold text-white-700 px-2 py-1 rounded z-50">Orders</span>}
            </button>
            <button
              onClick={() => setCurrentSection('ManagementEmployee')}
              className={`flex items-center py-2 px-2 rounded relative ${currentSection === 'ManagementEmployee' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <SupervisorAccountIcon fontSize="large" />
              {currentSection === 'ManagementEmployee' && <span className="absolute left-20 bg-gray-700 bg-opacity-70 font-bold text-white-700 px-2 py-1 rounded z-50">Management Employee</span>}
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-100">
          {currentSection === 'overview' && <Overview />}
          {currentSection === 'orders' && <OrdersSection />}
          {currentSection === 'ManagementProduct' && <ManagemntProductPage />}
          {currentSection === 'ManagementEmployee' && <ManagementEmployeePage />}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
