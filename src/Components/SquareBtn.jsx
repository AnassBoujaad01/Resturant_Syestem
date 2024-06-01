import React from 'react';

function SquareIcons({ Icon, width, height, textColor, bgColor, hoverColor, onClick }) {
  const squareBtnStyle = {
    width: `${width}px`,
    height: `${height}px`,
    color: textColor,
    backgroundColor: bgColor,
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = hoverColor;
    event.target.style.color = textColor; // Reset text color on hover
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = bgColor;
    event.target.style.color = textColor; // Reset text color on hover
  };

  return (
    <div
      className="flex items-center justify-center shadow-md rounded-md select-none"
      style={squareBtnStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {Icon && <Icon className="w-[80%] h-[80%]" />}
    </div>
  );
}

export default SquareIcons;
