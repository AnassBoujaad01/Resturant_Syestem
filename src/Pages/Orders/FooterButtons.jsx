// FooterButtons.js
import React from 'react';
import Btn from '../../Components/btn';
import { RiPrinterFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { ImCheckboxUnchecked } from "react-icons/im";

function FooterButtons({Page}) {
  return (
    <footer className='flex justify-center items-center gap-40'>
      <Btn icon={BiSolidSelectMultiple} color={"blueColor"} text={"CHECK ALL"} />
      <Btn icon={ImCheckboxUnchecked} color={"yellowColor"} text={"UNCHECK ALL"} />
      {Page==='Payment'? null :<Btn icon={IoIosSend} color={"greenColor"} text={"SEND TO CASHIER"} />
}      <Btn icon={RiPrinterFill} color={"blueColor"} text={"PRINT RESU"} />
    </footer>
  );
}

export default FooterButtons;
