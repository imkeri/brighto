import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Spin() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-400">
        <div className="flex items-center justify-center space-x-4 p-8">
          <Spinner animation="grow" className='m-1 bg-brand-700' />
          <Spinner animation="grow" className='m-1 bg-brand-700' />
          <Spinner animation="grow" className='m-1 bg-brand-700' />
        </div>
      </div>
    </>
  );
}

export default Spin;
