import React from 'react';
import Navigator from './Navigator';
import CommandList from './ListCommand';
import CommandDetails from './CommandDetails';

function Caisse() {
  return (
    <div className=" relative flex flex-col" style={{ height: '93vh', minWidth: '400px' }}>
      {/* Navigator */}
      <div className='h-30'>
        <Navigator />
      </div>

      {/* Main Content */}
      <div className='flex flex-col' style={{ height: 'calc(100% - 30px)' }}>
        {/* Command List */}
        <div className="overflow-hidden" style={{ height: 'calc(100% - 250px)' }}>
          <CommandList />
        </div>

        {/* Command Details */}
        <div className="h-76">
          <CommandDetails />
        </div>
      </div>
    </div>
  );
}

export default Caisse;
