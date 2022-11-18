import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import configRoute from '../../../config'
import styles from "../Form&Table/room.module.scss"
import MenuContext from '../MenuContext'
type Props = {
    row: any,
    column: any,
    seatDetails: any,
    setSeatDetails: any,
    seatFile: any,
    setSeatFile: any
    seats:any,
    setSeats:any

}
const RenderSeats = ({ row, column, seats ,setSeats, seatDetails, setSeatDetails, seatFile, setSeatFile }: Props) => {
    const [anchorPoint, setAnchorPoint] = useState<any>({ x: 0, y: 0 });
    const [visible, setVisibility] = useState<any>(false);
    const [data, setData] = useState<any>()
    console.log('seats', seats)

    useEffect(() => {
        handleSubmit();
    }, [row, column])
    useEffect(() => {
        // clearSelectedSeats();
    },
        [])

    // const getClassNameForSeats = (seatValue: number) => {
    //     let dynamicClass;
    //     if (seatValue === 0) {
    //         dynamicClass = styles.seatNotBooked;
    //     } else if (seatValue === 1) {
    //         dynamicClass = styles.seatBooked;
    //     } else if (seatValue === 2) {
    //         dynamicClass = styles.seatSelected;
    //     } else {
    //         dynamicClass = styles.seatBlocked;
    //     }
    //     return `${styles.seats} ${dynamicClass}`
    // }
    // const clearSelectedSeats = () => {
    //     let newMovieSeatDetails = { ...seatDetails };
    //     for (let key in seatDetails) {
    //         seatDetails[key].forEach((seatValue: any, seatIndex: any) => {
    //             if (seatValue === 2) {
    //                 seatDetails[key][seatIndex] = {};
    //             }
    //         })
    //     }
    //     return newMovieSeatDetails;
    // }
    const handleSubmit = () => {
        let newSeatObject: any = {};
        
        
        let key: string;
        for (let i = 0; i < column; i++) {
            if (i < 26) {
                key = String.fromCharCode(65 + i)
            } else {
                let character = String.fromCharCode(64 + (i / 25));
                key = `${character}${String.fromCharCode(64 + i % 25)}`;
            }
            newSeatObject[key] = Array(row).fill({}).map((i) => {
                if (seats && seats[key] && seats[key]) {
                    return seats[key][i];
                } else {
                    return {};
                }
            });
        }
        setSeatDetails(newSeatObject);
        console.log('newSeatObject',newSeatObject);
        setSeatFile(newSeatObject)
    }
    const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {

        // if (seatDetails) {
        //     if (seatValue === 1) {
        //         return;
        //     } else if (seatValue === 0) {
        //         seatDetails[key][rowIndex] = 3;
        //     } else {
        //         seatDetails[key][rowIndex] = 0;
        //     }
        // }
        setSeatDetails({ ...seatDetails });
    }
    const contextHandle = (e: any) => {
        e.preventDefault()
        setAnchorPoint({ x: e.pageX, y: e.pageY })
        setVisibility(true)
        setData(e.target)
    }
    const RenderSeatsContain = () => {
        let seatArray = [];
        
        for (let key in seatDetails) {
            let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    <span 
                    // className={getClassNameForSeats(seatValue)}
                        onClick={() => onSeatClick(seatValue, rowIndex, key)}
                        onContextMenu={(e) => contextHandle(e)}
                    >
                        {rowIndex + 1}
                    </span>

                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))

            seatArray.push(colValue);
        }
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }
    return (
        <div className='p-̀̀̀̀5 mx-̀̀5 h-[1024px] w-full bg-red-300'>
            <Button className='mb-5'>
                <Link to={configRoute.routes.adminRooms}>Roooms lisst</Link>
            </Button>
            <div className="pt-5 m-5">
                {RenderSeatsContain()}
            </div>
            <MenuContext
                anchorPoint={anchorPoint}
                setAnchorPoint={setAnchorPoint}
                visible={visible}
                data={data}
            />
        </div>
    )
}

export default RenderSeats