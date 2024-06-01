import React, { useState } from 'react';
import { FaPen } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import UpdateCommand from './UpdateCommand';

function Command({ id, image, name, Qte, Price, updateHandler, activeUpdateId, deleteHandler }) {
    const [isUpdateCommandVisible, setUpdateCommandVisibility] = useState(false);

    const handleUpdateClick = () => {
        setUpdateCommandVisibility(!isUpdateCommandVisible); // Toggle visibility
    };

    const handleDeleteClick = () => {
        deleteHandler();
    };

    return (
        <div className={`relative flex items-center bg-whiteColor rounded-t-lg p-4 cursor-default select-none border-b border-grayColor hover:bg-grayColor`}>
            <div className='w-2/4 flex items-center'>
                <img src={image} alt="" className='w-1/4 h-auto mr-2 rounded-md' />
                <div className='w-3/4'>{name}</div>
            </div>
            <div className='w-1/4 text-center font-bold'>{Qte}</div>
            <div className='w-1/4 text-center font-bold'>{Price}</div>
            <div className='w-1/4 flex justify-center gap-5'>
                <button onClick={handleUpdateClick}>
                    {isUpdateCommandVisible ? <div className='text-yellowColor text-2xl'>X</div> : <FaPen className='text-yellowColor text-2xl' />}
                </button>
                <button onClick={handleDeleteClick}><ImBin2 className='text-redColor text-2xl' /></button>
            </div>
            {isUpdateCommandVisible && <UpdateCommand id={id} image={image} name={name} Qte={Qte} Price={Price} onClose={() => setUpdateCommandVisibility(false)} />} {/* Render UpdateCommand based on visibility state */}
        </div>
    );
}

export default Command;
