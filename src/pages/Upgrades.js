
import React,{useEffect,useState} from "react";
// react plugin used to create google maps


// reactstrap components


import { PlusOutlined} from "@ant-design/icons";
import axios from "../config";


import {
  Row,
  Col,
  Card,
  Statistic,
  Button,
  List,
  Descriptions,
  Avatar,
} from "antd";
import { useStateContext } from "../context/stateContext";

const moment= require('moment')
const Upgrades = () => {
  const {user} = useStateContext();
  const {token, username} = user;
  const [upgrades, setUpgrades] = useState([])







useEffect(()=>{
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
}
  axios.get(`/api/topupList/?username=${username}`)
    .then(res => {
        console.log(res)
      setUpgrades(res.data.reverse())   
    }).catch(err => 
        console.log(err))
}, [token, username])

    return (
      <>
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Upgrades</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={upgrades}
              renderItem={(item) => (
                <List.Item
                    >
                 
                  <List.Item.Meta
                   description={moment(item.date_requested).format("MMM Do YYYY")}
                   title={`Affluena Simple Interest`}
                    avatar={
                      <Avatar size="small" className="text-fill">
                        <PlusOutlined style={{ fontSize: 10 }} />
                      </Avatar>
                    }

                  />
        
                  <div className="amount"><span className="text-success">${item.amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')} </span></div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
  
       </Row>
           </>
    );
  }

export default Upgrades;
