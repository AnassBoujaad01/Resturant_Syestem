import React, { useEffect, useState} from 'react';
import Select from 'react-select';
import Btn from '../../Components/btn';
import { RiPrinterFill } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { SlClock } from "react-icons/sl";
import { GiCancel } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { orderSlice } from '../../Redux/slices/orderSlices/orderSlice';
import DeleteModel from '../../Models/DeleteModel';
import Alert from '@mui/material/Alert';

function DetailsCommand() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order); // Assuming the correct slice is 'orderList'
  const [defaultModePayment, setDefaultModePayment] = useState('');
  const [printCounter, setPrintCounter] = useState(1);
  const [showDeleteModel, setShowDeleteModel] = useState(false); // State for managing the visibility of the delete model
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [alert,setAlert]=useState({severity:'success',text:'Payment processed successfully!'});
  const options = [
    { value: 'cash', label: '💵 Payment cash' },
    { value: 'credit_card', label: '💳 Payment credit card' },
    { value: 'credit', label: '💳 Payment credit' }
  ];
  
  useEffect(() => {
    if (orders.currentOrder) {
      setDefaultModePayment(orders.currentOrder.detailsOrder.modePayment);
    }
  }, [orders.currentOrder]);

 

  const handleSendToPendingList = () => {
  
    if (orders.currentOrder) {
      dispatch(orderSlice.actions.setPendingList(orders.currentOrder));
      setAlert({severity:'info',text:'Send order to pending list successfully!'});
      
      setPaymentProcessed(true);
      setTimeout(() => {
        setPaymentProcessed(false);
      }, 2000);
    }
  };

  const handlePaymentClick = () => {
    // Set state to indicate payment has been processed
    setAlert({severity:'success',text:'Payment processed successfully!'});
    setPaymentProcessed(true);
    setTimeout(() => {
      setPaymentProcessed(false);
    }, 2000);
  };

  const handleModePaymentChange = (value) => {
    if (orders.currentOrder) {
      const updatedDetailsOrder = { ...orders.currentOrder.detailsOrder }; // Create a copy of the detailsOrder object
      updatedDetailsOrder.modePayment = value.trim(); // Update the modePayment property with the trimmed value
      const updatedOrder = { ...orders.currentOrder, detailsOrder: updatedDetailsOrder }; // Create a copy of the current order object with updated detailsOrder
      console.log("Updated order: ", updatedOrder); // Log updated order
      if (updatedOrder) {
        console.log("Dispatching updateOrder action...");
        dispatch(orderSlice.actions.updateOrder({
          orderID: orders.currentOrder.id,
          itemsList: orders.currentOrder.itemsList,
          orderDetails: updatedDetailsOrder
        })); // Dispatch the action with the updated order
      }
    }
  };

  const handleTypeOrderClick = (value) => {
    const updatedDetailsOrder = { ...orders.currentOrder.detailsOrder }; // Create a copy of the detailsOrder object
    updatedDetailsOrder.orderType = value.trim(); // Update the modePayment property with the trimmed value
    const updatedOrder = { ...orders.currentOrder, detailsOrder: updatedDetailsOrder }; // Create a copy of the current order object with updated detailsOrder
    console.log("Updated order: ", updatedOrder); // Log updated order
    if (updatedOrder) {
      console.log("Dispatching updateOrder action...");
      dispatch(orderSlice.actions.updateOrder({
        orderID: orders.currentOrder.id,
        itemsList: orders.currentOrder.itemsList,
        orderDetails: updatedDetailsOrder
      })); // Dispatch the action with the updated order
    }
  };

  //function to set new counter Print 
  const handlePrintCounterClick = (value) => {
    switch (value) {
      case "increment":
        setPrintCounter(prev => prev + 1);
        break;
      case "decrement":
        if (printCounter > 1) {
          setPrintCounter(prev => prev - 1);
        }
        break;
      default:
        break;
    }
  }

  const handleDeleteClick = () => {
  setShowDeleteModel(true); // Show the delete model
};


const handleConfirmDelete = () => {
  const orderID = orders.currentOrder.id;
  if (orderID) {
    dispatch(orderSlice.actions.deleteOrder(orderID));
  }
  setShowDeleteModel(false); // Hide the delete model after confirmation
};

