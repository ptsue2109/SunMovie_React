import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import RenderSeats from '../../../components/admin/RenderSeats';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getOneSBSTById } from '../../../redux/slice/SeatBySTSlice';

type Props = {}

const SeatByRoom = (props: Props) => {

    const dispatch = useAppDispatch();
    let { id } = useParams()
    const [seats, setSeats] = useState();
    const [seatDetails, setSeatDetails] = useState<any>();
    const [row, setRow] = useState<number>();
    const [column, setColumn] = useState<number>();
    const [seatFile, setSeatFile] = useState<any>();

    useEffect(() => {
        (async () => {
            const { payload } = await dispatch(getOneSBSTById(id));
    
            setSeats(payload)
        })();
    }, [id]);
    
    const { rooms } = useAppSelector((state) => state.roomReducer);
    const roomSelect = rooms?.find((item) => item?._id === id);
    useEffect(() => {
        setColumn(roomSelect?.columns)
        setRow(roomSelect?.rows)    
    }, [])


    return (
        <div>
            <RenderSeats
                setSeatFile={setSeatFile}
                seatFile={seatFile}
                row={row}
                column={column}
                seatDetails={seatDetails}
                setSeatDetails={setSeatDetails} 
                seats={seats}
                setSeats= {setSeats}
                />
        </div>
    )
}

export default SeatByRoom