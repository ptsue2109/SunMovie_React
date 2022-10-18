import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
type Props = {}

const ListSeats = (props: Props) => {
  const { seats } = useAppSelector(state => state.seatReducer);
  console.log('seats', seats);

  const dispatch = useAppDispatch();

  return (
    <div>

      {seats.map((item, index) =>(
        <div className='flex gap-5'>  
        <div key={index}>
          <p>id ghế: {item._id}</p>
          <p> status {item.status}</p>
          <p>Loại ghế: {item.seatTypeId.name}</p>
          {/* <p>{item.status}</p> */}
        </div>
        </div>
      ))}

    </div>
  )
}

export default ListSeats