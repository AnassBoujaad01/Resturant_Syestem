import React from "react";

function Btn({ icon: Icon, text, color, onClick, disabled, Key }) {
  // Dynamically generate class names based on the color prop
  const bgColorClass = "bg-"+color;
  const textColorClass = "text-"+color;

  return (
    <button 
      className={`w-48 h-10 rounded-md overflow-hidden bg-whiteColor ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center h-full border border-color" key={Key} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        {Icon && <Icon className={`${textColorClass} w-1/5 text-2xl`} />}
        <div
          className={`${bgColorClass} h-full w-4/5 flex justify-center items-center  rounded-md  text-whiteColor font-bold hover:w-full`}
          style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
        >
          {text}
        </div>
      </div>
    </button>
  );
}

export default Btn;
