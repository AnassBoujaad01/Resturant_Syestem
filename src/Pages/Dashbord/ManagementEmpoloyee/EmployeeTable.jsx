import React, { useState, useRef } from 'react';
import ViewEmployeeModal from './ViewEmployeeModal';
import UpdateEmployeeModal from './UpdateEmployeeModal';


function EmployeeTable({ employees, onRemove, onUpdate }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateModalOpen(true);
  };

  const PrintableEmployeeDetails=()=>{

  }


  return (
    <div>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>ID</th>
            <th className='py-2 px-4 border-b'>Image</th>
            <th className='py-2 px-4 border-b'>Name</th>
            <th className='py-2 px-4 border-b'>Role</th>
            <th className='py-2 px-4 border-b'>Password</th>
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td className='py-2 px-4 border-b'>{employee.id}</td>
              <td className='py-2 px-4 border-b'>
                <img src={employee.image} alt={employee.name} className='w-16 h-16 object-cover rounded-full' />
              </td>
              <td className='py-2 px-4 border-b'>{employee.name}</td>
              <td className='py-2 px-4 border-b'>{employee.role}</td>
              <td className='py-2 px-4 border-b'>{employee.password}</td>
              <td className='py-2 px-4 border-b'>
                <button
                  onClick={() => handleView(employee)}
                  className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(employee)}
                  className='bg-yellow-500 text-white px-4 py-2 rounded mr-2'
                >
                  Update
                </button>
                <button
                  onClick={() => onRemove(employee.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded mr-2'
                >
                  Remove
                </button>
               
                <button className='bg-green-500 text-white px-4 py-2 rounded'>
                    Print
                </button>
                
                <div style={{ display: 'none' }}>
                  <PrintableEmployeeDetails  employee={employee} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <>
          <ViewEmployeeModal
            isOpen={isViewModalOpen}
            onRequestClose={() => setIsViewModalOpen(false)}
            employee={selectedEmployee}
          />
          <UpdateEmployeeModal
            isOpen={isUpdateModalOpen}
            onRequestClose={() => setIsUpdateModalOpen(false)}
            employee={selectedEmployee}
            onUpdate={onUpdate}
          />
        </>
      )}
    </div>
  );
}

export default EmployeeTable;
