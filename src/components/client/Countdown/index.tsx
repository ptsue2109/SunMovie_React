import React from 'react'
import Countdown from 'react-countdown';
type Props = {
   timer: any
}
// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }:any) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};
const CountdownComp = ({timer}: Props) => {
  return (
    <div className='p-2 bg-[#182b47] text-white'>
      <Countdown date={timer} renderer={renderer}/>
    </div>
  )
}

export default CountdownComp