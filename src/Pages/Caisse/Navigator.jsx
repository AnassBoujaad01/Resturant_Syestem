import React, { useEffect, useRef, useState } from 'react';
import Window from '../../Components/Window';
import './Assets/Navigator.css'; // Import the CSS file for custom scrollbar styling
import { FiPlus } from "react-icons/fi"; // Assuming you have an icon for removing windows
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice } from '../../Redux/slices/orderSlices/orderSlice';
import DeleteModel from '../../Models/DeleteModel'; // Import the DeleteModel component

function Navigator() {
  const dispatch = useDispatch();
  const [selectedWindow, setSelectedWindow] = useState(null);
  const currentWindow = useSelector(state => state.order.currentOrder);
  const navigatorRef = useRef(null); // Define the navigatorRef
  const windowList = useSelector(state => state.order.orderList); // Assuming Redux state structure
  const [showDeleteModel, setShowDeleteModel] = useState(false); // State for managing the visibility of the delete model

  useEffect(() => {
    if (navigatorRef.current) {
      navigatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [windowList]);


  const handleWindowClick = (id) => {
    dispatch(orderSlice.actions.orderSelect(id));
    setSelectedWindow(id);
    console.log("Clicked window on navigator :", id)
  };

  const handleAddWindowClick = async () => {
    // Dispatch the addOrder action asynchronously
    dispatch(orderSlice.actions.addOrder());
  };

  const handleRemoveWindow = (id) => {
    setShowDeleteModel(true); // Show the delete model
    setSelectedWindow(id);
  };

  // Function to handle confirmation of delete action
  const handleConfirmDelete = () => {
    if (selectedWindow !== null || selectedWindow !== undefined) {
      dispatch(orderSlice.actions.deleteOrder(selectedWindow));
      setSelectedWindow(currentWindow.id);
      setShowDeleteModel(false); // Hide the delete model after confirmation
    }
  };

  // Function to handle cancellation of delete action
  const handleCancelDelete = () => {
    setShowDeleteModel(false); // Hide the delete model
  };

  return (
    <div className='flex h-30 pt-1 w-full overflow-x-auto overflow-y-hidden border-b-4 border-yellowColor custom-scrollbar'>
      <div className="flex flex-grow">
        {windowList && windowList.map((item, index) => (
          <Window key={item.id} id={item.id} title={`order:${item.id}`} isSelected={currentWindow.id === item.id} onClick={handleWindowClick} onDelete={handleRemoveWindow} />
        ))}
      </div>

      <button className='flex items-center justify-center w-14 text-2xl bg-whiteColor text-darkColor' ref={navigatorRef} onClick={handleAddWindowClick}>
        <FiPlus className='w-16 text-2xl' />
      </button>

      {/* Integrate the DeleteModel component */}
      {currentWindow && showDeleteModel && (
        <DeleteModel
          text={`Are you sure you want to delete Order ${currentWindow.id} ?`}
          isOpen={showDeleteModel}
          onClose={() => setShowDeleteModel(false)}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Navigator;

