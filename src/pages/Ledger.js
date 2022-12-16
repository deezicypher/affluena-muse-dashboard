
import React,{useEffect,useState} from "react";
// react plugin used to create google maps


// reactstrap components


import { PlusOutlined} from "@ant-design/icons";
import axios from "../config";


import {
  Row,
  Col,
  Card,
  Button,
  List,
  Tabs,
  Avatar,
} from "antd";
import { useStateContext } from "../context/stateContext";

const moment= require('moment')
const Ledger = () => {
  const {user} = useStateContext();
  const {token, username} = user;
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([])
  const [earnings, setEarn] = useState([])


  const mins = [
    <svg
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  

  const download = [
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
        fill="#111827"
      ></path>
    </svg>,
  ];

  const onChange = (key) => {
   if(key === 1){

   }else{

   }
  };

  useEffect(() => {
    
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    }

        axios.get(`/api/history?username=${username}`)
            .then(res => {
                for (const x of res.data) {
                   
                    for (const y of x.history) {
                        if (y.profit > 0 || y.referral_earning > 0){
                        setEarn(y)
                        }
                    }
                }
            }).catch(err =>
                console.log(err.response))

        axios.get(`/api/payouts?username=${username}`)
            .then(res => {
              const details = res.data.reverse()
              function checkApproved(x) {
                return x.status === "Approved"
              }
              function checkPending(x) {
                return x.status === "Pending"
              }
              const approved = details.filter(checkApproved)
              const pending = details.filter(checkPending)
              setPending(pending)
              setApproved(approved)
            })
}, [token, username])

    return (
      <>
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Earnings</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={earnings}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button type="link" href={item.ticket} target="_blank" >{download} Receipt</Button>]}
                
                    >
                 
                  <List.Item.Meta
                   description={moment(item.date_requested).format("MMM Do YYYY")}
                   title={`Affluena ${item.name}`}
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
    
        <Col span={24} md={12} className="mb-24">
        <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `Approved Payouts`,
        key: '1',
        children:    <Card
        bordered={false}
        className="header-solid h-full ant-invoice-card"
       
      >
        <List
          itemLayout="horizontal"
          className="invoice-list"
          dataSource={approved}
          renderItem={(item) => (
            <List.Item
            actions={[<Button type="link"> {item.status}</Button>]}
                >
             
              <List.Item.Meta
          description={moment(item.date_ordered).format("MMM Do YYYY")}
          title={`Affluena ${item.product}`}
                avatar={
                  <Avatar size="small" className="text-light-danger">
                    {mins} 
                    
                  </Avatar>
                }

              />
    
              <div className="amount">${item.amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
            </List.Item>
          )}
        />
      </Card>,
      },
      {
        label: `Pending Payouts`,
        key: '2',
        children: <Card
        bordered={false}
        className="header-solid h-full ant-invoice-card"
       
      >
        <List
          itemLayout="horizontal"
          className="invoice-list"
          dataSource={pending}
          renderItem={(item) => (
            <List.Item
            actions={[<Button type="link"> {item.status}</Button>]}
                >
             
              <List.Item.Meta
          description={moment(item.date_ordered).format("MMM Do YYYY")}
          title={`Affluena ${item.product}`}
                avatar={
                  <Avatar size="small" className="text-light-danger">
                    {mins} 
                    
                  </Avatar>
                }

              />
    
              <div className="amount">${item.amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
            </List.Item>
          )}
        />
      </Card>,
      },
      
    ]}
  />

       
        </Col>
       </Row>
           </>
    );
  }

export default Ledger;
