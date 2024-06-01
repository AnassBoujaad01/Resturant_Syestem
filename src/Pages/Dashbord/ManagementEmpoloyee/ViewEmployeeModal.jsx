import React, { useState } from 'react';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';

Modal.setAppElement('#root');

function ViewEmployeeModal({ isOpen, onRequestClose, employee }) {
  const [selectedDate, setSelectedDate] = useState('');
  
  // Example data for charts and cards
  const workHours = {
    date: '2024-06-01',
    start: '09:00 AM',
    end: '05:00 PM',
    totalHours: 8,
  };
  const salesData = {
    paid: 1500,
    pending: 200,
    orders: [
      { id: 1, date: '2024-06-01', time: '10:00 AM', price: 20, items: [{ name: 'Pizza', quantity: 2, price: 10, image: 'pizza.jpg' }] },
      { id: 2, date: '2024-06-01', time: '12:00 PM', price: 30, items: [{ name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg' }] },
      { id: 3, date: '2024-06-01', time: '10:00 AM', price: 20, items: [{ name: 'Pizza', quantity: 2, price: 10, image: 'pizza.jpg' }] },
      { id: 4, date: '2024-06-01', time: '12:00 PM', price: 30, items: [{ name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg' }, { name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg' }, { name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg',status:'💵Paid' }] },
      { id: 4, date: '2024-06-01', time: '12:00 PM', price: 30, items: [{ name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg' }, { name: 'Burger', quantity: 3, price: 10, image: 'burger.jpg' }, { name: 'Burger', quantity: 3, price: 10, image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=300' }] },
    ],
  };
  const chartData = {
    labels: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'],
    datasets: [
      {
        label: 'Sales',
        data: [20, 30, 50, 40, 70],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Function to calculate the duration of work
  const calculateWorkDuration = () => {
    const start = new Date(`2024-06-01 ${workHours.start}`);
    const end = new Date(`2024-06-01 ${workHours.end}`);
    const diff = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
    return diff.toFixed(2); // Convert to fixed decimal points
  };

  // Function to create a visual representation of work hours
  const renderWorkHours = () => {
    const duration = calculateWorkDuration();
    const start = new Date(`2024-06-01 ${workHours.start}`).getHours();
    const end = new Date(`2024-06-01 ${workHours.end}`).getHours();
    const timeline = [];

    for (let i = 0; i < 24; i++) {
      if (i >= start && i <= end) {
        if (i === start) {
          timeline.push(
            <div key={i} className="hour-dot start-dot"></div>
          );
        } else if (i === end) {
          timeline.push(
            <div key={i} className="hour-dot end-dot"></div>
          );
        } else {
          timeline.push(
            <div key={i} className="hour-dot"></div>
          );
        }
      } else {
        timeline.push(
          <div key={i} className="hour-dot inactive-dot"></div>
        );
      }
    }

    return (
      <div className="work-hours">
        <div className="timeline">{timeline}</div>
        <div className="work-duration">Work Duration: {duration} hours</div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Employee"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content flex">
        <div className="modal-left p-4 flex-1">
          <div className="flex justify-center">
            <img src={employee.image} alt={employee.name} className='w-[50%] h-32 object-cover rounded-full' />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{employee.name}</h3>
            <p className="text-gray-500">{employee.role}</p>
          </div>
          <hr className="my-6" />
          <div>
            <label className="block text-sm">Password</label>
            <p>{employee.password}</p>
          </div>
          <div>
            <label className="block text-sm">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="modal-right p-4 flex-1">
          <div>
            {renderWorkHours()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Sales</h3>
            <div className="flex justify-between">
              <div className="bg-green-500 text-white p-4 rounded w-1/2 mr-2">
                <h4 className="text-md">Paid</h4>
                <p>{salesData.paid} MAD</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded w-1/2">
                <h4 className="text-md">Pending</h4>
                <p>{salesData.pending} MAD</p>
              </div>
            </div>
            <Line data={chartData} />
          </div>
        </div>
      </div>

      <div className="p-4">
  <h3 className="text-lg font-semibold">Orders</h3>
  <div className="h-80 overflow-y-scroll">
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-justify">ID</th>
          <th className="py-2 px-4 border-b text-justify">Date</th>
          <th className="py-2 px-4 border-b text-justify">Time</th>
          <th className="py-2 px-4 border-b text-justify">Price</th>
          <th className="py-2 px-4 border-b text-justify">Details</th>
        </tr>
      </thead>
      <tbody>
        {salesData.orders.map(order => (
          <tr key={order.id}>
            <td className="py-2 px-4 border-b">{order.id}</td>
            <td className="py-2 px-4 border-b">{order.date}</td>
            <td className="py-2 px-4 border-b">{order.time}</td>
            <td className="py-2 px-4 border-b">{order.price} MAD</td>
            <td className="py-2 px-4 border-b ">
              <div className="mt-2 ">
                {order.items.map((item, index) => (
                  <div key={index} className="ml-4 border rounded p-2 flex items-center">
                    <img src={item.image} alt={item.name} className="w-10 h-10 mr-2 rounded-full" />
                    <div>
                      <p>{item.name} - {item.quantity} x ${item.price}</p>
                      <p>Status: {item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  </Modal>
);
}

export default ViewEmployeeModal;

