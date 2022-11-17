import React from "react"
import styled from "styled-components";
import {FormInstance} from "antd";

interface Contextprops{
    popup:any
}
function MenuContext({popup}: any) {
    let {record, visible, x, y} = popup;

    return (
        <Popup>
            visible &&
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                <PopupLi>{record?._id}</PopupLi>
                <PopupLi>Like it</PopupLi>
                <PopupLi>Bookmark</PopupLi>
            </ul>
        </Popup>
    )
}

export default MenuContext
const Popup = styled.div`
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


`

const PopupLi = styled.li`
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

  &i {
    margin-right: 8px;
  }
`