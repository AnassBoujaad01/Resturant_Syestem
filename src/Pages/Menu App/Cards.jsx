import React from 'react';
import MenuCard from '../../Components/MenuCard';
import { SiDash } from "react-icons/si";
import { RiFileList3Fill } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Cards() {
  return (
    <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 pt-12 px-6 sm:px-12 md:px-24'>
      <MenuCard Icon={SiDash} Title={'Dashboard'} Color={'#1E90FF'} Details={'Manage orders, overview, employees, menu items, inventory, etc.'} />

      <MenuCard Icon={RiFileList3Fill} Title={'Orders List'} Color={'#FF6347'} Details={'View and manage orders, including pending, paid, canceled, and removed orders.'} />

      <MenuCard Icon={BsPersonVideo3} Title={'Employees'} Color={'#8A2BE2'} Details={'Track employee work hours, starting and ending shifts, and cashier operations.'} />

      <MenuCard Icon={FaCashRegister} Title={'Cashier'} Color={'#32CD32'} Details={'Open and manage cashiers, record sales, and track cash transactions.'} />

      <MenuCard Icon={FiLogOut} Title={'Sign Out'} Color={'#FFD700'} Details={'Logout from the system and end the current session.'} />
    </div>
  );
}

export default Cards;