const handleCancelDelete = () => {
  setShowDeleteModel(false); // Hide the delete model
};

  return (
    <div className='relative bg-grayColor select-none h-76 w-full p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-sm font-bold'>Code: {orders.currentOrder ? orders.currentOrder.id : ''}</div>
        <div className='text-sm font-bold'>N Command: {orders.currentOrder && orders.currentOrder.detailsOrder ? `(${orders.currentOrder.detailsOrder.countItems})` : ''}</div>
        <div className='text-sm font-bold'>Price: {orders.currentOrder && orders.currentOrder.detailsOrder ? `${orders.currentOrder.detailsOrder.price} MAD` : ''}</div>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='text-sm font-bold'>Mode Payment:</div>
        <div className="flex items-center w-96">
          <Select onChange={(selectedOption) => handleModePaymentChange(selectedOption.value)}
            className='w-full'
            options={options}
            value={options.find(option => option.value === defaultModePayment)}
            menuPlacement="top"
          />
        </div>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='text-sm font-bold'>Type Command:</div>
        <div className='flex text-sm font-bold gap-7'>
          <button className='px-4 py-2 bg-whiteColor rounded border border-whiteColor hover:border-darkColor' style={{ backgroundColor: orders.currentOrder && orders.currentOrder.detailsOrder && orders.currentOrder.detailsOrder.orderType === 'delivery' ? '#F1B416' : 'white' }}
            onClick={() => handleTypeOrderClick("delivery")} disabled={!orders.currentOrder}>
            <FaMotorcycle className='text-darkColor text-2xl font-bold' />
            <span className="sr-only">Table Order</span> {/* Accessibility */}
          </button>
          <button className='px-4 py-2 bg-whiteColor text-white rounded border border-whiteColor hover:border-darkColor' style={{ backgroundColor: orders.currentOrder && orders.currentOrder.detailsOrder && orders.currentOrder.detailsOrder.orderType === 'table' ? '#F1B416' : 'white' }}
            onClick={() => handleTypeOrderClick("table")} title="" disabled={!orders.currentOrder}>
            <MdTableRestaurant className='text-darkColor text-2xl font-bold' />
            <span className="sr-only">Delivery Order</span> {/* Accessibility */}
          </button>
        </div>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className="flex items-center w-48">
          <Btn icon={RiPrinterFill}  text="Print" color="blueColor" Key={0}/>
        </div>
        <div className='flex items-center w-48 ml-7'>
          <button className='px-5 py-2 bg-blueColor text-white rounded-l' title="" onClick={() => handlePrintCounterClick('decrement')}>-</button>
          <input
            id="priceInput"
            type="text"
            placeholder='Print'
            className="px-4 py-2 bg-gray-300 w-24 text-center font-bold "
            value={`0${printCounter}`}
            readOnly
          />
          <button className='px-5 py-2 bg-blueColor text-white rounded-r' title="" onClick={() => handlePrintCounterClick('increment')}>+</button>
        </div>
      </div>

      <div className='flex justify-center gap-8 mt-5'>
        <Btn icon={BsCash} color={"greenColor"} text={"Payment"} onClick={handlePaymentClick} Disabled={!orders.currentOrder} Key={1} />
        <Btn icon={SlClock} color={"yellowColor"} text={"Pending"} onClick={handleSendToPendingList} Disabled={!orders.currentOrder} Key={2} />
        <Btn icon={GiCancel} color={"redColor"} text={"Cancel"}  onClick={handleDeleteClick} Disabled={!orders} Key={3} />
      </div>

     {/* Integrate the DeleteModel component */}
     {orders.currentOrder && showDeleteModel && (
        <DeleteModel
          text ={`Are you sure you want to delete Order ${orders.currentOrder.id} ?`}
          isOpen={showDeleteModel}
          onClose={() => setShowDeleteModel(false)}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {paymentProcessed && (
  <Alert severity={alert.severity} className='fixed bottom-10 right-[150px] font-bold'>{alert.text}</Alert>
)}

    </div>
  );
}

export default DetailsCommand;
