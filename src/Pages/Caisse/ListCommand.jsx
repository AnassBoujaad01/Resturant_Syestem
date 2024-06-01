import React, { useEffect, useState } from 'react';
import Command from '../../Components/Command';
import { useSelector, useDispatch } from 'react-redux';
import { orderSlice } from '../../Redux/slices/orderSlices/orderSlice';
import Alert from '@mui/material/Alert';

function ListCommand() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order); // Assuming the correct slice is 'orderList'
    const [activeUpdateId, setActiveUpdateId] = useState(null);
    const [alertProcessed, setAlertProcessed] = useState(false);
    const [alert,setAlert]=useState({severity:'error',text:'remove item successfully!'});
    const toggleUpdate = (id) => {
        setActiveUpdateId(id === activeUpdateId ? null : id);
    };

    const toggleDelete = (id) => { // Corrected function name
        dispatch(orderSlice.actions.deleteItems(id));
        
        setAlert({severity:'error',text:'remove item successfully!'});
        setAlertProcessed(true);
        setTimeout(() => {
        setAlertProcessed(false);
      }, 2000);
    }



    return (
        <div className='w-full h-full'>
            <div className='flex items-center bg-gray-200 rounded-t-lg p-4 cursor-default select-none'>
                <div className='w-2/4 text-center font-bold text-darkColor'>Items</div>
                <div className='w-1/4 text-center font-bold text-darkColor'>Quantity</div>
                <div className='w-1/4 text-center font-bold text-darkColor'>Price</div>
                <div className='w-1/4 text-center font-bold text-darkColor'>Operation</div>
            </div>
            <div className="w-full h-[600px]" style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {orders && orders.currentOrder && orders.currentOrder.itemsList.map((item, index) => (
                    <Command
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        Qte={item.quantity}
                        Price={item.price}
                        updateHandler={toggleUpdate}
                        activeUpdateId={activeUpdateId}
                        deleteHandler={() => toggleDelete(item.id)} // Pass as a function reference
                    />
                ))}
            </div>
            {alertProcessed && (
                <Alert severity={alert.severity} className='fixed bottom-10 right-[150px] font-bold'>{alert.text}</Alert>
)}
        </div>
    );
}

export default ListCommand;
