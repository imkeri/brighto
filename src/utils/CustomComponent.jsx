import React from 'react';

// dynamic table
export const renderTableRows = (obj, keysToShow) => {
    return keysToShow.map(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return (
          <React.Fragment key={key}>
            <tr>
              <td className='font-semibold'>Result</td>
              <td></td>
            </tr>
            {renderTableRows(obj[key], Object.keys(obj[key]))}
          </React.Fragment>
        );
      } else {
        return (
          <tr key={key}>
            <td className='w-1/2 uppercase'>{key}</td>
            <td className='w-1/2'>{obj[key] !== null ? obj[key]?.toString() : 'null'}</td>
          </tr>
        );
      }
    });
  };
 