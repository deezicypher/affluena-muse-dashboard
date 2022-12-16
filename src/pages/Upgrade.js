
import React,{useEffect,useState} from "react";
import { PlusOutlined} from "@ant-design/icons";
import axios from "../config";
import { useHistory } from "react-router-dom";
import {toast} from "react-hot-toast";
import {useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Modal,
  InputNumber,
  Divider
} from "antd";
import { useStateContext } from "../context/stateContext";

const moment= require('moment')
const Upgrade = () => {
  const {user} = useStateContext();
  const {token, username, userId} = user;
  const [simple, setSimple] = useState([])
  const [topup, setTopUp]= useState("")
  const [amount, setAmount] = useState(50000);
  const[pk, setPk] = useState("");

  let history = useHistory();
  const config = {
    public_key: "FLWPUBK_TEST-da56eff24ecc4109b02a60d643baac29-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'Simple Interest',
      description: 'Payment for Simple Interest',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment =  useFlutterwave(config)

  const handlePay = (response) => {
    const {status,charged_amount,transaction_id} = response;
    if(status === 'successful'){
        const status = "Approved"
        Topup(charged_amount,transaction_id,status)
    }else{
        const status = "Pending"
        Topup(charged_amount,transaction_id,status)
    }
  }

  
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

  const Topup = async ({amount,txid,status}) => {
    const order = {
        user: userId,
        plan: pk,
        amount: amount,
        txid: txid,
        status: status,
    }
    const omo = {
      user: userId,
      plan: pk,
      amount: amount,
      txid: "378378733764",
      status: "Pending",
  }
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
          Authorization: `Token ${token}`
      }
      try{
       
      const detail = await axios.post('/api/top-up/', order)
              if(detail.status == 201){
                toast.success("Top Up Successfull", {
                    id: "upgrade"
                  })
                  history.push("/Upgrades");
              }
          }catch(err) {
            console.log(err.response);
            toast.error("Can't process request at the moment ", {
                id: "upgrade"
            })     
        }
  }

  useEffect(()=>{

    if(token && username){
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
      
    axios.get(`/api/checkCart?username=${username}`)
      .then(res => {
        console.log(res)
        const {simple,topup} = res.data;
        setSimple([simple])
        setTopUp(topup)
       }
      )
    
    }
    
    },[token,username])

    return (
      <>
      <Modal title="Upgrade " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
      <Row className="rowgap-vbox" gutter={[24, 0]}>
                        <Col xs={24}>
                        <Divider>min - 50,000</Divider>
                        <div align="middle">
                            
                       Amount:  <br/><InputNumber style={{ width: 120 }} align="middle"
                          min={50000} max={50000000}
                          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                         
                          onChange={value => setAmount(value)}
                          
                        /><br/><br/>
                    {/*<Button onClick={() => Topup({amount})}>Pay</Button>*/}
                   
                    <button className="flutterwave-btn"
                    style={{backgroundColor:"#f5a623",cursor:"pointer", borderRadius:'5px',padding:'5px 10px', color:"#ffffff", border:"none"}}
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               handlePay(response)
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay {amount} with Flutterwave
      </button>   
                    </div>
                        </Col>
      </Row>
      </Modal>
       <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Upgrade active Investments</h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={simple}
              renderItem={(item) => (
                <List.Item
                  actions={
                    topup === true?
                    [<Button 
                        onClick={() => {
                            setPk(item.id)
                            showModal()
                        }}
                        > Upgrade</Button>]
                    :
                    [<Button  >{} </Button>]
                }
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
     
                  <div className="amount"><span className="text-success">${item?.amount} </span></div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
    
    
       </Row>
           </>
    );
  }

export default Upgrade;
