import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployeeModal from './AddEmployeeModal';

function ManagementEmployeePage() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Chef', image: '', password: '1234' },
    { id: 2, name: 'Jane Smith', role: 'Waiter', image: '', password: 'abcd' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.id.toString().includes(searchQuery)
  );

  return (
    <div className='w-full h-full p-4'>
      <h1 className='text-2xl font-bold mb-4'>Employee Management</h1>
      <div className='flex justify-around mb-4'>
        <input
          type='text'
          placeholder='Search by ID or Name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 w-1/3'
        />
        <button onClick={() => setIsModalOpen(true)} className='bg-blue-500 text-white px-4 py-2 rounded'>
          Add Employee
        </button>
      </div>
      <EmployeeTable employees={filteredEmployees} onRemove={removeEmployee} onUpdate={updateEmployee} />
      <AddEmployeeModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAdd={addEmployee}
      />
    </div>
  );
}

export default ManagementEmployeePage;
