import React, { useState, useEffect } from 'react'
import { AutoComplete, Input, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../redux/hook';
import {getByShortId} from "../../../redux/slice/OrdersSlice"

type Props = {
   havePayment?:any
}

const SearchOrder = ({havePayment}: Props) => {
   const options: any[] = [];
   const [search, setSearch] = useState<any>();
   const dispatch =useAppDispatch()
   useEffect(() => {
      if(search) {
         dispatch(getByShortId(search)).unwrap()
         .then((payment:any) => console.log(payment)
         )
         

      }
   }, [search])
   const handle = (val: any) => {
      if (val) {
         setSearch(val);

      }

   }
   return (
      <div>
         <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{ width: 250 }}
            options={options}
         >
            <Input.Search size="middle" placeholder="input here" onChange={(e: any) => handle(e.target.value)} />
         </AutoComplete>
      </div>
   )
}

export default SearchOrder