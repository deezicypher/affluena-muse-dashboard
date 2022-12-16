import React, { useState } from "react";

import {useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from "../config";
import { toast } from 'react-hot-toast';
import moment from "moment";
// reactstrap components
import { Redirect } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
	

import { Skeleton, Statistic, Card, Col, Row, Avatar,Button,InputNumber,Divider,Dropdown,Space,Spin } from 'antd';
import { useStateContext } from "../context/stateContext";

const { Meta } = Card;

const deadline = moment().add(15, 'minutes');

// Moment is also OK

const Cart = () => {

  const {user} = useStateContext();
    const [samount, setSAmount] = useState(200000);
    const [camount, setCAmount] = useState(400000);
    const [duration, setDuration] = useState(6);
    const [sduration, setSDuration] = useState(6);
    const [cduration, setCDuration] = useState(6);


 
  const {userId , token} = user

  const handleMenuClick = (e) => {
    console.log(e.key)
    setDuration(e.key);
    setSDuration(e.key);
  };
  const handleCMenuClick = (e) => {
    setDuration(e.key);
    setCDuration(e.key);
  };

  const items = [
    {
      label: '6 months',
      key: 6
    },
    {
      label: '8 months',
      key: 8
    },
    {
      label: '12 months',
      key: 12
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const menuCProps = {
    items,
    onClick: handleCMenuClick,
  };

  const handleS = e => {
    console.log(e.target.value)
    const val = e.target.value
    if (val < 200000){
      toast.error("Minimum amount of ₦200,000")
    }
    else{
      setSAmount(val)
    }
  }
     
  const handleC = e => {
    const val = e.target.value
    if (val < 400000){
      toast.error("Minimum amount of ₦400,000")
    }
    else{
      setCAmount(val)
    }
  }
  const config = {
    public_key: "FLWPUBK_TEST-da56eff24ecc4109b02a60d643baac29-X",
    tx_ref: Date.now(),
    amount: samount,
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
  const configC = {
    public_key: process.env.REACT_APP_FKEY,
    tx_ref: Date.now(),
    amount: camount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'Compound Interest',
      description: 'Payment for Compound Interest',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const handleFlutterPayment =  useFlutterwave(config)

  const handlePay = (response,product) => {
    const {status,charged_amount,flw_ref,transaction_id,tx_ref} = response;
    if(status === 'success'){
        const status = "Approved"
        postpay(charged_amount,product,flw_ref,transaction_id,tx_ref,status)
    }else{
        const status = "Pending"
        postpay(charged_amount,product,flw_ref,transaction_id,tx_ref, status)
    }
  }

  const handleFlutterCPayment =  useFlutterwave(configC)

  const uid = function(){
    return Date.now().toString(12) + Math.random().toString(20).substr(12);
}
  
  const postpay = async (amount,product,flw_ref,transaction_id,tx_ref,status) => {

 /* Manual Payment
    const txid = uid()
    let form_data = new FormData();
    form_data.append('customer',userId)
    form_data.append('product',product)
    form_data.append('amount', amount)
    form_data.append('duration', parseInt(duration))
    form_data.append('status', "Pending")
    form_data.append("txid", txid)
 

*/
    

     
    
      const order = {
          customer: userId,
          product: product,
          amount: amount,
          duration: parseInt(duration),
          txid: transaction_id,
          status: status,
          tx_ref:tx_ref,
          flw_ref:flw_ref
      }
      const omo = {
        customer: userId,
        product: 'Simple Interest',
        duration: parseInt(duration),
        amount: samount,
        txid: "fjfjkjkjfj",
        status: "Approved",
        tx_ref:"i9ruiruiuiue9",
        flw_ref:"eieinejuiiuiu3u33"
    }
      
      try {
        
       axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          
      }

   toast.loading("Loading...", {
    id: "pay"
   })
      const detail = await axios.post('/api/post-order/', omo)
      console.log(detail)
     
              if(detail.status == 201){
                toast.success("Payment Successfull", {
                    id: "pay"
                  })
              }

          }catch(err) {
            console.log(err.response);
            toast.error("Can't process request at the moment ", {
                id: "pay"
            })
           
          }

  }





        return (
            <>
                <div >
      
                    <Row>

                            <div >
                            <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
                          <Card>
                              <Skeleton  loading={false} avatar active>  
                                <Meta
                                  avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                  title="Simple Interest Investor"
                                  
                                       />
                                      
                                      
                                       <div align="middle">
                                    <h6></h6>
                                    </div>
                                       <div align="middle"className="ant-card-meta-description">
                                       <Divider>min - 200,000</Divider>
                                       
                                       <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {sduration} Months
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
                                       </div>
                                
                              </Skeleton>
                      <br/>
                    
                    <div align="middle">
                       Amount:  <br/><InputNumber style={{ width: 120 }} align="middle"
                          min={20000} max={50000000}
                          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                         
                          onChange={value => setSAmount(value)}
                          
                        /><br/><br/>
                    <Button onClick={() => postpay()}>Pay</Button>
                   
                    <button className="flutterwave-btn"
                    style={{backgroundColor:"#f5a623",cursor:"pointer", borderRadius:'5px',padding:'5px 10px', color:"#ffffff", border:"none"}}
        onClick={samount? () => {
          handleFlutterPayment({
            callback: (response) => {
               handlePay(response,"Simple Interest")
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }: handleS}
      >
        Pay {samount} with Flutterwave
      </button>   
                    </div>
                    
                            </Card>
                          </Col>
                         <Col span={24} md={12} className="mb-24">
                          <Card >
                              <Skeleton  loading={false} avatar active>
                            
                                <Meta
                                  avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                  title="Compound Interest Investor"
                                  
                                       />
                                       <div align="middle">
                                    <h6></h6>
                                    </div>
                                    <div align="middle"className="ant-card-meta-description">
                                       <Divider>min - 400,000</Divider>
                                       <Dropdown menu={menuCProps}>
      <Button>
        <Space>
        {cduration} Months
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
                                           
                                       </div>
                                
                              </Skeleton>
                      <br/>
                    
                    <div align="middle">
                      Amount:  <br/><InputNumber style={{ width: 120 }} align="middle"
                          min={40000} max={100000000}
                          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                         
                          onChange={value => setCAmount(value)}
                          
                          /><br/><br/>
                      
                     
                      <button className="flutterwave-btn"
                    type="secondary"
                    style={{backgroundColor:"#f5a623",cursor:"pointer",borderRadius:'5px',padding:'5px 10px', color:"#ffffff", border:"none"}}
        onClick={camount? () => {
          handleFlutterCPayment({
            callback: (response) => {
                handlePay(response,"Compound Interest")
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }: handleC}
      >
        Pay {camount} with Flutterwave
      </button> 
                    </div>
                    
                            </Card>
                          </Col>
                      
                           </Row>
                      
                      
            
                      </div>
           
                    </Row>

                </div>
            </>
        );
    }


export default Cart;