import React from 'react';
import { Card, Typography } from '@mui/material'; // Import Typography from Material-UI for consistent text styling
import SquareIcons from './SquareBtn';

function MenuCard({ Icon, Color, Title, Details }) {
  return (
    <Card className='w-[450px] h-[250px] p-8 flex flex-col justify-center items-center text-center bg-white awesome-shadow rounded-md select-none transition duration-700 hover:scale-105 cursor-pointer'> {/* Changed shadow class to awesome-shadow */}
      <div className='flex items-center gap-4 mb-4'>
        <SquareIcons Icon={Icon} width={100} height={100} textColor={Color} bgColor={'#FFFFFF'} hoverColor={'white'} />
        <Typography variant="h2" className={`text-${Color}`}>{Title}</Typography>
      </div>
      <Typography variant="body1" className="mt-2 text-gray-600 text-justify">{Details}</Typography>
    </Card>
  );
}

export default MenuCard;
