import React,{useEffect, useState} from "react";
import axios from "../config";
import moment from 'moment';


import { Skeleton,   Row,
    Col,
    Card,
   Select,
    Descriptions,
     Avatar,Button,Divider, Alert, Spin,Popconfirm, message } from 'antd';

import { Redirect } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

const { Option } = Select;

const { Meta } = Card;
const Upgrade = () => {
    const {user} = useStateContext();
    const {userId, token , username} = user
    




    return (
        <>
            <div className="content">
            <div className="layout-content">
      
            </div>         
            </div>
        </>
    )
}


export default Upgrade;
