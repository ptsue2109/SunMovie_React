import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import configRoute from '../../../config';
type Props = {}

const NavTop = (props: Props) => {
  return (
    <div className='bg-[#48647f] flex justify-end pr-3' >
         <Button type='link' >
            <Link to={configRoute.routes.findOrder} className="text-white"> <SearchOutlined /> Tra cứu đơn hàng</Link>
         </Button>
    </div>
  )
} 

export default NavTop