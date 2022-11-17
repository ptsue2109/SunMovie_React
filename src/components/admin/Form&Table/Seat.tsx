import React, {useState} from "react"
import MenuContext from "./MenuContext";
import {Table} from 'antd'

interface MenuContextProps {

}

const Seat = ({}: MenuContextProps) => {
    const [popup, setPopup] = useState({
        popup: {
            visible: false,
            x: 0, y: 0
        }
    })
    return (
        <>

         hadhahsd
        </>
    )
}

export default Seat;
