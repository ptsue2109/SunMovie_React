import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import styles from "./voucher.module.scss";
import { ImNewspaper } from "react-icons/im";
import { getAlVc } from "../../../redux/slice/voucherSlice";
import { Link } from 'react-router-dom';
import { formatDateString } from '../../../ultils';
import "./voucher.scss";
type Props = {}

const Voucher = (props: any) => {
  const dispacth = useAppDispatch()
  useEffect(() => {
    dispacth(getAlVc())
  }, [])
  const { vouchers } = useAppSelector((state) => state.voucherReducer);


  return (
    <>

      <section className="container bg-[#182b47] h-auto min-h-[650px]">
        <div className="group_voucher  grid grid-cols-4">
          {/* <div className="voucher_item border rounded-lg h-[349px] w-[267px] border-red-500">
             <div className="image">
              <img src={vouchers[0]?.imagesFile[0]?.url} className="block w-full w-[267px] h-[349px] object-fill " />
             </div>

          </div> */}
          <div className="card">
            <img src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" className="card__image" />
            <div className="card__overlay">
              <div className="overlay__text">
                <h3>Mountain Trips</h3>
                <p>Plan your next adventure</p>
                <a href="#" className="button">View Trips</a>
              </div>
            </div>
          </div>
        </div>

      </section>

    </>
  )
}

export default Voucher