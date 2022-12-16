
import React,{useEffect,useState} from "react";
import { PlusOutlined} from "@ant-design/icons";
import axios from "../config";


import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Modal
} from "antd";
import { useStateContext } from "../context/stateContext";
import {toast} from 'react-hot-toast';


const moment= require('moment')
const Plans = () => {
  const {user} = useStateContext();
  const {token,userId, username} = user;
  const [available, setAvailable] = useState("")
  const[log, setLog] = useState([])
  const [withdrawal, setWithdrawal] = useState("")

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
  
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const withdrawServer = (amount) => {
       
            
    const user = {
        "user": userId,
        "amount": amount,
        "status": "Pending",
    }
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    }
    axios.post('/api/payout-now/', user)
        .then(res => {
           toast.success('Withdrawal Submitted',{
            id: 'withdraw'
           })
        })
    
}
  useEffect(() => {

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    
  axios.get(`/api/withdraw-check?username=${username}`)
    .then(res => {
      const {s_available,c_available,log} = res.data
      
      if (s_available == true || c_available == true){
        setAvailable(true)
        setLog(log)
      }
    })
  axios.get(`/api/withdrawals/?username=${username}`)
  .then(res => {
      setWithdrawal(res.data.reverse())
  }).catch(err => {
    console.log(err.response)
})
  
}, [token, username])

    return (
      <>
  
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Withdraw</h6>]}   
          >
            {available?
             <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={log}
              renderItem={(item) => (
                <List.Item
                  actions={
                    [<Button 
                        onClick={() => {
                          withdrawServer(item.amount)
                        }}
                        > Withdraw</Button>] 
                }
                    >       
                  <List.Item.Meta
                   description={moment(item.date_requested).format("MMM Do YYYY")}
                   title={`${item.product}`}
                    avatar={
                      <Avatar size="small" className="text-fill">
                        <PlusOutlined style={{ fontSize: 10 }} />
                      </Avatar>
                    }
                  />
     
                  <div className="amount"><span className="text-success">${item?.amount} </span></div>
                </List.Item>
              )}
            />
            :<>
                  <p>Status: <span style={{ color: "#22cccc" }}>{" "}Unavailable</span></p>
                  <p>Your contribution has to run through first</p>
                  </>
                  }
          </Card>
        </Col>
    
        <Col span={24} md={10} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Withdraws</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={withdrawal}
              renderItem={(item) => (
               
                <List.Item
                actions={[<Button  >{item.status}</Button>]}
                >
                
                  <List.Item.Meta
              description={moment(item.date).format("MMM Do YYYY")}
              
                  />
        
                  <div className="amount">${item.amount}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
       </Row>
           </>
    );
  }

export default Plans;
