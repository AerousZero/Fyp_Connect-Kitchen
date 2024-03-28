import React from 'react';
import Card from '../Card/index';

const TabContent = ({ label }) => {
  return (
    <div className='flex flex-wrap gap-4'>
      <Card label={label} />
      <Card label={label} />
      <Card label={label} />
      <Card label={label} />
      <Card label={label} />
      <Card label={label} />
    </div>
  );
}

export default TabContent;
