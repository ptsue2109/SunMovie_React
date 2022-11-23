import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons"
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
    anchorPoint: any
    setAnchorPoint: any,
    visible: any,
    data: any
}

const MenuContext = ({ anchorPoint, data, setAnchorPoint, visible }: Props) => {
    // console.log('data', data)
  
    return (
        <div>
            <Popup style={{ left: `${anchorPoint?.x}px`, top: `${anchorPoint?.y}px` }} className={`active ?? ${visible}`}>
                <li><Link to={data}>chi tiet</Link></li>
            </Popup>
        </div>
    )
}

export default MenuContext
const Popup = styled.div`
    animation-name: fadeIn;
    animation-duration: 0.4s;
    background-clip: padding-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    left: 0px;
    list-style-type: none;
    margin: 0;
    outline: none;
    padding: 0;
    position: absolute;
    text-align: left;
    top: 0px;
    overflow: hidden;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    li {
        clear: both;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        margin: 0;
        padding: 5px 12px;
        transition: all .3s;
        white-space: nowrap;
        -webkit-transition: all .3s;
        &:hover {
             background-color: #e6f7ff;
        }
        i {
            margin-right: 8px;
          }
      }
    
`