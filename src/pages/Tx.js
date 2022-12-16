
import React,{useEffect,useState} from "react";
// react plugin used to create google maps


// reactstrap components


import { PlusOutlined} from "@ant-design/icons";
import axios from "../config";


import {
  Row,
  Col,
  Card,
 Modal,
  Button,
  List,
  Avatar,
} from "antd";
import { useStateContext } from "../context/stateContext";

const moment= require('moment')
const Transaction = () => {
  const {user} = useStateContext();
  const {token, username} = user;
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([])
  const [item, setItem] = useState({});

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


useEffect(()=>{
  const getOrder = async (username, token) => {
    try{
        
           axios.defaults.headers = {
               "Content-Type": "application/json",
               Authorization: `Token ${token}`
           }
           const orders = await axios.get(`/api/orders?username=${username}`).then(res => res.data.reverse());
           function checkApproved(x) {
            return x.status === "Approved"
          }
          function checkPending(x) {
            return x.status === "Pending"
          }
          const approved = orders.filter(checkApproved)
          const pending = orders.filter(checkPending)
          setPending(pending)
          setApproved(approved)

       }catch(err){
           console.log(err);
       }
   }
   getOrder(username, token)
}, [token, username])

    return (
      <>
        <Modal title="Upgrade " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
      <Row className="rowgap-vbox" gutter={[24, 0]}>
                        <Col xs={24}>
                       
                        <div align="middle">
                            <p>Amount - {item?.amount}</p>
                            <p>Status - {item?.status}</p>
                            <p>Paid On - {moment(item.date_requested).format("MMM Do YYYY")}</p>
                            <p>txid - {item.txid}</p>
                            <p>flw_ref - {item.flw_ref}</p>
                            
                    </div>
                        </Col>
      </Row>
      </Modal>
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Confirmed Transaction</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={approved}
              renderItem={(item) => (
                <List.Item  
                actions={[<Button type="link" onClick={() => {
                  setItem(item)
                  showModal()
              }} >Details</Button>]}
              >
                 
                  <List.Item.Meta
                   description={moment(item.date_requested).format("MMM Do YYYY")}
                   title={`Affluena ${item.product}`}
                    avatar={
                      <Avatar size="small" className="text-fill">
                        <PlusOutlined style={{ fontSize: 10 }} />
                      </Avatar>
                    }

                  />
        
                  <div className="amount"><span className="text-success">${item.amount} </span></div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
    
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Pending Transaction</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={pending}
              renderItem={(item) => (
                <List.Item
                actions={[<Button type="link" onClick={() => {
                  setItem(item)
                  showModal()
              }} >Details</Button>]}
                    >
                
                  <List.Item.Meta
              description={moment(item.date_ordered).format("MMM Do YYYY")}
              title={`Affluena ${item.product}`}
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

export default Transaction;
