import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SearchInputs from "../Employee/SearchInputs";

const OrdersSection = () => {
  // Example orders data
  const orders = [
    { id: 1216515151771, quantity: 5, total: '200MAD', date: '15/05/2024', time: '12:30:01', statut: '💵Paid' },
    { id: 2515251561651, quantity: 3, total: '150MAD', date: '15/05/2024', time: '12:30:01', statut: '💵Paid' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className='my-7'><SearchInputs /></div>

      <div className="bg-white p-4 rounded shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order Id</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-4 px-4 border-b">{order.id}</td>
                <td className="py-4 px-4 border-b">{order.quantity}</td>
                <td className="py-4 px-4 border-b">{order.total}</td>
                <td className="py-4 px-4 border-b">{order.date}</td>
                <td className="py-4 px-4 border-b">{order.time}</td>
                <td className="py-4 px-4 border-b">{order.statut}</td>
                <td className="py-4 flex justify-around items-center border-b">
                  <button className="text-blue-500 hover:text-blue-700"><RemoveRedEyeIcon fontSize='large' /></button>
                  <button className="text-green-500 hover:text-green-700"><PointOfSaleIcon fontSize='large' /></button>
                  <button className="text-gray-400 hover:text-gray-600"><LocalPrintshopIcon fontSize='large' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSection;
