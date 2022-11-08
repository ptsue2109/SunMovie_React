import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import configRoute from '../../../config'

type Props = {}

const WebConfig = (props: Props) => {
  return (
    <div>
      <Button>
        <Link to={configRoute.routes.webConfigAdd}>Tạo</Link>
      </Button>
    </div>
  )
}

export default WebConfig