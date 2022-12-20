import React from 'react'

type Props = {
   record: any, visible: any, x: any, y: any
}

const Popup = ({ record, visible, x, y }: Props) => {
   return (
      visible &&
      <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
        <li>{record?._id}</li>
        <li>Like it</li>
        <li>Bookmark</li>
      </ul>
   )
}

export default Popup