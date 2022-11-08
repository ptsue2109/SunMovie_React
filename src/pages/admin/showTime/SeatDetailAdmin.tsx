import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Button, Card, Divider } from "antd";
import { Link, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import styles from "./Seats.module.scss";
import { formatCurrency, formatDate, formatTime } from "../../../ultils";
type Props = {};

const AdminSeatRenderDetail = (props: Props) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        document.title = "Admin | Detail Seat ";
        dispatch(getOneSBSTById(id));
    }, [dispatch]);

    useEffect(() => {
        clearSelectedSeats();
    }, []);

    const { seat } = useAppSelector((state) => state.SeatBySTReducer);
    const movie = seat?.movieId;
    let selectedSeats: string[] = [];
    const [seatDetails, setSeatDetails] = useState<any>(seat?.seats || {});

    const nextStepChooseCombo = () => {
        console.log(JSON.stringify(seatDetails));
    }

    useEffect(() => {}, [seatDetails])
    

    const clearSelectedSeats = () => {
        let newMovieSeatDetails = { ...seatDetails };
        for (let key in seatDetails) {
            seatDetails[key].forEach(
                (seatValue: number, seatIndex: string | number) => {
                    if (seatValue === 2) {
                        seatDetails[key][seatIndex] = 0;
                    }
                }
            );
        }
        setSeatDetails(newMovieSeatDetails);
    };

    const onSeatClick = (seatValue: any, rowIndex: any, key: any) => {
        const seatClone = JSON.parse(JSON.stringify(seatDetails));
        if (seatClone) {
            if (seatValue === 1 || seatValue === 3) {
                return;
            } else if (seatValue === 0) {
                seatClone[key][rowIndex] = 2;
            } else {
                seatClone[key][rowIndex] = 0;
            }
        }
        setSeatDetails({ ...seatClone });
    };

    /**
     * 0 - Not booked
     * 1 - Booked
     * 2 - Selected
     * 3 - Blocked
     */

    const getClassNameForSeats = (seatValue: number) => {
        let dynamicClass;
        if (seatValue === 0) {
            // Not booked
            dynamicClass = styles.seatNotBooked;
        } else if (seatValue === 1) {
            // booked
            dynamicClass = styles.seatBooked;
        } else if (seatValue === 2) {
            // Seat Selected
            dynamicClass = styles.seatSelected;
        } else {
            // Seat Blocked
            dynamicClass = styles.seatBlocked;
        }
        return `${styles.seats} ${dynamicClass}`;
    };

    const RenderSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let colValue = seatDetails[key].map((seatValue: any, rowIndex: any) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className="text-gray-500 font-bold mr-[20px] pl-[20px]">{key}</span>}
                    <span
                        className={getClassNameForSeats(seatValue)}
                        onClick={() => onSeatClick(seatValue, rowIndex, key)}
                    >
                        {rowIndex + 1}
                    </span>
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && (
                        <>
                            <br />
                            <br />
                        </>
                    )}
                </span>
            ));
            seatArray.push(colValue);
        }
        return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
    };
    const RenderMovie = () => {
        return (
            <div className="">
                <div className="img_thumnail">
                    <img src={movie?.image[0]?.url} style={{ width: '140px' }} />
                </div>
                <h2 className="mt-1 uppercase text-gray-500">{movie?.name}</h2>
                <div className=" text-xs flex ">
                    <div className="bg-orange-600 w-[30px] h-[20px] text-slate-100	text-center ">  {`C${movie?.ageLimit}`}</div>
                    <div className="pl-[3px]"> <p className="text-danger text-[12px]">(*) Phim chỉ dành cho khán giả từ {movie?.ageLimit} tuổi trở lên</p></div>
                </div>
                <div className="uppercase text-[12px]"><span className="font-bold">Rạp:</span>  Galaxy Mipec Long Biên  |  {seat?.roomId?.name}</div>
                <div className="uppercase text-[12px]"><span className="font-bold">Suất chiếu:</span> {formatTime(seat?.showTimeId?.startAt)}  |  {formatDate(seat?.showTimeId?.startAt)}</div>
                <div className="max-w-[300px]"><span className="font-bold">Ghế : </span><RenderSeatSelected /></div>
                <div className=""><span className="font-bold">Tạm Tính : </span><span className="text-orange-600 font-bold">{formatCurrency(1200000)} </span></div>
                <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                    <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                        <Button htmlType="button" >
                            Quay  lại
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ minWidth: 150 }}
                            onClick={nextStepChooseCombo}
                        >
                            <Link to={configRoute.routes.chooseCombo}> Tiếp theo</Link>
                           
                        </Button>
                    </div>
                </Card>
            </div>)
    };
    const RenderSeatSelected = () => {
        selectedSeats = [];
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue: any, seatIndex: any) => {
                if (seatValue === 2) {
                    selectedSeats.push(`${key}${seatIndex + 1},` )
                }
            })
        }
        if (selectedSeats.length) {
            return (
                <div className="break-words break-all max-w-[300px]">   {selectedSeats} </div>
            )
        } else { return <></> }
    }

    return (
        <div>
            <Button type="primary" style={{ marginBottom: "20px" }}>
                <Link to={configRoute.routes.AdminShowTimes} style={{ color: "#ffff" }}>
                    Xem lại các suất chiếu
                </Link>
            </Button>
            <div className={styles.wrapper}>
                {seatDetails && <div className={styles.seatsContainer}>
                    <Card style={{ width: '70%' }}> <RenderSeats />   </Card>
                    <Card style={{ width: '30%', height: '450px' }}> <RenderMovie /> </Card>
                </div>}
            </div>

        </div>
    );
};

export default AdminSeatRenderDetail;
