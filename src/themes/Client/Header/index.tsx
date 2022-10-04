import React from 'react'
type ClientHeaderProps = {
  offsetTop: number;
};

const ClientHeader = ({ offsetTop }: ClientHeaderProps) => {
  return (
    <div className='bg-red-700 w-full'>
      this is header
      </div>
  )
}

export default ClientHeader