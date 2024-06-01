import React, { useState } from 'react';
import LOGO from '../../Image/Logo.png';
import SearchInputs from './SearchInputs';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Navbar from '../Caisse/Navbar';
function CashierPage() {
  const [currentSection, setCurrentSection] = useState('Shift');
  const [title, setTitle] = useState("RESTURANT SYSTEM-MANAGEMENT");
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navbar/>
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-32 p-4 space-y-4">
        
        <nav className="space-y-7">
            <button
              onClick={() => setCurrentSection('orders')}
              className={`block py-2 px-2 rounded space-x-4 ${currentSection === 'orders' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <ReceiptLongIcon fontSize="large"/>
                Orders
            </button>
            <button
              onClick={() => setCurrentSection('bills')}
              className={`block py-2 px-4 rounded  space-x-2 ${currentSection === 'bills' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <span>Bills</span>
            </button>
            <button
              onClick={() => setCurrentSection('shift')}
              className={`block py-2 px-6 rounded space-x-4  ${currentSection === 'shift' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <ManageAccountsIcon fontSize="large" />
                Shift
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-100">
       
          {currentSection === 'bills' && <BillsSection />}
          {currentSection === 'shift' && <ShiftSection />}
        </div>
      </div>
    </div>
  );
}


function BillsSection() {
  // Example bills data
  const bills = [
    { id: 1, table: 5, total: '$15', status: 'Paid' },
    { id: 2, table: 3, total: '$20', status: 'Pending' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bills</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Table</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id}>
                <td className="py-2 px-4 border-b">{bill.table}</td>
                <td className="py-2 px-4 border-b">{bill.total}</td>
                <td className="py-2 px-4 border-b">{bill.status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                  <button className="ml-2 text-red-500 hover:text-red-700">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShiftSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shift Management</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Start Shift</button>
        </div>
        <div>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">End Shift</button>
        </div>
      </div>
    </div>
  );
}

export default CashierPage;
