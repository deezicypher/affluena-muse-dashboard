
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


const moment= require('moment')
const Plans = () => {
  const {user} = useStateContext();
  const {token, username} = user;
  const [simple, setSimple] = useState([]);
  const [compound, setCompound] = useState([])
  const [item, setItem] = useState({});


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


useEffect(()=>{
    const getPlans = async () =>{
        try{
            const simple = await axios.get(`/api/simpleInt/?username=${username}`).then(res => res.data.reverse())
            setSimple(simple)
            const compound = await axios.get(`/api/compounds/?username=${username}`).then(res => res.data.reverse())
            setCompound(compound)
        }catch(err){
            console.log(err)
        }
    }
    if(token){
            getPlans()
        }   
}, [token, username])

    return (
      <>
      <Modal title="Upgrade " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
      <Row className="rowgap-vbox" gutter={[24, 0]}>
                        <Col xs={24}>
                       
                        <div align="middle">
                            <p>Amount - {item?.amount}</p>
                            <p>Created On - {moment(item.date_requested).format("MMM Do YYYY")}</p>
                            <p>Due on - {moment(item.due).format("MMM Do YYYY")}</p>
                    </div>
                        </Col>
      </Row>
      </Modal>
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Simple Interest</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={simple}
              renderItem={(item) => (
                <List.Item 
                actions={[<Button type="link" style={{cursor:"pointer"}} href={item.ticket} target="_blank" >{download} Receipt</Button>,<Button type="link" onClick={() => {
                    setItem(item)
                    showModal()
                }} >Details</Button>]}
                >
                 
                  <List.Item.Meta
                   description={moment(item.date_requested).format("MMM Do YYYY")}
                   title={                  <div className="amount"><span className="text-success">${item.amount} </span></div>}
                    avatar={
                      <Avatar size="small" className="text-fill">
                        <PlusOutlined style={{ fontSize: 10 }} />
                      </Avatar>
                    }

                  />
        

                </List.Item>
              )}
            />
          </Card>
        </Col>
    
        <Col span={24} md={10} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Compound Transaction</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={compound}
              renderItem={(item) => (
               
                <List.Item
                actions={[<Button type="link" style={{cursor:"pointer"}} href={item.ticket} target="_blank" >{download} Receipt</Button>,<Button type="link" onClick={() => {
                    setItem(item)
                    showModal()
                }} >Details</Button>]}
                >
                
                  <List.Item.Meta
              description={moment(item.date_ordered).format("MMM Do YYYY")}
              
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
